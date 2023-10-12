import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import MainScreen from '../../pages/main-screen/main-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { AppProps } from './app.props';
import { FilmCardCount } from '../../mocks';

export default function App({promoFilmCard, smallFilmCards}: AppProps): ReactNode {
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
                <MyListScreen smallFilmCards={smallFilmCards.slice(0, FilmCardCount.MyListScreen)} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.FilmData}>
            <Route index element={<NotFoundScreen />} />
            <Route path=':id'>
              <Route index element={<FilmScreen smallFilmCards={smallFilmCards.slice(0, FilmCardCount.FilmScreen)} />} />
              <Route path='review' element={<AddReviewScreen />} />
            </Route>
          </Route>
          <Route path={AppRoute.Player}>
            <Route index element={<NotFoundScreen />} />
            <Route path=':id' element={<PlayerScreen />} />
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
