export const debounce = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  let timerId: NodeJS.Timeout;

  const clear = () => {
    clearTimeout(timerId);
  };
  const debaunced = (...args: Parameters<F>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), wait);
  };

  return [debaunced, clear] as const;
};

// TODO: Объединить с debounce и проверить, что все норм
// Возможно, хорошей идеей будет убрать clear или сделать его методом возвращаемой функции, типа debaunced.clear = clear;
export const debounceWithReturn = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  let timerId: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    return new Promise<ReturnType<F>>((resolve) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        resolve(func(...args));
      }, wait);
    });
  };
};
