import { DEFAULT_GENRE } from '../const';
import { PreviewFilm } from '../types/preview-film';
import { getFilmsByGenre } from './get-films-by-genre';

describe('Get films by genre', () => {
  const mockFilms: PreviewFilm[] = [
    {
      id: '1',
      name: '',
      previewImage: '',
      previewVideoLink: '',
      genre: 'Action',
    },
  ];

  it('return all films with default genre', () => {
    const expectedFilms = [... mockFilms];

    const result = getFilmsByGenre(mockFilms, DEFAULT_GENRE);

    expect(result).toEqual(expectedFilms);
  });

  it('return 0 films with genre comedy', () => {
    const expectedFilms = [] as PreviewFilm[];

    const result = getFilmsByGenre(mockFilms, 'Comedy');

    expect(result).toEqual(expectedFilms);
  });
});
