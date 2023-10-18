import { ChangeEvent, useState } from 'react';
import { RATING_STAR_COUNT } from '../../const';

export default function FormReview(): JSX.Element {
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(evt.target.value);
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: RATING_STAR_COUNT }, (_, i) => i + 1)
              .reverse()
              .map((number) => (
                <>
                  <input
                    key={`star-${number}`}
                    className="rating__input"
                    onChange={handleRatingChange}
                    id={`star-${number}`}
                    type="radio"
                    name="rating"
                    value={`${number}`}
                    checked={`${number}` === rating}
                  />
                  <label
                    className="rating__label"
                    htmlFor={`star-${number}`}
                  >
                    Rating {number}
                  </label>
                </>
              ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={handleReviewChange}
          >
            {reviewText}
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>);
}

