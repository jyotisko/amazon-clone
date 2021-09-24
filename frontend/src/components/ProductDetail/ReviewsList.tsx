import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import { ReviewResponseType } from '../../types/APIResponseTypes';
import Ratings from '../Utils/Ratings';
import { MAX_REVIEWS_TO_SHOW_PER_PRODUCT } from '../../utils';

interface ReviewsListProps {
  reviews: ReviewResponseType[];
};

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <section className="review-list">
      <h1 className="review-list__title">Recent reviews</h1>
      {reviews.length === 0 && <h2 className="review-none">Be the first person to review this product!</h2>}
      {reviews.slice(0, MAX_REVIEWS_TO_SHOW_PER_PRODUCT).map((review) => {
        return (
          <div className="review-list__item" key={review._id}>
            <div className="review-list__item__user">
              <img src={review.user.photo} alt={review.user.name} className="review-list__item__user__image" />
              <h4 className="review-list__item__user__name">{review.user.name}</h4>
            </div>
            <div className="review-list__item__rating">
              <Ratings ratingsAverage={review.rating} />
              <h4 className="review-list__item__title">{review.reviewTitle}</h4>
            </div>
            <p className="review-list__item__description">{review.reviewDescription}</p>
          </div>
        );
      })}

      {
        reviews.length > MAX_REVIEWS_TO_SHOW_PER_PRODUCT && <Link className="review-list__all" to={`/reviews/${reviews[0].product}`}>
          See all reviews <AiOutlineRight />
        </Link>
      }
    </section>
  );
};

export default ReviewsList;