import { ScAddr, ScTemplate, ScType } from 'ts-sc-client';
import { client, isAxiosError, scUtils } from '@api';

import { doCommand } from './command';

export const appendHistoryItem = async (itemAddr: number, userAddr: number) => {
  const { uiMenuViewAddActionToUserHistory } = await scUtils.findKeynodes(
    'ui_menu_view_add_action_to_user_history',
  );

  return await doCommand(uiMenuViewAddActionToUserHistory.value, userAddr, itemAddr);
};

export const getHistory = async (userAddr: number) => {
  const { uiMenuViewGetUserActionHistory } = await scUtils.findKeynodes(
    'ui_menu_view_get_user_action_history',
  );

  const res = await doCommand(uiMenuViewGetUserActionHistory.value, userAddr);

  if (isAxiosError(res)) return null;

  const actionNode = new ScAddr(res.data.question);

  const answer = await scUtils.getAnswer(actionNode);

  if (!answer) return null;

  const linkAlias = '_link';
  const template = new ScTemplate();
  template.triple(answer, ScType.EdgeAccessVarPosPerm, [ScType.LinkVar, linkAlias]);

  const searchRes = await client.templateSearch(template);

  if (!searchRes.length) return null;
  const answerAddr = searchRes[0].get(linkAlias);

  const contents = await client.getLinkContents([answerAddr]);

  const addrs = JSON.parse(String(contents[0].data)) as string[] | null;

  if (!addrs) return [];

  return addrs.map((addr) => ({ question: Number(addr) })).reverse();
};
