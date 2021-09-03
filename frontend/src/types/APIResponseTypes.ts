export interface ProductResponseType {
  name: string;
  imageMain: string;
  priceOriginal: number;
  priceOffer: number;
  _id: string;
  imageAlternates?: string[];
  imageBanners?: string[];
  description: string;
  productBrand: string;
  productAbout?: string[];
  isInStock: boolean;
  sellerUser: UserResponseType;
  sellerLink?: string;
  technicalDetails: object;
  additionalInfo: object;
  productSummary?: object;
  ratingsAverage: number;
  ratingsQuantity: number;
  ASIN: string;
  keywords?: string;
  categories: string[];
  isChokingHazard?: boolean;
  isChokingHazardText?: string;
  warrantyDetails?: string;
  createdAt: Date;
  savingsPrice: number;
  savingsPercentage: number;
};

export interface BannerResponseType {
  image: string;
  link: string;
  _id: string;
};

export interface UserResponseType {
  _id: string;
  name: string;
  phone: number;
  email: string;
  streetAddress: string;
  zipcode: number;
  city: string;
  country: string;
  state: string;
};

export interface WishlistResponseType {
  _id: string;
  user: string;
  product: ProductResponseType;
  createdAt: Date;
};

export interface CartResponseType {
  _id: string;
  quantity: number;
  product: ProductResponseType;
  user: UserResponseType;
  createdAt: Date;
};

export interface PurchasesResponseType {
  product: ProductResponseType;
  user: string;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
};