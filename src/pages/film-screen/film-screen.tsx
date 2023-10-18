import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { SmallFilmCardProps } from '../../components/small-film-card/small-film-card.props';
import { Helmet } from 'react-helmet-async';
import { Film } from '../../types/film';
import FilmList from '../../components/film-list/film-list';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppRoute, FilmBlockLink } from '../../const';
import { useState } from 'react';
import FilmOverview from '../../components/film-overview/film-overview';
import FilmDetails from '../../components/film-details/film-details';
import FilmReviews from '../../components/film-reviews/film-reviews';
import { ReviewProps } from '../../components/review/review.props';

type FilmScreenProps = {
  smallFilmCards: SmallFilmCardProps[];
  films: Film[];
  reviews: ReviewProps[];
}

export default function FilmScreen({smallFilmCards, films, reviews}: FilmScreenProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const film = films.find((item) => item.id === id) as Film;

  const [filmInfo, setFilmInfo] = useState(<FilmOverview film={film} />);
  const [blockLink, setBlockLink] = useState(FilmBlockLink.Overview);

  const handlerOverviewLinkClick = () => {
    setFilmInfo(<FilmOverview film={film} />);
    setBlockLink(FilmBlockLink.Overview);
  };

  const handlerDetailsLinkClick = () => {
    setFilmInfo(<FilmDetails film={film} />);
    setBlockLink(FilmBlockLink.Details);
  };

  const handlerReviewsLinkClick = () => {
    setFilmInfo(<FilmReviews reviews={reviews} />);
    setBlockLink(FilmBlockLink.Reviews);
  };

  return (
    <>
      <Helmet>
        <title>WTW. {film.name}</title>
      </Helmet>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${AppRoute.Player}/${film.id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={`${AppRoute.FilmData}/${film.id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className={`film-nav__item ${blockLink === FilmBlockLink.Overview ? 'film-nav__item--active' : ''}`}>
                    <a className="film-nav__link" onClick={handlerOverviewLinkClick}>Overview</a>
                  </li>
                  <li className={`film-nav__item ${blockLink === FilmBlockLink.Details ? 'film-nav__item--active' : ''}`}>
                    <a className="film-nav__link" onClick={handlerDetailsLinkClick}>Details</a>
                  </li>
                  <li className={`film-nav__item ${blockLink === FilmBlockLink.Reviews ? 'film-nav__item--active' : ''}`}>
                    <a className="film-nav__link" onClick={handlerReviewsLinkClick}>Reviews</a>
                  </li>
                </ul>
              </nav>

              {filmInfo}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <FilmList films={smallFilmCards} />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

