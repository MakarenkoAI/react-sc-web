import { createSelectorHook, useDispatch as useReduxDispatch } from 'react-redux';
import { Dispatch } from '@store';

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector = createSelectorHook();
