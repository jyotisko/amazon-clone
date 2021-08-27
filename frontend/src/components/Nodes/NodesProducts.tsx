import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductResponseType } from '../../types/APIResponseTypes';
import NodesProduct from './NodesProduct';
import Spinner from '../Utils/Spinner';

interface NodesProductsProps {
  node: string;
};

const NodesProducts: React.FC<NodesProductsProps> = ({ node }) => {
  const [products, setProducts] = useState<ProductResponseType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/products?category=${node}&limit=100`);
      setIsLoading(false);
      return data.data.products;
    } catch (err) {
      alert(err.response.data.message || 'Something went wrong...');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts().then((products: ProductResponseType[]) => setProducts(products));
  }, []);

  return (
    <section className="section nodes__products">
      {
        products && !isLoading && products.map((product) => <NodesProduct key={product._id} product={product} />)
      }
      {isLoading && <Spinner size={60} styles={{ margin: '60px -30px' }} />}
    </section>
  );
};

export default NodesProducts;