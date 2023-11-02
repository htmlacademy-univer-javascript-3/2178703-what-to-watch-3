import { useAppDispatch } from '../../hooks';
import { changeShownFilmCount } from '../../store/action';

export default function ShowMoreFilmButton() {
  const dispatch = useAppDispatch();
  return(
    <div className="catalog__more">
      <button onClick={() => dispatch(changeShownFilmCount())} className="catalog__button" type="button">Show more</button>
    </div>
  );
}
