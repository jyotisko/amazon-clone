import React, { useState } from 'react';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';
import { ProductResponseType } from '../../types/APIResponseTypes';
import Spinner from '../Utils/Spinner';

export interface GridProductProps {
  product: ProductResponseType;
  onItemRemove: (productId: string) => void;
};

const GridProduct: React.FC<GridProductProps> = ({ product, onItemRemove }) => {
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const removeItem = async (): Promise<void> => {
    setIsLoading(true);
    await axios.delete(`${process.env.REACT_APP_API_URL}/wishlists/myWishlists/${product._id}`);
    onItemRemove(product._id);
    setIsLoading(false);
  };

  return (
    <div className="wishlist__grid__item">
      <i className="icon icon--dots" onClick={() => setShowControls((prevState) => !prevState)}><BsThreeDots /></i>
      <div className={`wishlist__grid__controls ${showControls && 'open'}`}>
        {isLoading || <h2 className="wishlist__grid__delete" onClick={removeItem}>Delete</h2>}
        {isLoading && <Spinner size={20} styles={{ margin: '-10px' }} />}
      </div>
      <img src={product.imageMain} alt={product.name.slice(50)} loading='lazy' className="wishlist__grid__image" />
    </div>
  );
};

export default GridProduct;