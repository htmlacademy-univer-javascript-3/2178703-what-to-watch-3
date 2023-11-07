import PromoFilmCard from '../../components/promo-film-card/promo-film-card';
import { PromoFilmCardProps } from '../../components/promo-film-card/promo-film-card';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import { useAppSelector } from '../../hooks';
import ShowMoreFilmButton from '../../components/show-more-film-button/show-more-film-button';
import { useState } from 'react';
import { useFilmsByGenre } from '../../hooks/films-by-genre';
import { SHOWN_FILM_COUNT } from '../../const';
import { getGenreList } from '../../utils/get-genre-list';

type MainScreenProps = {
  promoFilmCard: PromoFilmCardProps;
}

export default function MainScreen({promoFilmCard}: MainScreenProps) {
  const activeGenre = useAppSelector((state) => state.genre);
  const films = useAppSelector((state) => state.films);
  const [shownFilmCount, setShownFilmCount] = useState(SHOWN_FILM_COUNT);
  const filmsByGenre = useFilmsByGenre(activeGenre);

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>
      <PromoFilmCard
        id={promoFilmCard.id}
        posterImage={promoFilmCard.posterImage}
        name={promoFilmCard.name}
        genre={promoFilmCard.genre}
        released={promoFilmCard.released}
        backgroundImage={promoFilmCard.backgroundImage}
      />

      <div className="page-content">
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
