import { Link } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { PurchasesResponseType } from '../../types/APIResponseTypes';
import { currencyStateType } from '../../types/stateTypes';
import { formatNumber } from '../../utils';
import Ratings from '../Utils/Ratings';

export interface OrdersItemProps {
  item: PurchasesResponseType;
};

const OrdersItem: React.FC<OrdersItemProps> = ({ item }) => {
  const currency: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);

  return (
    <div className="orders__item">
      <div className="orders__item__image__container">
        <img src={item.product.imageMain} alt={item.product.name.slice(0, 50)} className="orders__item__image" />
      </div>
      <div className="orders__item__details">
        <Link to={`/product/${item.product._id}`} className="orders__item__name">{item.product.name}</Link>
        <h4 className="orders__item__price-text">
          Total price:
          <span className="orders__item__price">
            {formatNumber(currency.symbol, item.totalPrice * currency.multiplier)}
          </span>
        </h4>
        <h4 className="orders__item__quantity">Qty: {item.quantity}</h4>
        <Ratings ratingsAverage={item.product.ratingsAverage} ratingsQuantity={item.product.ratingsQuantity} />
      </div>
    </div>
  );
};

export default OrdersItem;