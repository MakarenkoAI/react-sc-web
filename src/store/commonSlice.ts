import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser, getUserByToken } from '@api';
import { isAxiosError } from '@api/utils';
import { IInputValidation, IUserData } from '@model/model';
import { IRootState } from '@store/model';

import { deleteCookie } from '../utils/cookies';

interface IUserStatus {
  isLoading: boolean;
  isError: boolean;
  isLoadingByToken: boolean;
  isErrorByToken: boolean;
}

interface IUserBody {
  data: IUserData | null;
  status: IUserStatus;
}

export type TFormat = 'scn' | 'scg';

interface IInitialState {
  user: IUserBody;
  format: TFormat;
}

const initialState: IInitialState = {
  format: 'scn',
  user: {
    data: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null,
    status: {
      isLoading: false,
      isError: false,
      isLoadingByToken: false,
      isErrorByToken: false,
    },
  },
};

export const fetchUserByToken = createAsyncThunk('/getLogin', async (_, { rejectWithValue }) => {
  const res = await getUserByToken();

  if (isAxiosError(res)) {
    return rejectWithValue(res.response?.data);
  }
  return res.data;
});

export const fetchUser = createAsyncThunk<unknown, IInputValidation>(
  '/postLogin',
  async (data, { rejectWithValue }) => {
    const res = await getUser(data);

    if (isAxiosError(res)) {
      return rejectWithValue(res.response?.data);
    }

    return res.data;
  },
);

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserData | null>) {
      state.user.data = action.payload;
    },
    setUserStatus(state, action: PayloadAction<IUserStatus>) {
      state.user.status = action.payload;
    },
    setFormat(state, action: PayloadAction<TFormat>) {
      state.format = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByToken.pending, (state) => {
        state.user.status.isErrorByToken = false;
        state.user.status.isLoadingByToken = true;
      })
      .addCase(fetchUserByToken.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));

        state.user.data = action.payload;
        state.user.status.isError = false;
        state.user.status.isLoading = false;
      })
      .addCase(fetchUserByToken.rejected, (state) => {
        localStorage.removeItem('user');
        deleteCookie('session_key');

        state.user.status.isLoading = false;
        state.user.status.isError = true;
      });
    builder
      .addCase(fetchUser.pending, (state) => {
        state.user.status.isError = false;
        state.user.status.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));

        state.user.data = action.payload as IUserData;
        state.user.status.isError = false;
        state.user.status.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        localStorage.removeItem('user');
        deleteCookie('session_key');

        state.user.status.isLoading = false;
        state.user.status.isError = true;
      });
  },
});

//Selectors
export const selectUser = (state: IRootState) => state.common.user.data;
export const selectUserAddr = createSelector(selectUser, (user) => user?.sc_addr);
export const selectUserStatus = (state: IRootState) => state.common.user.status;
export const selectFormat = (state: IRootState) => state.common.format || 'scn';

//Reducers and actions
export const { setUser, setUserStatus, setFormat } = commonSlice.actions;
