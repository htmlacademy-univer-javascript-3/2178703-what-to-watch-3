import { Film } from '../../types/film';
import { PromoFilmCardProps } from '../promo-film-card/promo-film-card.props';
import { ReviewProps } from '../review/review.props';
import { SmallFilmCardProps } from '../small-film-card/small-film-card.props';

export type AppProps = {
  promoFilmCard: PromoFilmCardProps;
  smallFilmCards: SmallFilmCardProps[];
  films: Film[];
  reviews: ReviewProps[];
}

