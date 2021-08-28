import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserResponseType, ProductResponseType } from '../../types/APIResponseTypes';
import Spinner from '../Utils/Spinner';
import { cartActions } from '../../store/cartSlice';
import { cartStateType } from '../../types/stateTypes';

export interface AddToCartButtonProps {
  product: ProductResponseType;
  user: null | UserResponseType;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, user }) => {
  const cart: cartStateType = useSelector((state: RootStateOrAny) => state.cart);
  const dispatch = useDispatch();
  const selectRef = useRef<HTMLSelectElement>(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const checkIfProductIsAlreadyInCart = async () => {
    if (!cart.items) return setIsAddedToCart(false);
    if ((cart.items.filter(item => item.product._id === product._id)).length > 0) setIsAddedToCart(true);
    setIsLoading(false);
  };

  const removeItemFromCart = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/carts/myCarts/${product._id}`);
      setIsAddedToCart(false);

      dispatch(cartActions.removeItemFromCart({ productId: product._id }));
    } catch (err) {
      throw new Error(err?.response?.data?.message);
    }
  };

  const addItemToCart = async () => {
    try {
      await axios.post('process.env.REACT_APP_API_URL/carts', {
        product: product._id,
        quantity: selectRef.current?.value || 1
      });

      setIsAddedToCart(true);

      dispatch(cartActions.addItemToCart({
        item: {
          quantity: selectRef.current?.value || 1,
          product: product
        }
      }));
    } catch (err) {
      throw new Error(err?.response?.data?.message);
    }
  };

  const toggleItemToCart = async () => {
    if (!user) return history.push('/login');
    setIsLoading(true);
    try {
      if (isAddedToCart) await removeItemFromCart();
      if (!isAddedToCart) await addItemToCart();
    } catch (err) {
      alert(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!user) return setIsLoading(false);
    checkIfProductIsAlreadyInCart();
  }, [cart.items]);

  return (
    <React.Fragment>
      <select defaultValue={1} ref={selectRef}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => <option key={index} value={value}>{value}</option>)}
      </select>
      <button className="btn btn--add-to-cart" disabled={isLoading} onClick={toggleItemToCart}>
        {isLoading && <Spinner size={20} styles={{ margin: '-10px' }} />}
        {!isLoading && isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </React.Fragment>
  );
};

export default AddToCartButton;