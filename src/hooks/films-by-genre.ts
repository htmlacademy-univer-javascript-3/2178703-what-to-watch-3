import { useAppSelector } from '.';
import { getFilms } from '../store/film-data/selectors';
import { getFilmsByGenre } from '../utils/get-films-by-genre';

export const useFilmsByGenre = (genre: string) => getFilmsByGenre(useAppSelector(getFilms), genre);

