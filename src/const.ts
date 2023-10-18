export const RATING_STAR_COUNT = 10;

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  FilmData = '/films',
  Player = '/player',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum FilmBlockLink {
  Overview = 'OVERVIEW',
  Details = 'DETAILS',
  Reviews = 'REVIEWS'
}
