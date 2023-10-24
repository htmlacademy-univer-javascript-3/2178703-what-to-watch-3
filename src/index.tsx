import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { AppProps } from './components/app/app';
import { films } from './mocks/films';
import { promoFilm } from './mocks/promo-film';
import { reviews } from './mocks/reviews';
import { PreviewFilm } from './types/preview-film';

const appData: AppProps = {
  promoFilmCard: promoFilm,
  smallFilmCards: films.slice(1, films.length) as PreviewFilm[],
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
