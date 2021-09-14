import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ReviewResponseType, ReviewStatsType, SingleProductReview } from '../../types/APIResponseTypes';
import Spinner from '../Utils/Spinner';
import ReviewsList from './ReviewsList';
import ReviewStats from './ReviewStats';

interface ReviewsProps {
  productId: string;
  ratingsAverage: number;
};

const Reviews: React.FC<ReviewsProps> = ({ productId, ratingsAverage }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<ReviewResponseType[]>([]);
  const [stats, setStats] = useState<ReviewStatsType>();

  // Detect if user scrolls to the reviews section
  useEffect(() => {
    if (!sectionRef.current) return;
    const options = {
      root: null,
      threshold: 0,
    };

    const observer = new IntersectionObserver(([entries], observer) => {
      if (entries.isIntersecting) {
        observer.unobserve(sectionRef.current!);
        return setHasScrolled(true);
      }
    }, options);

    observer.observe(sectionRef.current!);
  }, []);

  // If user has scrolled, fetch data and render reviews
  const getReviews = async () => {
    const { data } = await axios.get(`/api/v1/products/${productId}/reviews`, {
      withCredentials: true
    });
    return data.data;
  };

  // If the section has been reached, get the data and set the states
  useEffect(() => {
    if (!hasScrolled) return;
    getReviews().then((data: SingleProductReview) => {
      setReviews(data.reviews);
      setStats(data.stats);
    }).finally(() => setIsLoading(false));
  }, [hasScrolled]);

  return (
    <section className="section section--product-reviews" ref={sectionRef}>
      {isLoading && <Spinner />}
      {
        !isLoading && (
          <>
            {stats && <ReviewStats stats={stats} ratingsAverage={ratingsAverage} />}
            {reviews && <ReviewsList reviews={reviews} />}
          </>
        )
      }
    </section>
  );
};

export default Reviews;