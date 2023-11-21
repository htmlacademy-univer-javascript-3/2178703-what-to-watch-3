import Review from '../review/review';
import { ReviewData } from '../../types/review-data';

type FilmReviewsProps = {
  reviews: ReviewData[];
}

export default function FilmReviews({reviews}: FilmReviewsProps) {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review: ReviewData) => (
          <Review
            key={review.id}
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

