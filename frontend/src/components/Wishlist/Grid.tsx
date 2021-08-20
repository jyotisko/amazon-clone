import { ProductResponseType } from '../../types/APIResponseTypes';
import GridProduct from './GridProduct';

export interface GridProps {
  products: ProductResponseType[];
  onItemRemove: (productId: string) => void;
};

const Grid: React.FC<GridProps> = ({ products, onItemRemove }) => {
  return (
    <div className="wishlist__grid">
      {products.map((product) => <GridProduct key={product._id} product={product} onItemRemove={onItemRemove} />)}
    </div>
  );
};

export default Grid;