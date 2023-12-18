import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types/state';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../../../utils/mock-component';
import { APIRoute, NameSpace } from '../../../const';
import { makeFakeAvatarUrl, makeFakeFavoriteFilmPostData, makeFakeFilmId, makeFakeReview } from '../../../utils/mocks';
import * as tokenStorage from '../../../services/token';
import { loginAction, postFilmFavoriteStatus, postReview } from './post-actions';
import { extractActionsTypes } from '../../../utils/mocks';
import { redirectToRoute } from '../../action';

import { FilmFavoriteStatus } from '../../../types/film-favorite-status';
import { fetchFavoriteFilmsAction } from '../get-actions/get-actions';

describe('Async post-actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Film]: {
        films: [],
        isFilmsLoading: false,
        currentFilm: undefined,
        isCurrentFilmLoading: false,
        promoFilm: undefined,
        isPromoFilmLoading: false,
        currentSimilarFilms: [],
        isCurrentSimilarFilmsLoading: false,
      },
      [NameSpace.Review]: {
        currentFilmReviews: [],
        isCurrentFilmReviewsLoading: false,
      },
      [NameSpace.User]: { avatarUrl: '' },
      [NameSpace.MyList]: {
        favoriteFilms: [],
        favoriteFilmCount: 0,
        isFavoriteFilmsLoading: false,
      }
    });
  });

  describe('loginAction', () => {
    it('dispatch "loginAction.pending", "loginAction.fulfilled" and redirectToRoute when server response 200', async () => {
      const userData = { email: '', password: '' };
      const avatarUrl = makeFakeAvatarUrl();
      mockAxiosAdapter
        .onPost(APIRoute.Login)
        .reply(200, { token: '', avatarUrl: avatarUrl });
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(userData));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const loginActionFulfilled = emittedActions.at(3) as ReturnType<
      typeof loginAction.fulfilled
    >;

      expect(extractedActionTypes).toEqual([
        loginAction.pending.type,
        fetchFavoriteFilmsAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
      expect(loginActionFulfilled.payload).toBe(avatarUrl);
      expect(mockSaveToken).toBeCalledTimes(1);
    });

    it('dispatch "loginAction.pending", "loginAction.rejected" when when server response 400', async () => {
      const userData = { email: '', password: '' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(userData));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type
      ]);
    });
  });

  describe('postFilmFavoriteStatus', () => {
    const id = makeFakeFilmId();
    const favoriteStatus: FilmFavoriteStatus = {
      id: id,
      status: 0,
    };

    it('dispatch "postFilmFavoriteStatus.pending", "postFilmFavoriteStatus.fulfilled" when server response 200', async () => {
      const mockFavoriteFilmPostData = makeFakeFavoriteFilmPostData();
      mockAxiosAdapter
        .onPost(`${APIRoute.FavoriteFilms}/${id}/${favoriteStatus.status}`)
        .reply(200, mockFavoriteFilmPostData);

      await store.dispatch(postFilmFavoriteStatus(favoriteStatus));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const postFilmFavoriteStatusFulfilled = emittedActions.at(1) as ReturnType<
      typeof postFilmFavoriteStatus.fulfilled
    >;

      expect(extractedActionTypes).toEqual([
        postFilmFavoriteStatus.pending.type,
        postFilmFavoriteStatus.fulfilled.type,
      ]);
      expect(postFilmFavoriteStatusFulfilled.payload).toEqual(mockFavoriteFilmPostData);
    });

    it('dispatches "postFilmFavoriteStatus.pending", "postFilmFavoriteStatus.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.FavoriteFilms}/${id}/${favoriteStatus.status}`)
        .reply(400);

      await store.dispatch(postFilmFavoriteStatus(favoriteStatus));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postFilmFavoriteStatus.pending.type,
        postFilmFavoriteStatus.rejected.type,
      ]);
    });
  });

  describe('postReview', () => {
    const id = makeFakeFilmId();
    const review = { id: id, comment: '', rating: 0 };

    it('dispatches "postReview.pending", "postReview.fulfilled" and redirectToRoute when server response 201', async () => {
      const mockReview = makeFakeReview();

      mockAxiosAdapter
        .onPost(`${APIRoute.Comments}/${id}`)
        .reply(201, mockReview);

      await store.dispatch(postReview(review));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        redirectToRoute.type,
        postReview.fulfilled.type,
      ]);
    });

    it('dispatches "postReview.pending", "postReview.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${id}`).reply(400);

      await store.dispatch(postReview(review));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.rejected.type,
      ]);
    });
  });
});
