export interface ProductResponseType {
  name: string;
  imageMain: string;
  priceOriginal: number;
  priceOffer: number;
  _id: string;
  imageAlternates?: string[];
  imageBanners?: string[];
  description: string;
};

export interface BannerResponseType {
  image: string;
  link: string;
  _id: string;
};