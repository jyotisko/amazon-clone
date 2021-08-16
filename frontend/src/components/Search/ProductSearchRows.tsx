import { ProductResponseType } from '../../types/APIResponseTypes';
import SearchProduct from './SearchProduct';

interface ProductSearchRowsProps {
  products: ProductResponseType[];
};

const ProductSearchRows: React.FC<ProductSearchRowsProps> = ({ products }) => {
  return (
    <section className="section section--search">
      {
        products.map((product: ProductResponseType) => <SearchProduct product={product} />)
      }
    </section>
  );
};

export default ProductSearchRows;