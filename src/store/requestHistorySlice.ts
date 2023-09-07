import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from '@store/model';

export interface IRequest {
  question: number;
}
interface IInitialState {
  requests: IRequest[];
}

const initialState: IInitialState = {
  requests: [],
};

export const requestHistorySlice = createSlice({
  name: 'requestHistory',
  initialState,
  reducers: {
    setRequests(state, action: PayloadAction<IRequest[]>) {
      state.requests = action.payload;
    },
    addRequest(state, action: PayloadAction<IRequest>) {
      state.requests.unshift(action.payload);
    },
  },
});

export const selectRequests = (state: IRootState) => state.requestHistory.requests;

export const { setRequests, addRequest } = requestHistorySlice.actions;
