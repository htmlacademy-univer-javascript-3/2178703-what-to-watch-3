import { createMemoryHistory } from 'history';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeFilm, makeFakeStore } from '../../utils/mocks';
import { AppRoute, NameSpace } from '../../const';
import AddReviewScreen from './add-review-screen';
import { render, screen } from '@testing-library/react';

describe('AddReviewScreen', () => {
  const mockHistory = createMemoryHistory();
  const mockFilm = makeFakeFilm();

  beforeEach(() => {
    mockHistory.push(`${AppRoute.FilmData}/${mockFilm.id}/review`);
  });

  it('render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<AddReviewScreen />, mockHistory),
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
  });
});
