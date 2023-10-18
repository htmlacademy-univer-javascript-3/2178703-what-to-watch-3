import { SmallFilmCardProps } from '../../components/small-film-card/small-film-card.props';
import PromoFilmCard from '../../components/promo-film-card/promo-film-card';
import { PromoFilmCardProps } from '../../components/promo-film-card/promo-film-card.props';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import FilmList from '../../components/film-list/film-list';

type MainScreenProps = {
  promoFilmCard: PromoFilmCardProps;
  smallFilmCards: SmallFilmCardProps[];
}

export default function MainScreen({promoFilmCard, smallFilmCards}: MainScreenProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <PromoFilmCard
          id={promoFilmCard.id}
          posterImage={promoFilmCard.posterImage}
          name={promoFilmCard.name}
          genre={promoFilmCard.genre}
          released={promoFilmCard.released}
          backgroundImage={promoFilmCard.backgroundImage}
          videoLink={promoFilmCard.videoLink}
          isFavorite={promoFilmCard.isFavorite}
        />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="#" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          <FilmList films={smallFilmCards} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
