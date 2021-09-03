import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ProductResponseType } from '../types/APIResponseTypes';
import { historyActions } from '../store/historySlice';
import Nav from '../components/Nav/Nav';
import Spinner from '../components/Utils/Spinner';
import Overview from '../components/ProductDetail/Overview';
import Banners from '../components/ProductDetail/Banners';
import Description from '../components/ProductDetail/Description';
import Information from '../components/ProductDetail/Information';
import Footer from '../components/Footer/Footer';
import useAxios from '../hooks/useAxios';

const ProductDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductResponseType>();
  const { data, error } = useAxios(`${process.env.REACT_APP_API_URL}/products/${id}`, 'GET');

  useEffect(() => {
    if (data) {
      dispatch(historyActions.addProductToHistory({
        //@ts-ignore
        product: data.data.product
      }));
      //@ts-ignore
      return setProduct(data.data.product)
    }
    //@ts-ignore
    if (error) alert(error?.response?.data?.message || 'Something went wrong');
  }, [data, error]);

  return (
    <React.Fragment>
      <Nav showSearchHistory={true} />
      <main className="main main--product">
        {
          product ? (
            <>
              <Overview product={product} />
              <Banners banners={product.imageBanners} />
              <Description description={product.description} />
              <Information product={product} />
            </>
          ) : (
            <Spinner size={80} />
          )
        }
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default ProductDetail;