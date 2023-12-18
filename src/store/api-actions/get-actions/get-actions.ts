import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { Film } from '../../../types/film';
import { PreviewFilm } from '../../../types/preview-film';
import { PromoFilm } from '../../../types/promo-film';
import { Review } from '../../../types/review';
import { AppDispatch } from '../../../types/state';
import { UserData } from '../../../types/user-data';

export const fetchFilmAction = createAsyncThunk<Film, { filmId: string }, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async ({ filmId }, { extra: api }) => {
    const { data } = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    return data;
  },
);

export const fetchPromoFilmAction = createAsyncThunk<PromoFilm, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PromoFilm>(`${APIRoute.PromoFilm}`);
    return data;
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<PreviewFilm[], { filmId: string }, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async ({ filmId }, { extra: api }) => {
    const { data } = await api.get<PreviewFilm[]>(`${APIRoute.Films}/${filmId}/similar`);
    return data;
  },
);

export const fetchFilmReviewsAction = createAsyncThunk<Review[], { filmId: string }, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilmReviews',
  async ({ filmId }, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${filmId}`);
    return data;
  },
);

export const fetchFilmsAction = createAsyncThunk<PreviewFilm[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PreviewFilm[]>(APIRoute.Films);
    return data;
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<PreviewFilm[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PreviewFilm[]>(APIRoute.FavoriteFilms);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<string, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const {
      data: { avatarUrl },
    } = await api.get<UserData>(APIRoute.Login);
    return avatarUrl;
  },
);
