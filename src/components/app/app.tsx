import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import MainScreen from '../../pages/main-screen/main-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { Film } from '../../types/film';
import { PromoFilmCardProps } from '../promo-film-card/promo-film-card';
import { ReviewProps } from '../review/review.props';
import { PreviewFilm } from '../../types/preview-film';

export type AppProps = {
  promoFilmCard: PromoFilmCardProps;
  smallFilmCards: PreviewFilm[];
  films: Film[];
  reviews: ReviewProps[];
}

export default function App({promoFilmCard, smallFilmCards, films, reviews}: AppProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen promoFilmCard={promoFilmCard} smallFilmCards={smallFilmCards} />}
          />
          <Route
            path={AppRoute.SignIn}
            element={<SignInScreen />}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <MyListScreen smallFilmCards={smallFilmCards} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.FilmData}>
            <Route index element={<NotFoundScreen />} />
            <Route path=':id'>
              <Route index element={<FilmScreen smallFilmCards={smallFilmCards} films={films} reviews={reviews} />} />
              <Route path='review' element={<AddReviewScreen films={films}/>} />
            </Route>
          </Route>
          <Route path={AppRoute.Player}>
            <Route index element={<NotFoundScreen />} />
            <Route path=':id' element={<PlayerScreen films={films} />} />
          </Route>
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
