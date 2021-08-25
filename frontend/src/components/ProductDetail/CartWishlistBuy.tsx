import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { BsFillLockFill } from 'react-icons/bs';
import { ProductResponseType } from '../../types/APIResponseTypes';
import { authStateType, currencyStateType } from '../../types/stateTypes';
import { getDate } from '../../utils';
import AddToListButton from './AddToListButton';
import AddToCartButton from './AddToCartButton';
import BuyButton from './BuyButton';

export interface CartWishlistBuyProps {
  product: ProductResponseType;
};

const CartWishlistBuy: React.FC<CartWishlistBuyProps> = ({ product }) => {
  const currency: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);
  const { user }: authStateType = useSelector((state: RootStateOrAny) => state.auth);

  return (
    <section className="product__cart-wishlist-buy">
      <div className="product__cart-wishlist-buy__price">
        <h3 className="product__cart-wishlist-buy__price__text">Buy now:</h3>
        <h3 className="product__cart-wishlist-buy__price__value">{currency.symbol}{product.priceOffer * currency.multiplier}</h3>
      </div>
      <h4 className="product__cart-wishlist-buy__delivery">Expected Delivery: <span className="product__cart-wishlist-buy__delivery__date">{getDate(5)}</span></h4>
      <h1 className={`product__cart-wishlist-buy__stock ${!product.isInStock && 'out-of-stock'}`}>{product.isInStock ? 'In stock' : 'Out of stock'}</h1>
      <div className="product__cart-wishlist-buy__options">
        <AddToCartButton product={product} user={user} />
        <BuyButton product={product} />
      </div>
      <div className="product__cart-wishlist-buy__transaction">
        <a href="#" className="product__cart-wishlist-buy__transaction__secure"><BsFillLockFill /> Secure transaction</a>
        <h5 className="product__cart-wishlist-buy__transaction__detail">
          <span className="product__cart-wishlist-buy__transaction__detail__key">Ships from</span>
          <span className="product__cart-wishlist-buy__transaction__detail__value">Amazon.com</span>
        </h5>
        <h5 className="product__cart-wishlist-buy__transaction__detail">
          <span className="product__cart-wishlist-buy__transaction__detail__key">Sold by</span>
          <span className="product__cart-wishlist-buy__transaction__detail__value">Amazon.com</span>
        </h5>
      </div>
      <AddToListButton productId={product._id} user={user} />
    </section>
  );
};

export default CartWishlistBuy;