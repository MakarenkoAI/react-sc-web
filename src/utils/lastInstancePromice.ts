import { nanoid } from 'nanoid';

// TODO: Дока

/**
 * Returns wheteher async function passed to the params is last in unresolved promices stack.
 *
 * @param func
 * @returns
 */
export const lastInstancePromice = <F extends (...args: any[]) => Promise<any>>(func: F) => {
  let calls: string[] = [];

  return async (...args: Parameters<F>) => {
    const id = nanoid(5);
    calls.push(id);

    const res = await func(...args);

    calls = calls.filter((callId) => callId !== id);

    const isLast = calls.length === 0;

    return { res, isLast };
  };
};
