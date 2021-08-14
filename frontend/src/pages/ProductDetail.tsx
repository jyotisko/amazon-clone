import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ProductResponseType } from '../types/APIResponseTypes';
import Images from '../components/ProductDetail/Images';
import NameAndSummary from '../components/ProductDetail/NameAndSummary';
import CartWishlistBuy from '../components/ProductDetail/CartWishlistBuy';
import Spinner from '../components/Utils/Spinner';
import Nav from '../components/Nav/Nav';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductResponseType>();

  const getProduct = async (id: string) => {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    return data.data.product as ProductResponseType;
  };

  useEffect(() => {
    getProduct(id).then(product => setProduct(product));
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <main className="main main--product">
        {
          product ? (

            <section className='section section--product-overview'>
              <Images product={product} />
              <NameAndSummary product={product} />
              <CartWishlistBuy product={product} />
            </section>

          ) : (
            <Spinner size={80} />
          )
        }
      </main>
    </React.Fragment>
  );
};

export default ProductDetail;