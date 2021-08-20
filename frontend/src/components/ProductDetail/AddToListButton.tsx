import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Spinner from '../Utils/Spinner';
import { UserResponseType } from '../../types/APIResponseTypes';

export interface AddToListButtonProps {
  productId: string;
  user: null | UserResponseType;
};

const AddToListButton: React.FC<AddToListButtonProps> = ({ productId, user }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddedToList, setIsAddedToList] = useState<boolean>(false);

  const checkIfProductIsAlreadyInTheList = async (): Promise<void> => {
    const { data } = await axios.get(`/api/v1/wishlists/myWishLists?product=${productId}`);
    if (data.data.wishlists.length > 0) setIsAddedToList(true);
    setIsLoading(false);
  };

  const removeItemFromList = async () => {
    try {
      await axios.delete(`/api/v1/wishlists/myWishlists/${productId}`);
      setIsAddedToList(false);
    } catch (err) {
      throw new Error(err.response?.data?.message);
    }
  };

  const addItemToList = async () => {
    try {
      await axios.post(`/api/v1/wishlists`, { product: productId });
      setIsAddedToList(true);
    } catch (err) {
      throw new Error(err.response?.data?.message);
    }
  };

  const toggleItemToList = async () => {
    if (!user) return history.push('/login');
    setIsLoading(true);
    try {
      if (isAddedToList) await removeItemFromList();
      if (!isAddedToList) await addItemToList();
    } catch (err) {
      alert(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!user) return setIsLoading(false);
    checkIfProductIsAlreadyInTheList();
  }, []);

  return (
    <button className="btn btn--wishlist" onClick={toggleItemToList} disabled={isLoading}>
      {isLoading && <Spinner size={20} styles={{ margin: '-10px' }} />}
      {!isLoading && isAddedToList ? 'Remove from list' : 'Add to list'}
    </button>
  );
};

export default AddToListButton;