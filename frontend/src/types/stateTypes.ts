import { ProductResponseType, UserResponseType } from './APIResponseTypes';

export interface searchStateType {
  query: string;
  category: string;
  page: number;
  totalPages: null | number;
};

export interface currencyStateType {
  currency: string;
  symbol: string;
  multiplier: number;
  currencyName: string;
};

export interface authStateType {
  user: UserResponseType | null;
  isLoggedIn: boolean;
};

export interface cartStateType {
  items: {
    quantity: number;
    product: ProductResponseType;
  }[] | null,
  totalPrice: number;
  totalItems: number;
};

export interface historyStateType {
  products: ProductResponseType[];
  captureHistory: boolean;
};

export interface purchaseStateType {
  products: {
    name: string;
    description: string;
    imageMain: string;
    priceOffer: number;
    quantity: number;
    productId: string;
  }[] | null;
};