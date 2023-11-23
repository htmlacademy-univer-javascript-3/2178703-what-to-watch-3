import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { MyFilmProcess } from '../../types/state';
import { fetchFavoriteFilmsAction } from '../api-actions';

const initialState: MyFilmProcess = {
  favoriteFilms: [],
  favoriteFilmCount: 0,
  isFavoriteFilmsLoading: false,
};

export const myListProcess = createSlice({
  name: NameSpace.MyList,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isFavoriteFilmsLoading = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteFilmCount = action.payload.length;
        state.isFavoriteFilmsLoading = false;
      });
  }
});
