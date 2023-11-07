import { useAppSelector } from '.';
import { PreviewFilm } from '../types/preview-film';
import { getFilmsByGenre } from '../utils/get-films-by-genre';

export const useFilmsByGenre = (genre: string) => useAppSelector((state) => getFilmsByGenre(state.films as PreviewFilm[], genre));

