import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { MyFilmProcess } from '../../types/state';
import { fetchFavoriteFilmsAction } from '../api-actions/get-actions/get-actions';
import { postFilmFavoriteStatus } from '../api-actions/post-actions/post-actions';

const initialState: MyFilmProcess = {
  favoriteFilms: [],
  favoriteFilmCount: 0,
  isFavoriteFilmsLoading: false,
};

export const myListProcess = createSlice({
  name: NameSpace.MyList,
  initialState,
  reducers: {
    clearMyList: (state) => {
      state.favoriteFilms = [];
      state.favoriteFilmCount = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isFavoriteFilmsLoading = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteFilmCount = action.payload.length;
        state.isFavoriteFilmsLoading = false;
      })
      .addCase(postFilmFavoriteStatus.fulfilled, (state, action) => {
        const currentFilm = action.payload;
        if(currentFilm.isFavorite) {
          state.favoriteFilms.push(currentFilm);
        } else {
          state.favoriteFilms = state.favoriteFilms.filter(
            (film) => film.id !== currentFilm.id
          );
        }
        state.favoriteFilmCount = state.favoriteFilms.length;
      });
  }
});

export const { clearMyList } = myListProcess.actions;
