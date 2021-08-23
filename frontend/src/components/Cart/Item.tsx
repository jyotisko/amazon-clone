import React, { useState } from 'react';
import axios from 'axios';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../../store/cartSlice';
import { ProductResponseType } from '../../types/APIResponseTypes';
import { currencyStateType } from '../../types/stateTypes';
import { formatNumber } from '../../utils';
import Spinner from '../Utils/Spinner';

export interface ItemProps {
  item: {
    product: ProductResponseType;
    quantity: number;
  };
};

const Item: React.FC<ItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const currency: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isLoadingQuantity, setIsLoadingQuantity] = useState<boolean>(false);

  const deleteHandler = async () => {
    setIsLoadingDelete(true);
    await axios.delete(`/api/v1/carts/myCarts/${item.product._id}`).catch(err => {
      throw new Error(err);
    });
    dispatch(cartActions.removeItemFromCart({ productId: item.product._id }));
    setIsLoadingDelete(false);
  };

  const quantityChangeHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      if (e.target.value === 'delete') return await deleteHandler();

      setIsLoadingQuantity(true)
      await axios.patch(`/api/v1/carts/myCarts/${item.product._id}`, { quantity: +e.target.value });
      dispatch(cartActions.changeItemQuantity({
        productId: item.product._id,
        quantity: +e.target.value
      }));
    } catch (err) {
      alert(err.response.data.message)
    }
    setIsLoadingQuantity(false);
  };

  return (
    <div key={item.product._id} className="cart__item">
      <div className="cart__item__image-container">
        <img src={item.product.imageMain} alt={item.product.name.slice(50)} className="cart__item__image" loading='lazy' />
      </div>
      <div className="cart__item__texts">
        <Link to={`/product/${item.product._id}`} className="cart__item__name">{item.product.name}</Link>
        <h5 className={`cart__item__stock ${!item.product.isInStock && 'cart__item__stock--red'}`}>
          {item.product.isInStock ? 'In Stock' : 'Not in stock'}
        </h5>
        <select name="quantity" className="cart__item__select" disabled={isLoadingDelete || isLoadingQuantity} defaultValue={item.quantity} onChange={quantityChangeHandler}>
          <option value="delete" className="cart__item__option">0 (Delete)</option>
          <option value="1" className="cart__item__option">Qty: 1</option>
          <option value="2" className="cart__item__option">Qty: 2</option>
          <option value="3" className="cart__item__option">Qty: 3</option>
          <option value="4" className="cart__item__option">Qty: 4</option>
          <option value="5" className="cart__item__option">Qty: 5</option>
          <option value="6" className="cart__item__option">Qty: 6</option>
          <option value="7" className="cart__item__option">Qty: 7</option>
          <option value="8" className="cart__item__option">Qty: 8</option>
          <option value="9" className="cart__item__option">Qty: 9</option>
          <option value="10" className="cart__item__option">Qty: 10</option>
        </select>
        <button className="btn btn--delete" disabled={isLoadingDelete || isLoadingQuantity} onClick={deleteHandler}>
          {isLoadingDelete || 'Delete'}
          {isLoadingDelete && <Spinner size={20} styles={{ margin: '-15px 15px' }} />}
        </button>
      </div>
      <h3 className="cart__item__price">{formatNumber(currency.symbol, currency.multiplier * item.product.priceOffer)}</h3>
    </div>
  );
};

export default Item;