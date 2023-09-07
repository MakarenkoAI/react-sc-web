import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IRootState } from '..';

export interface IArg {
  addr: number;
  id: string;
}

interface IArgs {
  args: IArg[];
}

const initialState: IArgs = {
  args: [],
};

export const argsFixingSlice = createSlice({
  name: 'args',
  initialState,
  reducers: {
    addArg(state, action: PayloadAction<IArg>) {
      state.args.push(action.payload);
    },
    deleteArg(state, action: PayloadAction<IArg>) {
      state.args = state.args.filter((item) => item.id !== action.payload.id);
    },
    clearArgs(state) {
      state.args = [];
    },
  },
});

export const selectArgs = (state: IRootState) => state.args.args;
export const selectArgAddrs = createSelector(selectArgs, (args) => args.map(({ addr }) => addr));

export const { addArg, deleteArg, clearArgs } = argsFixingSlice.actions;
