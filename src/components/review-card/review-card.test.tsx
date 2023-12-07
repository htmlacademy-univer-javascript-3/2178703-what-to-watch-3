import { makeFakeReview } from '../../utils/mocks';
import ReviewCard from './review-card';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';

describe('Component: ReviewCard', () => {
  it('render correctly', () => {
    const review = makeFakeReview();
    const reviewDate = review.date;
    const reviewUser = review.user;
    const reviewRating = review.rating;
    const reviewComment = review.comment;

    const preparedComponent = withHistory(
      <ReviewCard
        date={reviewDate}
        user={reviewUser}
        rating={reviewRating}
        comment={reviewComment}
      />
    );

    render(preparedComponent);

    expect(screen.getByText(reviewDate)).toBeInTheDocument();
    expect(screen.getByText(reviewUser)).toBeInTheDocument();
    expect(screen.getByText(reviewRating)).toBeInTheDocument();
    expect(screen.getByText(reviewComment)).toBeInTheDocument();
  });
});
