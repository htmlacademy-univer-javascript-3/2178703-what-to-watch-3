import MockAdapter from 'axios-mock-adapter';
import { APIRoute, NameSpace } from '../../../const';
import { createAPI } from '../../../services/api';
import { logoutAction } from './delete-actions';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types/state';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../../../utils/mock-component';
import { extractActionsTypes } from '../../../utils/mocks';
import { clearMyList } from '../../my-list-process/my-list-process';


describe('Async delete-actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.User]: { avatarUrl: '' },
    });
  });

  describe('logoutAction', () => {
    it('dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        clearMyList.type,
        logoutAction.fulfilled.type,
      ]);
    });
  });
});


