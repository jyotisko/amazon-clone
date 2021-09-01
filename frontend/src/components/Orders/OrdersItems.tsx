import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PurchasesResponseType } from '../../types/APIResponseTypes';
import Spinner from '../../components/Utils/Spinner';
import OrdersItem from './OrdersItem';

const OrdersItems: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchasesResponseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPurchases = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/purchases/myPurchases`, {
        withCredentials: true
      });
      return data.data.purchases;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPurchases()
      .then((purchases) => setPurchases(purchases))
      .catch((err) => alert(err?.response?.data?.message || 'Something went wrong.'));
  }, []);

  return (
    <div className="orders__list">
      {isLoading && <Spinner />}
      {!isLoading && purchases.length === 0 && <h1 className="orders__empty">You haven't placed any orders yet.</h1>}
      {!isLoading && purchases.length > 0 && purchases.map((item: PurchasesResponseType, index: number) => {
        return <OrdersItem key={item.product._id + String(index)} item={item} />
      })}
    </div>
  );
};

export default OrdersItems;