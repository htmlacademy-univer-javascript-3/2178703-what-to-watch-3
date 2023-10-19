import { Helmet } from 'react-helmet-async';
import { Film } from '../../types/film';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import FormReview from '../../components/form-review/form-review';

type AddReviewScreenProps = {
  films: Film[];
}

export default function AddReviewScreen({films}: AddReviewScreenProps) {
  const { id } = useParams();
  const film = films.find((item) => item.id === id) as Film;
  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>WTW. Add review {film.name}</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.FilmData}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.FilmData}/${film.id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link className="user-block__link" to={AppRoute.SignIn}>Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <FormReview />
    </section>
  );
}
