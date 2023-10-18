import { Film } from '../../types/film';

const HOUR_MINUTES_COUNT = 60;

type FilmDetailsProps = {
  film: Film;
}

const getRunTime = (runTime: number) => {
  const hour = Math.floor(runTime / HOUR_MINUTES_COUNT);
  const minute = runTime - hour * HOUR_MINUTES_COUNT;
  return `${hour}h ${minute}m`;
};

export default function FilmDetails({film}: FilmDetailsProps) {
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {film.starring.join(',\n')}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getRunTime(film.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film.released}</span>
        </p>
      </div>
    </div>
  );
}

