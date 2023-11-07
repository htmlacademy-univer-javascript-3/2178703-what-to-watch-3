import { createReducer } from '@reduxjs/toolkit';
import { films } from '../mocks/films';
import { DEFAULT_GENRE } from '../const';
import { changeActiveGenre } from './action';

const initialState = {
  genre: DEFAULT_GENRE,
  films: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveGenre, (state, action) => {
      state.genre = action.payload.genre;
    });
});

export {reducer};
