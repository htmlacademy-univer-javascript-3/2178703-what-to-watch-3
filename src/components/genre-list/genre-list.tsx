import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeActiveGenre, setDefaultShownFilmCount, showFilmsByGenre } from '../../store/action';

type GenreListProps = {
  genres: string[];
}

export default function GenreList({genres}: GenreListProps) {
  const activeGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  return(
    <ul className="catalog__genres-list">
      {genres.map((genre: string) => (
        <li key={genre} className={cn('catalog__genres-item', {'catalog__genres-item--active': activeGenre === genre})}>
          <a onClick={() => {
            dispatch(changeActiveGenre({ genre: genre }));
            dispatch(showFilmsByGenre());
            dispatch(setDefaultShownFilmCount());
          }} className="catalog__genres-link"
          >{genre}
          </a>
        </li>
      ))}
    </ul>
  );
}
