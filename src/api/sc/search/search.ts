import { ScAddr, ScTemplate, ScType } from 'ts-sc-client';
import { client, scUtils } from '@api';

const searchNodeByIdentifier = async (linkAddr: ScAddr, identification: ScAddr) => {
  const nodeAlias = '_node';

  const template = new ScTemplate();
  template.tripleWithRelation(
    [ScType.Unknown, nodeAlias],
    ScType.EdgeDCommonVar,
    linkAddr,
    ScType.EdgeAccessVarPosPerm,
    identification,
  );
  const result = await client.templateSearch(template);
  if (result.length) {
    return result[0].get(nodeAlias);
  }

  return null;
};

export const searchAddrById = async (str: string) => {
  const [linkAddrs] = await client.getLinksByContents([str]);

  const { nrelMainIdtf, nrelSystemIdentifier } = await scUtils.findKeynodes(
    'nrel_system_identifier',
    'nrel_main_idtf',
  );

  if (!linkAddrs.length) return null;

  const linkAddr = linkAddrs[0];
  const systemAddr = await searchNodeByIdentifier(linkAddr, nrelSystemIdentifier);

  if (systemAddr) return systemAddr;

  const mainAddr = await searchNodeByIdentifier(linkAddr, nrelMainIdtf);
  if (mainAddr) return mainAddr;

  return linkAddr;
};
