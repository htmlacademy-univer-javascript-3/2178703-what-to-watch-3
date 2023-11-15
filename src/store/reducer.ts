import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_GENRE } from '../const';
import { changeActiveGenre, loadFilms, setFilmsDataLoadingStatus } from './action';
import { PreviewFilm } from '../types/preview-film';

type InitialState = {
  genre: string;
  films: PreviewFilm[];
  isFilmsDataLoading: boolean;
}

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  films: [],
  isFilmsDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    });
});
