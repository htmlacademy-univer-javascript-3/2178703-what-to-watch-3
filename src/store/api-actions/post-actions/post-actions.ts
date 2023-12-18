import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../../../const';
import { saveToken } from '../../../services/token';
import { AuthData } from '../../../types/auth-data';
import { FavoriteFilmPostData } from '../../../types/favorite-film-post-data';
import { FilmFavoriteStatus } from '../../../types/film-favorite-status';
import { ReviewAddingData } from '../../../types/review-adding-data';
import { AppDispatch } from '../../../types/state';
import { UserData } from '../../../types/user-data';
import { redirectToRoute } from '../../action';
import { fetchFavoriteFilmsAction } from '../get-actions/get-actions';

export const postFilmFavoriteStatus = createAsyncThunk<
  FavoriteFilmPostData,
  FilmFavoriteStatus,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('myList/setFilmFavoriteStatus', async ({ id, status }, { extra: api }) => {
  const { data } = await api.post<FavoriteFilmPostData>(
    `${APIRoute.FavoriteFilms}/${id}/${status}`
  );
  return data;
});

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const {data: { token, avatarUrl }} = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(fetchFavoriteFilmsAction());
    dispatch(redirectToRoute(AppRoute.Main));
    return avatarUrl;
  },
);

export const postReview = createAsyncThunk<void, ReviewAddingData,{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'review/post',
  async ({ id: filmId, comment, rating }, { dispatch, extra: api }) => {
    await api.post<ReviewAddingData>(`${APIRoute.Comments}/${filmId}`, { comment, rating });
    dispatch(redirectToRoute(`${AppRoute.FilmData}/${filmId}`));
  }
);
