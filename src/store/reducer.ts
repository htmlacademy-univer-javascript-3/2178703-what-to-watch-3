import { createReducer } from '@reduxjs/toolkit';
import { films } from '../mocks/films';
import { DEFAULT_GENRE, SHOWN_FILM_COUNT } from '../const';
import { changeActiveGenre, changeShownFilmCount, setDefaultShownFilmCount, showFilmsByGenre } from './action';

const initialState = {
  genre: DEFAULT_GENRE,
  films: films,
  filmsByGenre: films.slice(1, films.length),
  shownFilmCount: SHOWN_FILM_COUNT,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(showFilmsByGenre, (state) => {
      state.filmsByGenre = state.genre === DEFAULT_GENRE ? initialState.filmsByGenre : initialState.filmsByGenre.filter((film) => film.genre === state.genre);
    })
    .addCase(changeShownFilmCount, (state) => {
      state.shownFilmCount += SHOWN_FILM_COUNT;
    })
    .addCase(setDefaultShownFilmCount, (state) => {
      state.shownFilmCount = SHOWN_FILM_COUNT;
    });
});

export {reducer};
