import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmData } from '../../types/state';
import { fetchFilmsAction, fetchFilmAction, fetchSimilarFilmsAction, fetchPromoFilmAction } from '../api-actions/get-actions/get-actions';

const initialState: FilmData = {
  films: [],
  isFilmsLoading: false,
  currentFilm: undefined,
  isCurrentFilmLoading: false,
  promoFilm: undefined,
  isPromoFilmLoading: false,
  currentSimilarFilms: [],
  isCurrentSimilarFilmsLoading: false,
};

export const filmData = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsLoading = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isCurrentFilmLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.currentFilm = action.payload;
        state.isCurrentFilmLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isCurrentSimilarFilmsLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.currentSimilarFilms = action.payload;
        state.isCurrentSimilarFilmsLoading = false;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isPromoFilmLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isPromoFilmLoading = false;
      });
  }
});
