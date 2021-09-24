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

export interface ReviewResponseType {
  _id: string;
  user: {
    _id: string;
    photo: string;
    name: string;
  };
  product: string;
  rating: number;
  reviewTitle: string;
  reviewDescription: string;
};

export interface ReviewStatsType {
  ratingsWith5Star: number;
  ratingsWith4Star: number;
  ratingsWith3Star: number;
  ratingsWith2Star: number;
  ratingsWith1Star: number;
  totalRatings: number;
};

export interface SingleProductReview {
  reviews: ReviewResponseType[];
  stats: ReviewStatsType;
  hasReviewed: boolean;
  hasPurchased: boolean;
};