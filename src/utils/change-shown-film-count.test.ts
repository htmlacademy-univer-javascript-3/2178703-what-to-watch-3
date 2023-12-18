import { changeShownFilmCount } from './change-shown-film-count';

describe('Change shown film count', () => {
  it('return shown film count + "SHOWN_FILM_COUNT"(8)', () => {
    const currentShownFilmCount = 2;
    const expectedShownFilmCount = 10;

    const result = changeShownFilmCount(currentShownFilmCount);

    expect(result).toBe(expectedShownFilmCount);
  });
});
