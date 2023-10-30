import cn from 'classnames';
import { useEffect, useState } from 'react';
import { FilmBlockLink } from '../../const';
import { Film } from '../../types/film';
import FilmOverview from './tab-film-overview';
import FilmDetails from './tab-film-details';
import FilmReviews from './tab-film-reviews';
import { ReviewData } from '../../types/review';

type TabsProps = {
  film: Film;
  reviews: ReviewData[];
}

export default function Tabs({film, reviews}: TabsProps) {
  const [blockLink, setBlockLink] = useState(FilmBlockLink.Overview);
  const [filmInfo, setFilmInfo] = useState(
    <FilmOverview
      description={film.description}
      rating={film.rating}
      scoresCount={film.scoresCount}
      director={film.director}
      starring={film.starring}
    />
  );

  useEffect(() => {
    setFilmInfo(
      <FilmOverview
        description={film.description}
        rating={film.rating}
        scoresCount={film.scoresCount}
        director={film.director}
        starring={film.starring}
      />
    );

    setBlockLink(FilmBlockLink.Overview);
  }, [film.description, film.director, film.rating, film.scoresCount, film.starring]);

  const handlerOverviewLinkClick = () => {
    setFilmInfo(
      <FilmOverview
        description={film.description}
        rating={film.rating}
        scoresCount={film.scoresCount}
        director={film.director}
        starring={film.starring}
      />
    );
    setBlockLink(FilmBlockLink.Overview);
  };

  const handlerDetailsLinkClick = () => {
    setFilmInfo(
      <FilmDetails
        director={film.director}
        starring={film.starring}
        genre={film.genre}
        runTime={film.runTime}
        released={film.released}
      />
    );
    setBlockLink(FilmBlockLink.Details);
  };

  const handlerReviewsLinkClick = () => {
    setFilmInfo(<FilmReviews idFilm={film.id} reviews={reviews} />);
    setBlockLink(FilmBlockLink.Reviews);
  };
  return(
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={cn('film-nav__item', {'film-nav__item--active': blockLink === FilmBlockLink.Overview})}>
            <a className="film-nav__link" onClick={handlerOverviewLinkClick}>Overview</a>
          </li>
          <li className={cn('film-nav__item', {'film-nav__item--active': blockLink === FilmBlockLink.Details})}>
            <a className="film-nav__link" onClick={handlerDetailsLinkClick}>Details</a>
          </li>
          <li className={cn('film-nav__item', {'film-nav__item--active': blockLink === FilmBlockLink.Reviews})}>
            <a className="film-nav__link" onClick={handlerReviewsLinkClick}>Reviews</a>
          </li>
        </ul>
      </nav>

      {filmInfo}
    </div>
  );
}

