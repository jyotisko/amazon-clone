import { ProductResponseType } from '../../types/APIResponseTypes';
import Images from './Images';
import NameAndSummary from './NameAndSummary';
import CartWishlistBuy from './CartWishlistBuy';

interface OverviewProps {
  product: ProductResponseType
};

const Overview: React.FC<OverviewProps> = ({ product }) => {
  return (
    <section className='section section--product-overview'>
      <Images product={product} />
      <NameAndSummary product={product} />
      <CartWishlistBuy product={product} />
    </section>
  );
};

export default Overview;