import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { ReviewResponseType, ReviewStatsType, SingleProductReview } from '../../types/APIResponseTypes';
import { authStateType } from '../../types/stateTypes';
import Spinner from '../Utils/Spinner';
import ReviewsList from './ReviewsList';
import ReviewStats from './ReviewStats';
import WriteAReview from './WriteAReview';

interface ReviewsProps {
  productId: string;
  ratingsAverage: number;
};

const Reviews: React.FC<ReviewsProps> = ({ productId, ratingsAverage }) => {
  const auth: authStateType = useSelector((state: RootStateOrAny) => state.auth);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<ReviewResponseType[]>([]);
  const [stats, setStats] = useState<ReviewStatsType | null>(null);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [hasPurchased, setHasPurchased] = useState<boolean>(false);

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
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products/${productId}/reviews`, {
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
      setHasReviewed(data.hasReviewed);
      setHasPurchased(data.hasPurchased);
    }).finally(() => setIsLoading(false));
  }, [hasScrolled]);

  return (
    <section className="section section--product-reviews" ref={sectionRef}>
      {isLoading && <Spinner />}
      {
        !isLoading && (
          <>
            {auth.isLoggedIn && hasPurchased && !hasReviewed && <WriteAReview productId={productId} />}
            {<ReviewStats stats={stats} ratingsAverage={ratingsAverage} />}
            {<ReviewsList reviews={reviews} />}
          </>
        )
      }
    </section>
  );
};

export default Reviews;