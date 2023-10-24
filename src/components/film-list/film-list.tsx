import { DEBOUNCE_TIME_FOR_PREVIEW_VIDEO } from '../../const';
import { SmallFilmCardProps } from '../small-film-card/small-film-card';
import SmallFilmCard from '../small-film-card/small-film-card';
import { useRef, useState } from 'react';

type FilmListProps = {
  films: SmallFilmCardProps[];
}

export default function FilmList({films}: FilmListProps) {
  const [activeFilm, setActiveFilm] = useState('');
  const timer = useRef<NodeJS.Timeout>();

  return (
    <div className="catalog__films-list">
      {films.map((film: SmallFilmCardProps) => (
        <SmallFilmCard
          key={film.id}
          id={film.id}
          previewImage={film.previewImage}
          name={film.name}
          previewVideoLink={film.previewVideoLink}
          isPlayingPreviewVideo={film.id === activeFilm}
          onSmallFilmCardMouseOver={() => {
            timer.current = setTimeout(() => {
              setActiveFilm(film.id);
            }, DEBOUNCE_TIME_FOR_PREVIEW_VIDEO);
          }}
          onSmallFilmCardMouseOut={() => {
            clearTimeout(timer.current);
            setActiveFilm('');
          }}
        />
      ))}
    </div>
  );
}

