import React from 'react';
import { ReviewStatsType } from '../../types/APIResponseTypes';

interface ReviewStatsProps {
  stats: ReviewStatsType | null;
  ratingsAverage: number;
};

const ReviewStats: React.FC<ReviewStatsProps> = ({ stats, ratingsAverage }) => {
  const calcFillPercentage = (quantityOfSpecificRating: number): string => {
    const percentage = (quantityOfSpecificRating / stats!.totalRatings) * 100;
    return `${percentage}%`;
  };

  return (
    <div className="review-stats">
      <h1 className="review-stats__title">Customer reviews</h1>
      {!stats && <h2 className="review-none">No reviews yet!</h2>}
      {
        stats && (
          <>
            <h3 className="review-stats__average-rating">{ratingsAverage} out of 5 ratings</h3>
            <h4 className="review-stats__total-ratings">{stats.totalRatings} global ratings</h4>
            {[5, 4, 3, 2, 1].map((el: number) => {
              const fillPercentage = calcFillPercentage(eval(`stats.ratingsWith${el}Star`));
              return (
                <div key={el} className="review-stats__rating-row">
                  <h4 className="review-stats__rating-row__rating">{el} stars</h4>
                  <div className="review-stats__bar">
                    <span className="review-stats__fill" style={{ width: fillPercentage }}></span>
                  </div>
                  <h4 className="review-stats__rating-row__percentage">{fillPercentage}</h4>
                </div>
              );
            })}
          </>
        )
      }
    </div>
  )
};

export default ReviewStats;