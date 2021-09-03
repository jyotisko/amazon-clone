import React from 'react';
import { WishlistResponseType } from '../../types/APIResponseTypes';
import ListProduct from './ListProduct';

interface ListProps {
  wishlists: WishlistResponseType[];
  onItemRemove: (id: string) => void;
};

const List: React.FC<ListProps> = ({ wishlists, onItemRemove }) => {
  return (
    <div className="wishlist__list">
      {
        wishlists.map((item) => {
          return <ListProduct
            key={item._id}
            wishlistId={item._id}
            product={item.product}
            onItemRemove={onItemRemove}
            createdAt={item.createdAt}
          />
        })
      }
    </div>
  );
};

export default List;