import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

export interface RatingsProps {
  ratingsAverage: number;
  ratingsQuantity: number;
  className?: string;
};

const Ratings: React.FC<RatingsProps> = ({ ratingsAverage, ratingsQuantity, className = '' }) => {
  return (
    <div className={`${className} ratings`}>
      {
        [1, 2, 3, 4, 5].map((rating, index) => {
          if (ratingsAverage >= rating) return <i key={index} className="icon icon--star icon--star--fill ratings__icon"><AiFillStar /></i>;
          else return <i key={index} className="icon icon--star icon--star--outline ratings__icon"><AiOutlineStar /></i>;
        })
      }
      <a href="#" className="ratings__quantity">{ratingsQuantity} ratings</a>
    </div>
  );
};

export default Ratings;