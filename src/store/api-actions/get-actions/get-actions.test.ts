import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../../../types/state';
import { Action } from 'redux';
import { NameSpace, APIRoute } from '../../../const';
import { createAPI } from '../../../services/api';
import { AppThunkDispatch } from '../../../utils/mock-component';
import { extractActionsTypes, makeFakeAvatarUrl, makeFakeFilm, makeFakeFilmId, makeFakePreviewFilms, makeFakeReview } from '../../../utils/mocks';
import { checkAuthAction, fetchFilmAction, fetchPromoFilmAction, fetchSimilarFilmsAction, fetchFilmsAction, fetchFilmReviewsAction, fetchFavoriteFilmsAction } from './get-actions';

describe('Async get-actions', () => {
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

  describe('checkAuthAction', () => {
    it('dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when server response 200', async () => {
      const expectedUrl = makeFakeAvatarUrl();
      mockAxiosAdapter
        .onGet(APIRoute.Login)
        .reply(200, { avatarUrl: expectedUrl });

      await store.dispatch(checkAuthAction());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const checkAuthActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof checkAuthAction.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
      expect(checkAuthActionFulfilled.payload).toBe(expectedUrl);
    });

    it('dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 401', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmAction', () => {
    it('dispatch "fetchFilmAction.pending" and "fetchFilmAction.fulfilled" when server response 200', async () => {
      const mockFilm = makeFakeFilm();
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${mockFilm.id}`).reply(200, mockFilm);

      await store.dispatch(fetchFilmAction({filmId: mockFilm.id}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type,
      ]);

      expect(fetchFilmActionFulfilled.payload).toEqual(mockFilm);
    });

    it('dispatch "fetchFilmAction.pending" and "fetchFilmAction.rejected" when server response 404', async() => {
      const fakeFilmId = makeFakeFilmId();
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${fakeFilmId}`).reply(404);

      await store.dispatch(fetchFilmAction({filmId: fakeFilmId}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoFilmAction', () => {
    it('dispatch "fetchPromoFilmAction.pending" and "fetchPromoFilmAction.fulfilled" when server response 200', async () => {
      const mockFilm = makeFakeFilm();
      mockAxiosAdapter.onGet(APIRoute.PromoFilm).reply(200, mockFilm);

      await store.dispatch(fetchPromoFilmAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoFilmActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoFilmAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type,
      ]);

      expect(fetchPromoFilmActionFulfilled.payload).toEqual(mockFilm);
    });

    it('dispatch "fetchPromoFilmAction.pending" and "fetchPromoFilmAction.rejected" when server response 404', async() => {
      mockAxiosAdapter.onGet(APIRoute.PromoFilm).reply(404);

      await store.dispatch(fetchPromoFilmAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarFilmsAction', () => {
    it('dispatch "fetchSimilarFilmsAction.pending" and "fetchSimilarFilmsAction.fulfilled" when server response 200', async () => {
      const mockFilmId = makeFakeFilmId();
      const mockSimilarFilms = makeFakePreviewFilms();
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${mockFilmId}/similar`).reply(200, mockSimilarFilms);

      await store.dispatch(fetchSimilarFilmsAction({filmId: mockFilmId}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type,
      ]);

      expect(fetchSimilarFilmsActionFulfilled.payload).toEqual(mockSimilarFilms);
    });

    it('dispatch "fetchSimilarFilmsAction.pending" and "fetchSimilarFilmsAction.rejected" when server response 404', async() => {
      const fakeFilmId = makeFakeFilmId();
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${fakeFilmId}/similar`).reply(404);

      await store.dispatch(fetchSimilarFilmsAction({filmId: fakeFilmId}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmsAction', () => {
    it('dispatch "fetchFilmsAction.pending" and "fetchFilmsAction.fulfilled" when server response 200', async () => {
      const mockFilms = makeFakePreviewFilms();
      mockAxiosAdapter.onGet(APIRoute.Films).reply(200, mockFilms);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);

      expect(fetchFilmsActionFulfilled.payload).toEqual(mockFilms);
    });

    it('dispatch "fetchFilmsAction.pending" and "fetchFilmsAction.rejected" when server response 404', async() => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(404);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmReviewsAction', () => {
    it('dispatch "fetchFilmReviewsAction.pending" and "fetchFilmReviewsAction.fulfilled" when server response 200', async () => {
      const mockFilmId = makeFakeFilmId();
      const mockFilmReviews = [makeFakeReview()];
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockFilmId}`).reply(200, mockFilmReviews);

      await store.dispatch(fetchFilmReviewsAction({filmId: mockFilmId}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmReviewsAction.pending.type,
        fetchFilmReviewsAction.fulfilled.type,
      ]);

      expect(fetchFilmReviewsActionFulfilled.payload).toEqual(mockFilmReviews);
    });

    it('dispatch "fetchFilmReviewsAction.pending" and "fetchFilmReviewsAction.rejected" when server response 404', async() => {
      const fakeFilmId = makeFakeFilmId();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${fakeFilmId}`).reply(404);

      await store.dispatch(fetchFilmReviewsAction({filmId: fakeFilmId}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchFilmReviewsAction.pending.type,
        fetchFilmReviewsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteFilmsAction', () => {
    it('dispatch "fetchFavoriteFilmsAction.pending" and "fetchFavoriteFilmsAction.fulfilled" when server response 200', async () => {
      const mockFavoriteFilms = makeFakePreviewFilms();
      mockAxiosAdapter.onGet(APIRoute.FavoriteFilms).reply(200, mockFavoriteFilms);

      await store.dispatch(fetchFavoriteFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type,
      ]);

      expect(fetchFavoriteFilmsActionFulfilled.payload).toEqual(mockFavoriteFilms);
    });

    it('dispatch "fetchFavoriteFilmsAction.pending" and "fetchFavoriteFilmsAction.rejected" when server response 401', async() => {
      mockAxiosAdapter.onGet(APIRoute.FavoriteFilms).reply(401);

      await store.dispatch(fetchFavoriteFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.rejected.type,
      ]);
    });
  });
});
