import { ReactNode } from 'react';
import { ReviewProps } from '../review/review.props';
import Review from '../review/review';

type FilmReviewsProps = {
  reviews: ReviewProps[];
}

export default function FilmReviews({reviews}: FilmReviewsProps): ReactNode {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review: ReviewProps) => (
          <Review
            key={review.id}
            id={review.id}
            date={review.date}
            comment={review.comment}
            user={review.user}
            rating={review.rating}
          />
        ))}
      </div>
    </div>
  );
}

