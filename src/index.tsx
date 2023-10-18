import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { AppProps } from './components/app/app.props';
import { films } from './mocks/films';
import { promoFilm } from './mocks/promo-film';
import { reviews } from './mocks/reviews';
import { SmallFilmCardProps } from './components/small-film-card/small-film-card.props';

const appData: AppProps = {
  promoFilmCard: promoFilm,
  smallFilmCards: films.slice(1, films.length) as SmallFilmCardProps[],
  films: films,
  reviews: reviews,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      promoFilmCard={appData.promoFilmCard}
      smallFilmCards={appData.smallFilmCards}
      films={appData.films}
      reviews={appData.reviews}
    />
  </React.StrictMode>
);
