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

const ProductDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductResponseType>();

  const getProduct = async (id: string) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
    return data.data.product as ProductResponseType;
  };

  useEffect(() => {
    getProduct(id).then((product) => {
      dispatch(historyActions.addProductToHistory({
        product: product
      }))
      return setProduct(product)
    });
  }, []);

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