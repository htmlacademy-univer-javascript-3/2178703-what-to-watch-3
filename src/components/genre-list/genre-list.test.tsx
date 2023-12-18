import { render, screen } from '@testing-library/react';
import GenreList from './genre-list';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { DEFAULT_GENRE, NameSpace } from '../../const';

describe('GenreList', () => {
  const mockGenre = 'Action';
  const mockGenres = [DEFAULT_GENRE, mockGenre];
  const onGenreClick = vi.fn();

  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<GenreList genres={mockGenres} onGenreClick={onGenreClick} />),
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByTestId(`tab-${DEFAULT_GENRE}`)).toBeInTheDocument();
    expect(screen.getByTestId(`tab-${DEFAULT_GENRE}`)).toHaveClass(
      'catalog__genres-item--active'
    );
    expect(screen.getByTestId(`tab-${mockGenre}`)).toBeInTheDocument();
  });

  it('select active genre', () => {
    const { withStoreComponent } = withStore(
      withHistory(<GenreList genres={mockGenres} onGenreClick={onGenreClick} />),
      makeFakeStore({
        [NameSpace.Genre]: { genre: mockGenre },
      })
    );

    render(withStoreComponent);

    expect(screen.getByTestId(`tab-${mockGenre}`)).toHaveClass(
      'catalog__genres-item--active'
    );
  });
});
