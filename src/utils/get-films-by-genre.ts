import { DEFAULT_GENRE } from '../const';
import { PreviewFilm } from '../types/preview-film';

export const getFilmsByGenre = (films: PreviewFilm[], genre: string) => {
  if (genre === DEFAULT_GENRE) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};
