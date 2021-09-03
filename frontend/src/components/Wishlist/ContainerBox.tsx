import React, { useEffect, useState } from 'react';
import { WishlistResponseType } from '../../types/APIResponseTypes';
import Spinner from '../Utils/Spinner';
import List from './List';
import WishlistNav from './WishlistNav';
import WishlistOptions from './WishlistOptions';
import Grid from './Grid';
import useAxios from '../../hooks/useAxios';

const ContainerBox: React.FC = () => {
  const [wishlists, setWishlists] = useState<WishlistResponseType[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('list');
  const { data, isLoading, error } = useAxios(`${process.env.REACT_APP_API_URL}/wishlists/myWishlists`, 'GET');

  useEffect(() => {
    // @ts-ignore
    if (data) setWishlists(data.data.wishlists);
    //@ts-ignore
    if (error) alert(error?.response?.data?.message || 'Something went wrong');
  }, [data, error]);

  const itemRemoveHandler = (id: string): void => {
    setWishlists((prevState) => prevState.filter((item) => item._id !== id));
  };

  return (
    <React.Fragment>
      <section className="section section--wishlist-box wishlist">
        <WishlistNav />
        {!isLoading && (
          <>
            {wishlists.length > 0 && <WishlistOptions changeView={setView} activeView={view} />}
            {wishlists.length === 0 && <h1 className="wishlist__empty-text">No items in your list yet!</h1>}
            {view === 'list' && <List wishlists={wishlists} onItemRemove={itemRemoveHandler} />}
            {view === 'grid' && <Grid wishlists={wishlists} onItemRemove={itemRemoveHandler} />}
          </>
        )}
        {isLoading && <Spinner styles={{ margin: '0' }} />}
      </section>
    </React.Fragment>
  );
};

export default ContainerBox;