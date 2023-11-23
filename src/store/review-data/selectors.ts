import { NameSpace } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getCurrentFilmReviews = (state: State): Review[] => state[NameSpace.Review].currentFilmReviews;
export const getFilmReviewsLoading = (state: State): boolean => state[NameSpace.Review].isFilmReviewsLoading;
