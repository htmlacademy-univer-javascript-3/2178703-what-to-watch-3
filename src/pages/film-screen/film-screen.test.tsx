import { createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeFilm, makeFakeStore } from '../../utils/mocks';
import FilmScreen from './film-screen';
import { render, screen } from '@testing-library/react';

describe('FilmScreen', () => {
  const mockFilm = makeFakeFilm();
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(`${AppRoute.FilmData}/${mockFilm.id}`);
  });

  it('render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FilmScreen />, mockHistory),
      makeFakeStore({
        [NameSpace.Film]: {
          films: [],
          isFilmsLoading: false,
          currentFilm: mockFilm,
          isCurrentFilmLoading: false,
          promoFilm: undefined,
          isPromoFilmLoading: false,
          currentSimilarFilms: [],
          isCurrentSimilarFilmsLoading: false,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
    expect(screen.queryByText('Add review')).not.toBeInTheDocument();
  });

  it('shows add review button when user is authorized', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FilmScreen />, mockHistory),
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: '',
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
