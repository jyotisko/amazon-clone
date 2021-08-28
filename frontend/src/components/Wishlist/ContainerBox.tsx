import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductResponseType, WishlistResponseType } from '../../types/APIResponseTypes';
import Spinner from '../Utils/Spinner';
import List from './List';
import WishlistNav from './WishlistNav';
import WishlistOptions from './WishlistOptions';
import Grid from './Grid';

const ContainerBox: React.FC = () => {
  const [wishlists, setWishlists] = useState<ProductResponseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [view, setView] = useState<'grid' | 'list'>('list');

  const getProducts = async (): Promise<ProductResponseType[]> => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/wishlists/myWishlists`);
    const products = data.data.wishlists.map((wishlist: WishlistResponseType) => wishlist.product);
    return products;
  };

  useEffect(() => {
    getProducts().then((products: ProductResponseType[]) => {
      setIsLoading(false);
      setWishlists(products);
    });
  }, []);

  const itemRemoveHandler = (id: string): void => {
    setWishlists((prevState) => prevState.filter((wishlist) => wishlist._id !== id));
  };

  return (
    <React.Fragment>
      <section className="section section--wishlist-box wishlist">
        <WishlistNav />
        {!isLoading && (
          <>
            {wishlists.length > 0 && <WishlistOptions changeView={setView} activeView={view} />}
            {wishlists.length === 0 && <h1 className="wishlist__empty-text">No items in your list yet!</h1>}
            {view === 'list' && <List products={wishlists} onItemRemove={itemRemoveHandler} />}
            {view === 'grid' && <Grid products={wishlists} onItemRemove={itemRemoveHandler} />}
          </>
        )}
        {isLoading && <Spinner styles={{ margin: '0' }} />}
      </section>
    </React.Fragment>
  );
};

export default ContainerBox;