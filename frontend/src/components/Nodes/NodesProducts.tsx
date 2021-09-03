import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductResponseType } from '../../types/APIResponseTypes';
import NodesProduct from './NodesProduct';
import Spinner from '../Utils/Spinner';
import useAxios from '../../hooks/useAxios';

interface NodesProductsProps {
  node: string;
};

const NodesProducts: React.FC<NodesProductsProps> = ({ node }) => {
  const [products, setProducts] = useState<ProductResponseType[] | null>(null);
  const { data, isLoading, error } = useAxios(`${process.env.REACT_APP_API_URL}/products?category=${node}&limit=100`, 'GET');

  useEffect(() => {
    //@ts-ignore
    if (data) setProducts(data.data.products);
    //@ts-ignore
    if (error) alert(err?.response?.data?.message || 'Something went wrong...');
  }, [data, error]);

  return (
    <section className="section nodes__products">
      {products && !isLoading && products.map((product) => <NodesProduct key={product._id} product={product} />)}
      {isLoading && <Spinner size={60} styles={{ margin: '60px -30px' }} />}
    </section>
  );
};

export default NodesProducts;