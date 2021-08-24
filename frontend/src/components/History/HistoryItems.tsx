import React from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { historyStateType, currencyStateType } from '../../types/stateTypes';
import { formatNumber } from '../../utils';
import { historyActions } from '../../store/historySlice';

export interface HistoryItemsProps {

};

const HistoryItems: React.FC<HistoryItemsProps> = () => {
  const dispatch = useDispatch();
  const history: historyStateType = useSelector((state: RootStateOrAny) => state.history);
  const currency: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);

  const removeItemFromHistory = (productId: string) => dispatch(historyActions.removeProductFromHistory({
    productId: productId
  }));

  return (
    <section className="section section--history-items">
      {history.products.map((product, index) => {
        return (
          <div className="history__item" key={product._id + index}>
            <img src={product.imageMain} alt={product.name.slice(0, 50)} loading='lazy' className="history__item__image" />
            <Link to={`/product/${product._id}`} className="history__item__name">{product.name.slice(0, 50).trim()}...</Link>
            <div className="history__item__ratings">
              {
                [1, 2, 3, 4, 5].map((rating, index) => {
                  if (product.ratingsAverage >= rating) return <i key={index} className="icon icon--star icon--star--fill"><AiFillStar /></i>;
                  else return <i key={index} className="icon icon--star icon--star--outline"><AiOutlineStar /></i>;
                })
              }
              <Link to="/reviews" className="history__item__ratings__quantity">({product.ratingsAverage})</Link>
            </div>
            <h3 className="history__item__price">{formatNumber(currency.symbol, currency.multiplier * product.priceOffer)}</h3>
            <button className="btn btn--remove-history history__item__button" onClick={() => removeItemFromHistory(product._id)}>
              Remove
            </button>
          </div>
        )
      })}
    </section>
  );
};

export default HistoryItems;