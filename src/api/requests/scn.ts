import { AxiosError } from 'axios';
import { IScnNode } from 'ostis-ui-lib';
import { ScAddr } from 'ts-sc-client';
import { client, isAxiosError, scUtils } from '@api';
import { shiftMap } from '@utils';

import { translate } from './requests';

interface IReturnScnTree {
  tree: IScnNode;
}

const requestScnTree = async (question: number): Promise<IReturnScnTree | AxiosError | null> => {
  const res = await translate(question, 'format_scn_json', 'lang_ru');
  if (isAxiosError(res)) return res;
  const { link } = res.data;
  const [{ data }] = await client.getLinkContents([new ScAddr(link)]);

  try {
    const tree = JSON.parse(String(data))[0] as IScnNode;
    const { nrelQueryDatabase, nrelQueryTable, nrelConnectedConcepts, nrelSystemIdentifier } =
      await scUtils.findKeynodes(
        'nrel_query_database',
        'nrel_query_table',
        'nrel_connected_concepts',
        'nrel_system_identifier',
      );
    const filtredChildren = tree.children?.filter((child) => {
      return child.modifiers?.some(
        (modifire) =>
          modifire.addr === nrelQueryDatabase.value ||
          modifire.addr === nrelQueryTable.value ||
          modifire.addr === nrelConnectedConcepts.value ||
          modifire.addr === nrelSystemIdentifier.value,
      );
    });
    return {
      tree: {
        ...tree,
        children: filtredChildren,
      },
    };
  } catch (error) {
    return null;
  }
};

const DEFAULT_CACHE_SIZE = 50;

const memoizedScnTree = (cacheSize = DEFAULT_CACHE_SIZE) => {
  const cache = new Map<number, IReturnScnTree>();

  const removeFromCache = (question: number) => cache.delete(question);

  const request = async (
    question: number,
    onRequestStarted?: () => void,
  ): Promise<IReturnScnTree | AxiosError | null> => {
    const nodeInCache = cache.get(question);
    if (nodeInCache) return nodeInCache;

    onRequestStarted?.();
    const newNode = await requestScnTree(question);

    if (newNode === null) {
      return null;
    }

    if (isAxiosError(newNode)) return newNode;

    cache.set(question, newNode);
    if (cache.size > cacheSize) shiftMap(cache, 1);

    return newNode;
  };
  return [request, removeFromCache] as const;
};

export const [getScnTree, removeFromCache] = memoizedScnTree();
