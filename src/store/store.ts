import { configureStore } from '@reduxjs/toolkit';

import { argsFixingSlice } from './argsFixingSlice';
import { commonSlice } from './commonSlice';
import { requestHistorySlice } from './requestHistorySlice';

export const store = configureStore({
  reducer: {
    [commonSlice.name]: commonSlice.reducer,
    [requestHistorySlice.name]: requestHistorySlice.reducer,
    [argsFixingSlice.name]: argsFixingSlice.reducer,
  },
});
