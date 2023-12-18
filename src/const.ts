export const RATING_STAR_COUNT = 10;
export const DEBOUNCE_TIME_FOR_PREVIEW_VIDEO = 1000;
export const FILM_SAME_GENRE_COUNT = 4;
export const SHOWN_FILM_COUNT = 8;
export const SHOWN_GENRE_COUNT = 10;
export const DEFAULT_GENRE = 'All genres';
export const SECOND_COUNT_IN_HOUR = 3600;
export const SECOND_COUNT_IN_MINUTE = 60;
export const MINUTE_COUNT_IN_HOUR = 60;
export const MAX_REVIEW_TEXT_LENGTH = 400;

export const SingInErrorMessage = {
  Email: 'Please enter a valid email address',
  Password: 'Password should contain at least one number and one letter',
};

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  FilmData = '/films',
  Player = '/player',
}

export const APIRoute = {
  Films: '/films',
  Login: '/login',
  Logout: '/logout',
  Comments: '/comments',
  PromoFilm: '/promo',
  FavoriteFilms: '/favorite'
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const FilmTab = {
  Overview: 'OVERVIEW',
  Details: 'DETAILS',
  Reviews: 'REVIEWS'
};

export const FilmTabNameInterface = {
  [FilmTab.Overview]: 'Overview',
  [FilmTab.Details]: 'Details',
  [FilmTab.Reviews]: 'Reviews',
};

export enum NameSpace {
  Genre = 'GENRE',
  MyList = 'MY_LIST',
  Film = 'FILM',
  Review = 'REVIEW',
  User = 'USER',
  PostingReview = 'POSTING_REVIEW'
}
