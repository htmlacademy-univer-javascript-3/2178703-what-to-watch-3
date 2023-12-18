import PromoFilmCard from '../../components/promo-film-card/promo-film-card';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ShowMoreFilmButton from '../../components/show-more-film-button/show-more-film-button';
import { useEffect, useState } from 'react';
import { useFilmsByGenre } from '../../hooks/use-films-by-genre';
import { SHOWN_FILM_COUNT } from '../../const';
import { getGenreList } from '../../utils/get-genre-list';
import { getActiveGenre } from '../../store/genre-process/selectors';
import { getFilms, getPromoFilm, getPromoFilmLoading } from '../../store/film-data/selectors';
import Spinner from '../../components/spinner/spinner';
import { fetchPromoFilmAction } from '../../store/api-actions/get-actions/get-actions';

export default function MainScreen() {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(getActiveGenre);
  const films = useAppSelector(getFilms);
  const [shownFilmCount, setShownFilmCount] = useState(SHOWN_FILM_COUNT);
  const filmsByGenre = useFilmsByGenre(activeGenre);
  const promoFilmCard = useAppSelector(getPromoFilm);
  const isPromoFilmLoading = useAppSelector(getPromoFilmLoading);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  if(isPromoFilmLoading) {
    return(
      <Spinner />
    );
  }

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>
      {promoFilmCard &&
      <PromoFilmCard
        id={promoFilmCard.id}
        posterImage={promoFilmCard.posterImage}
        name={promoFilmCard.name}
        genre={promoFilmCard.genre}
        released={promoFilmCard.released}
        backgroundImage={promoFilmCard.backgroundImage}
      />}

      <div className="page-content" data-testid="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList genres={getGenreList(films)} onGenreClick={() => setShownFilmCount(SHOWN_FILM_COUNT)}/>

          <FilmList films={filmsByGenre} filmCount={shownFilmCount}/>
          {shownFilmCount < filmsByGenre.length && <ShowMoreFilmButton onShowMoreFilmButtonClick={() => setShownFilmCount(shownFilmCount + SHOWN_FILM_COUNT)} />}
        </section>

        <Footer />
      </div>
    </>
  );
}
