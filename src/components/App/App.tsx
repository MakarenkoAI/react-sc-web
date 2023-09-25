import { isAxiosError } from 'axios';
import { nanoid } from 'nanoid';
import { CommandProvider, ContextMenuProvider, useScUtils, useTranslate } from 'ostis-ui-lib';
import { useCallback, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getContext } from '@api/requests/requests';
import { Router } from '@components/Router';
import { DEFAULT_COMMAND_SYSTEM_ID, DEFAULT_SYSTEM_ID } from '@constants';
import { useErrorToast } from '@hooks/useErrorToast';
import { useScNavigation } from '@hooks/useScNavigation';
import { addArg, selectArgs, store } from '@store/index';

export const App = () => {
  const [isReady, setIsReady] = useState(false);

  const { goToActiveFormatCommand } = useScNavigation();

  const { addrOrSystemIdAddr } = useScUtils();

  const arrArgs = useSelector(selectArgs);

  const addError = useErrorToast();
  const dispatch = useDispatch();
  const translate = useTranslate();

  const onExecuteCommand = useCallback((addr?: number | string, command?: number | string) => {
    goToActiveFormatCommand(addr || DEFAULT_SYSTEM_ID, command || DEFAULT_COMMAND_SYSTEM_ID);
  }, []);

  const onFixArgument = async (addr?: number | string) => {
    const targetAddr = await addrOrSystemIdAddr(addr || DEFAULT_SYSTEM_ID);

    dispatch(addArg({ addr: targetAddr, id: nanoid(5) }));
  };

  const getContextItems = async (addr?: number | string) => {
    const targetAddr = await addrOrSystemIdAddr(addr || DEFAULT_SYSTEM_ID);
    const arrArgsAddrs = arrArgs.map((item) => item.addr);

    const res = await getContext([...arrArgsAddrs, targetAddr]);

    if (!isAxiosError(res)) return res.data;

    addError(translate({ ru: 'Не удалось получить контекст', en: 'Error while getting context' }));
    return null;
  };

  return (
    <CommandProvider onExecuteCommand={onExecuteCommand}>
      <ContextMenuProvider getContextItems={getContextItems} onFixArgument={onFixArgument}>
        <Router />
      </ContextMenuProvider>
    </CommandProvider>
  );
};
