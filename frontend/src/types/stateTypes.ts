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