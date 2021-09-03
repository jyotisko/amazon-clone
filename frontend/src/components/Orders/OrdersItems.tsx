import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PurchasesResponseType } from '../../types/APIResponseTypes';
import Spinner from '../../components/Utils/Spinner';
import OrdersItem from './OrdersItem';
import useAxios from '../../hooks/useAxios';

const OrdersItems: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchasesResponseType[]>([]);
  const { data, isLoading, error } = useAxios(`${process.env.REACT_APP_API_URL}/purchases/myPurchases`, 'GET');

  useEffect(() => {
    //@ts-ignore
    if (data) setPurchases(data.data.purchases);
    //@ts-ignore
    if (error) alert(error?.response?.data?.messsage || 'Something went wrong!');
  }, [data, error]);

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