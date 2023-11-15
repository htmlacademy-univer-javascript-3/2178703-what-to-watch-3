import { createAction } from '@reduxjs/toolkit';
import { PreviewFilm } from '../types/preview-film';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeActiveGenre = createAction<{ genre: string }>('app/changeActiveGenre');

export const loadFilms = createAction<PreviewFilm[]>('data/loadFilms');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');


