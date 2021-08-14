import { RootStateOrAny, useSelector } from 'react-redux';
import { BsFillLockFill } from 'react-icons/bs';
import { ProductResponseType } from '../../types/APIResponseTypes';
import { MONTHS } from '../../utils';

export interface CartWishlistBuyProps {
  product: ProductResponseType;
};

const CartWishlistBuy: React.SFC<CartWishlistBuyProps> = ({ product }) => {
  const currency = useSelector((state: RootStateOrAny) => state.currency);

  const getDeliveryDate = (days: number): string => {
    const deliveryTimestamp = new Date(Date.now() + (days * 24 * 60 * 60 * 1000));
    const day = deliveryTimestamp.getDate();
    const weekDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(deliveryTimestamp);
    const month = MONTHS[deliveryTimestamp.getMonth()];
    return `${weekDay}, ${month} ${day}`;
  };

  return (
    <section className="product__cart-wishlist-buy">
      <div className="product__cart-wishlist-buy__price">
        <h3 className="product__cart-wishlist-buy__price__text">Buy now:</h3>
        <h3 className="product__cart-wishlist-buy__price__value">{currency.symbol}{product.priceOffer * currency.multiplier}</h3>
      </div>
      <h4 className="product__cart-wishlist-buy__delivery">Expected Delivery: <span className="product__cart-wishlist-buy__delivery__date">{getDeliveryDate(5)}</span></h4>
      <h1 className={`product__cart-wishlist-buy__stock ${!product.isInStock && 'out-of-stock'}`}>{product.isInStock ? 'In stock' : 'Out of stock'}</h1>
      <div className="product__cart-wishlist-buy__options">
        <select defaultValue={1}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => <option key={index} value={value}>{value}</option>)}
        </select>
        <button className="btn btn--add-to-cart">Add to Cart</button>
        <button className="btn btn--buy">Buy Now</button>
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
    </section>
  );
};

export default CartWishlistBuy;