import {createAction} from '@reduxjs/toolkit';

export const changeActiveGenre = createAction<{ genre: string }>('changeActiveGenre');

export const showFilmsByGenre = createAction('showFilmsByGenre');

export const changeShownFilmCount = createAction('changeShownFilmCount');

export const setDefaultShownFilmCount = createAction('setDefaultShownFilmCount');
