import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { cartStateType } from '../../types/stateTypes';
import Spinner from '../Utils/Spinner';
import Heading from './Heading';
import Item from './Item';

const Items: React.FC = () => {
  const cart: cartStateType = useSelector((state: RootStateOrAny) => state.cart);

  return (
    <section className="cart__items">
      <Heading />
      {!cart.items && <Spinner size={60} styles={{ margin: '-4rem' }} />}
      {cart.items && cart.items.length === 0 && <h1 className="cart__empty">Your cart is empty</h1>}
      {cart.items && cart.items.map((item, index) => <Item key={item.product._id + index} item={item} />)}
    </section>
  );
};

export default Items;