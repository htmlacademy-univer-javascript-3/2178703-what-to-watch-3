import cn from 'classnames';
import { useState } from 'react';
import { FilmTab, FilmTabNameInterface } from '../../const';
import { Film } from '../../types/film';
import FilmOverview from './tab-film-overview';
import FilmDetails from './tab-film-details';
import FilmReviews from './tab-film-reviews';
import { Review } from '../../types/review';

type TabsProps = {
  film: Film;
  reviews: Review[];
}

const getFilmActiveTabInfo = (activeTab: string, film: Film, reviews: Review[]) => {
  switch(activeTab) {
    case FilmTab.Overview:
      return (
        <FilmOverview
          description={film.description}
          rating={film.rating}
          scoresCount={film.scoresCount}
          director={film.director}
          starring={film.starring}
        />);
    case FilmTab.Details:
      return (
        <FilmDetails
          director={film.director}
          starring={film.starring}
          genre={film.genre}
          runTime={film.runTime}
          released={film.released}
        />);
    case FilmTab.Reviews:
      return(
        <FilmReviews reviews={reviews} />
      );
    default:
      break;
  }
};

export default function Tabs({film, reviews}: TabsProps) {
  const [activeTab, setActiveTab] = useState(FilmTab.Overview);

  const handlerOverviewLinkClick = () => {
    setActiveTab(FilmTab.Overview);
  };

  const handlerDetailsLinkClick = () => {
    setActiveTab(FilmTab.Details);
  };

  const handlerReviewsLinkClick = () => {
    setActiveTab(FilmTab.Reviews);
  };
  return(
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={cn('film-nav__item', {'film-nav__item--active': activeTab === FilmTab.Overview})}>
            <a data-testid="film-overview-link" className="film-nav__link" onClick={handlerOverviewLinkClick}>{FilmTabNameInterface[FilmTab.Overview]}</a>
          </li>
          <li className={cn('film-nav__item', {'film-nav__item--active': activeTab === FilmTab.Details})}>
            <a data-testid="film-details-link" className="film-nav__link" onClick={handlerDetailsLinkClick}>{FilmTabNameInterface[FilmTab.Details]}</a>
          </li>
          <li className={cn('film-nav__item', {'film-nav__item--active': activeTab === FilmTab.Reviews})}>
            <a data-testid="film-reviews-link" className="film-nav__link" onClick={handlerReviewsLinkClick}>{FilmTabNameInterface[FilmTab.Reviews]}</a>
          </li>
        </ul>
      </nav>

      {getFilmActiveTabInfo(activeTab, film, reviews)}
    </div>
  );
}

