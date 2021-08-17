import React from 'react';
import { ProductResponseType } from '../../types/APIResponseTypes';
import Pagination from './Pagination';
import SearchProduct from './SearchProduct';

interface ProductSearchRowsProps {
  products: ProductResponseType[];
};

const ProductSearchRows: React.FC<ProductSearchRowsProps> = ({ products }) => {
  return (
    <React.Fragment>
      <section className="section section--search">
        {
          products.map((product: ProductResponseType) => <SearchProduct key={product._id} product={product} />)
        }
      </section>
      <Pagination />
    </React.Fragment>
  );
};

export default ProductSearchRows;