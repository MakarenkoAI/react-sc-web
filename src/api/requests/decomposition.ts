import { langToKeynode, snakeToCamelCase, TLanguage } from 'ostis-ui-lib';
import {
  ScAddr,
  ScConstruction,
  ScLinkContent,
  ScLinkContentType,
  ScTemplate,
  ScType,
} from 'ts-sc-client';
import { client, isAxiosError, request, scUtils } from '@api';
import { API_URL } from '@constants';
import { Decomposition } from '@model/model';

import { doCommand } from './command';

interface IDecompositionItem {
  sectionName: string;
  lang: TLanguage;
}

const getLanguage = async (lang: TLanguage) => {
  const keynodes = await scUtils.findKeynodes(langToKeynode[lang]);
  return keynodes[snakeToCamelCase(langToKeynode[lang])];
};

export const getDecomposition = async (lang: TLanguage): Promise<Decomposition | null> => {
  const LEVEL = '10';

  const { imsStartElement, uiMenuViewGetDecomposition } = await scUtils.findKeynodes(
    'ims_start_element',
    'ui_menu_view_get_decomposition',
  );

  const subjectDomainAlias = '_subjDomain';
  const subjectDomainTemplate = new ScTemplate();
  subjectDomainTemplate.triple(imsStartElement, ScType.EdgeAccessVarPosPerm, [
    ScType.NodeVar,
    subjectDomainAlias,
  ]);

  const subjectDomainRes = await client.templateSearch(subjectDomainTemplate);

  if (!subjectDomainRes.length) return null;

  const subjDomainAddr = subjectDomainRes[0].get(subjectDomainAlias);

  const constr = new ScConstruction();
  constr.createLink(ScType.LinkConst, new ScLinkContent(LEVEL, ScLinkContentType.String));

  const [linkAddr] = await client.createElements(constr);

  const foundLang = await getLanguage(lang);

  const commandResult = await doCommand(
    uiMenuViewGetDecomposition.value,
    subjDomainAddr.value,
    linkAddr.value,
    foundLang.value,
  );

  //Добавить вызов тоста
  if (isAxiosError(commandResult)) {
    return null;
  }

  const questionNode = commandResult.data.question;
  const answer = await scUtils.getAnswer(new ScAddr(questionNode));

  if (!answer) return null;

  const targetLinkAlias = '_targetLink';
  const linkTemplate = new ScTemplate();
  linkTemplate.triple(answer, ScType.EdgeAccessVarPosPerm, [ScType.LinkVar, targetLinkAlias]);
  const linkRes = await client.templateSearch(linkTemplate);

  if (!linkRes.length) return null;

  const targetLinkAddr = linkRes[0].get(targetLinkAlias);
  const contents = await client.getLinkContents([targetLinkAddr]);
  const content = contents[0].data;

  return JSON.parse(String(content));
};

export const addDecompositionItem = async (parentID: string, data: IDecompositionItem) => {
  const foundLang = await getLanguage(data.lang);

  return request<Record<string, any>>({
    method: 'POST',
    url: `${API_URL}/api/sections/${parentID}/subsections`,
    data: { ...data, lang: foundLang.value },
  });
};

export const deleteDecompositionItem = (parentID: string, id: string) => {
  return request({
    method: 'DELETE',
    url: `${API_URL}/api/sections/${parentID}/subsections/${id}`,
  });
};

export const editDecompositionItem = async (addr: number, newContent: string, lang: TLanguage) => {
  const linkAlias = '_link';

  const { nrelMainIdtf, ...rest } = await scUtils.findKeynodes(
    'nrel_main_idtf',
    langToKeynode[lang],
  );

  const foundLang = rest[snakeToCamelCase(langToKeynode[lang])];

  const scTemplate = new ScTemplate();
  scTemplate.tripleWithRelation(
    new ScAddr(addr),
    ScType.EdgeDCommonVar,
    [ScType.LinkVar, linkAlias],
    ScType.EdgeAccessVarPosPerm,
    nrelMainIdtf,
  );

  scTemplate.triple(foundLang, ScType.EdgeAccessVarPosPerm, linkAlias);

  const result = await client.templateSearch(scTemplate);

  if (result.length) {
    client.setLinkContents([
      new ScLinkContent(newContent, ScLinkContentType.String, result[0].get(linkAlias)),
    ]);
    return true;
  }

  const link = await scUtils.createLink(newContent);

  if (!link) return;

  const template = new ScTemplate();

  template.tripleWithRelation(
    new ScAddr(addr),
    ScType.EdgeDCommonVar,
    link,
    ScType.EdgeAccessVarPosPerm,
    nrelMainIdtf,
  );
  template.triple(foundLang, ScType.EdgeAccessVarPosPerm, link);

  const generateRes = await client.templateGenerate(template);

  return !!generateRes;
};
