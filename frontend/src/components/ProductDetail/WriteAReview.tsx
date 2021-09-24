import React, { FormEvent, useRef, useState } from 'react';
import axios from 'axios';
import Spinner from '../Utils/Spinner';

interface WriteAReviewProps {
  productId: string;
};

const WriteAReview: React.FC<WriteAReviewProps> = ({ productId }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const reviewTitleRef = useRef<HTMLInputElement>(null);
  const reviewDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const ratingRef = useRef<HTMLSelectElement>(null);

  const handleReviewFormSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const reviewTitle = reviewTitleRef.current!.value;
      const reviewDescription = reviewDescriptionRef.current!.value;
      const rating = ratingRef.current!.value;
      if (!rating) return;

      setIsProcessing(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/reviews`, {
        product: productId,
        rating: rating,
        reviewTitle: reviewTitle,
        reviewDescription: reviewDescription
      }, {
        withCredentials: true
      });

      window.location.reload();

    } catch (err: any) {
      setIsProcessing(false);
      alert(err?.response?.data?.message || 'Something went wrong!');

    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="review-write">
      <h1 className="review-write__text">Write a review</h1>
      <form className="review-write__form" onSubmit={handleReviewFormSubmit}>
        <div className="review-write__inputs">
          <input type="text" required className="review-write__title" ref={reviewTitleRef} minLength={3} placeholder="Title of the review" />
          <textarea ref={reviewDescriptionRef} required minLength={20} className="review-write__textarea" placeholder="Express what you feel about the product!"></textarea>
        </div>
        <div className="review-write__actions">
          <select ref={ratingRef} required className="review-write__select">
            <option disabled value="" selected>Select a rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button className="btn btn--outlined review-write__button" type="submit" disabled={isProcessing}>
            {isProcessing || 'Submit'}
            {isProcessing && <Spinner size='30' styles={{ margin: '-15px' }} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteAReview;