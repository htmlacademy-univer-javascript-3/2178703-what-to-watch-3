import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../../const';
import { dropToken } from '../../../services/token';
import { clearMyList } from '../../my-list-process/my-list-process';

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dispatch(clearMyList());
    dropToken();
  },
);

