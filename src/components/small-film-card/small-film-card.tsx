import { Link } from 'react-router-dom';
import { SmallFilmCardProps } from './small-film-card.props';
import { AppRoute } from '../../const';

export default function SmallFilmCard({id, previewImage, name}: SmallFilmCardProps) {
  return (
    <>
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.FilmData}/${id}`}>{name}</Link>
      </h3>
    </>
  );
}
