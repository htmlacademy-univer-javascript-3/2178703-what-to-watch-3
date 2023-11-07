import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import { Film } from '../../types/film';
import FilmList from '../../components/film-list/film-list';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppRoute, FILM_SAME_GENRE_COUNT } from '../../const';
import { ReviewData } from '../../types/review';
import Tabs from '../../components/tabs/tabs';
import { useFilmsByGenre } from '../../hooks/films-by-genre';

type FilmScreenProps = {
  films: Film[];
  reviews: ReviewData[];
}

export default function FilmScreen({films, reviews}: FilmScreenProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const film = films.find((item) => item.id === id) as Film;

  return (
    <>
      <Helmet>
        <title>WTW. {film.name}</title>
      </Helmet>
      <section className="film-card film-card--full" style={{background: film.backgroundColor}}>
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
            <Tabs film={film} reviews={reviews} />

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={useFilmsByGenre(film.genre)} filmCount={FILM_SAME_GENRE_COUNT} />
        </section>

        <Footer />
      </div>
    </>
  );
}

