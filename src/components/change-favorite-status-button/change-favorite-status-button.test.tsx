import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeFilmId, makeFakePreviewFilms, makeFakeStore } from '../../utils/mocks';
import ChangeFavoriteStatusButton from './change-favorite-status-button';
import { AuthorizationStatus, NameSpace } from '../../const';

describe('ChangeFavoriteStatusButton', () => {
  it('render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <ChangeFavoriteStatusButton
          filmId='1'
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('render correctly when user no authorization', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <ChangeFavoriteStatusButton
          filmId='1'
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByTestId('add')).toBeInTheDocument();
  });

  it('render svg "in-list" when film is favorite', () => {
    const mockFavoriteFilms = makeFakePreviewFilms();
    const mockFavoriteFilm = mockFavoriteFilms[0];
    const { withStoreComponent } = withStore(
      withHistory(
        <ChangeFavoriteStatusButton
          filmId={mockFavoriteFilm.id}
          authorizationStatus={AuthorizationStatus.Auth}
        />
      ),
      makeFakeStore({
        [NameSpace.MyList]: {
          favoriteFilms: mockFavoriteFilms,
          favoriteFilmCount: mockFavoriteFilms.length,
          isFavoriteFilmsLoading: false,
        }
      })
    );

    render(withStoreComponent);

    expect(screen.getByTestId('in-list')).toBeInTheDocument();
  });

  it('render svg "add" when film is not favorite', () => {
    const mockFavoriteFilms = makeFakePreviewFilms();
    const fakeFavoriteFilmId = makeFakeFilmId();
    const { withStoreComponent } = withStore(
      withHistory(
        <ChangeFavoriteStatusButton
          filmId={fakeFavoriteFilmId}
          authorizationStatus={AuthorizationStatus.Auth}
        />
      ),
      makeFakeStore({
        [NameSpace.MyList]: {
          favoriteFilms: mockFavoriteFilms,
          favoriteFilmCount: mockFavoriteFilms.length,
          isFavoriteFilmsLoading: false,
        }
      })
    );

    render(withStoreComponent);

    expect(screen.getByTestId('add')).toBeInTheDocument();
  });
});
