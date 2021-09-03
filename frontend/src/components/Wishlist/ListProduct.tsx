import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import Spinner from '../Utils/Spinner';
import { currencyStateType } from '../../types/stateTypes';
import { ProductResponseType } from '../../types/APIResponseTypes';
import { MONTHS } from '../../utils';
import Ratings from '../Utils/Ratings';

export interface ListProductProps {
  product: ProductResponseType;
  onItemRemove: (id: string) => void;
  createdAt: Date;
  wishlistId: string;
};

const ListProduct: React.FC<ListProductProps> = ({ product, onItemRemove, createdAt, wishlistId }) => {
  const currency: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getFormattedDate = (): string => {
    const dateObj = new Date(createdAt);
    const month = MONTHS[dateObj.getMonth()];
    const date = dateObj.getDate();
    const weekDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateObj);

    let datePrefix = 'st';
    if (String(date).slice(-1) === '1') datePrefix = 'st';
    else if (String(date).slice(-1) === '2') datePrefix = 'nd';
    else if (String(date).slice(-1) === '3') datePrefix = 'rd';
    else datePrefix = 'th';

    return `${weekDay}, ${month} ${date}${datePrefix}`;
  };

  const removeItem = async (): Promise<void> => {
    setIsLoading(true);
    await axios.delete(`${process.env.REACT_APP_API_URL}/wishlists/myWishlists/${wishlistId}`, {
      withCredentials: true
    });
    setIsLoading(false);
    onItemRemove(wishlistId);
  };

  return (
    <div className="wishlist__list__product" >
      <img loading='lazy' className="wishlist__list__product__image" src={product.imageMain} alt={product.name.slice(50)} />
      <div className="wishlist__list__product__text">
        <Link to={`/product/${product._id}`} className="wishlist__list__product__name">{product.name}</Link>
        <Ratings ratingsAverage={product.ratingsAverage} ratingsQuantity={product.ratingsQuantity} />
        <h4 className="wishlist__list__product__price">
          <span className="wishlist__list__product__currency">{currency.symbol}</span>{product.priceOffer * currency.multiplier}
        </h4>
      </div>
      <div className="wishlist__list__product__controls">
        <h5 className="wishlist__list__product__date">Item added {getFormattedDate()}</h5>
        <button disabled={isLoading} className="btn btn--wishlist wishlist__list__product__button" onClick={() => removeItem()}>
          {isLoading || 'Delete'}
          {isLoading && <Spinner size={20} styles={{ margin: '-10px' }} />}
        </button>
      </div>
    </div>
  );
};

export default ListProduct;