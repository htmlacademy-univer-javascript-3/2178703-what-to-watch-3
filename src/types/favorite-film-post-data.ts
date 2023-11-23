import { Film } from './film';

export type FavoriteFilmPostData = Film & {
  previewImage: string;
  previewVideoLink: string;
  }
