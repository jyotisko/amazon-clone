import { WishlistResponseType } from '../../types/APIResponseTypes';
import GridProduct from './GridProduct';

export interface GridProps {
  wishlists: WishlistResponseType[];
  onItemRemove: (productId: string) => void;
};

const Grid: React.FC<GridProps> = ({ wishlists, onItemRemove }) => {
  return (
    <div className="wishlist__grid">
      {
        wishlists.map((item) => {
          return <GridProduct
            key={item._id}
            wishlistId={item._id}
            product={item.product}
            onItemRemove={onItemRemove}
          />
        })
      }
    </div>
  );
};

export default Grid;