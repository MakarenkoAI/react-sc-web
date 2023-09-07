import { doCommand } from '@api/requests/command';
import { scUtils } from '@api/sc';
import { debounceWithReturn, lastInstancePromice } from '@utils';

interface IArgs {
  commandAddr: string | number;
  addr: string | number;
  args: number[];
}

const executeCommandInner = async ({ commandAddr, addr, args }: IArgs) => {
  const targetAddr = await scUtils.addrOrSystemIdAddr(addr);
  const targetCommandAddr = await scUtils.addrOrSystemIdAddr(commandAddr);
  return await doCommand(targetCommandAddr, targetAddr, ...args);
};

export const debouncedExecuteCommand = debounceWithReturn(lastInstancePromice(executeCommandInner), 500);
