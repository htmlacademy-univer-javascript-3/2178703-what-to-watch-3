import {createAction} from '@reduxjs/toolkit';

export const changeActiveGenre = createAction<{ genre: string }>('changeActiveGenre');

