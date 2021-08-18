import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { UserResponseType } from '../../types/APIResponseTypes';
import Spinner from '../Utils/Spinner';

export interface AddToCartButtonProps {
  productId: string;
  user: null | UserResponseType;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId, user }) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const checkIfProductIsAlreadyInCart = async () => {
    const { data } = await axios.get(`/api/v1/carts/myCarts?product=${productId}`);
    if (data.data.cartItems.length > 0) setIsAddedToCart(true);
    setIsLoading(false);
  };

  const removeItemFromCart = async () => {
    try {
      await axios.delete(`/api/v1/carts/${productId}`);
      setIsAddedToCart(false);
    } catch (err) {
      throw new Error(err?.response?.data?.message);
    }
  };

  const addItemToCart = async () => {
    try {
      await axios.post('/api/v1/carts', {
        product: productId,
        quantity: selectRef.current?.value || 1
      });
      setIsAddedToCart(true);
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
  }, []);

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