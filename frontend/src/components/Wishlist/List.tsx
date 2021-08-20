import React from 'react';
import { ProductResponseType } from '../../types/APIResponseTypes';
import ListProduct from './ListProduct';

interface ListProps {
  products: ProductResponseType[];
  onItemRemove: (id: string) => void;
};

const List: React.FC<ListProps> = ({ products, onItemRemove }) => {
  return (
    <div className="wishlist__list">
      {products.map((product) => <ListProduct product={product} key={product._id} onItemRemove={onItemRemove} />)}
    </div>
  );
};

export default List;