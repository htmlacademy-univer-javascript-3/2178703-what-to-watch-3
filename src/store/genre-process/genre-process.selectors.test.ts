import { DEFAULT_GENRE, NameSpace } from '../../const';
import { getActiveGenre } from './selectors';

describe('MyListProcess selectors', () => {
  const state = {
    [NameSpace.Genre]: {
      genre: DEFAULT_GENRE,
    }
  };

  it('return "genre" from state', () => {
    const { genre } = state[NameSpace.Genre];

    const result = getActiveGenre(state);

    expect(result).toBe(genre);
  });
});
