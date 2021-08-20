import { RootStateOrAny, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { currencyStateType } from '../../types/stateTypes';
import { ProductResponseType } from '../../types/APIResponseTypes';
import { getDate } from '../../utils';

export interface SearchProductProps {
  product: ProductResponseType;
};

const SearchProduct: React.FC<SearchProductProps> = ({ product }) => {
  const { symbol, multiplier }: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);

  return (
    <div className="product-search">
      <div className="product-search__left">
        <NavLink className="product-search__image-link" to={`/product/${product._id}`}>
          <img src={product.imageMain} alt={product.name.slice(30)} className="product-search__image" />
        </NavLink>
      </div>
      <div className="product-search__right">
        <Link to={`/product/${product._id}`}><h2 className="product-search__name">{product.name}</h2></Link>
        <Link to={`/product/${product._id}`}><h2 className="product-search__price"><span className="product-search__currency-symbol">{symbol}</span>{multiplier * product.priceOffer}</h2></Link>
        <h3 className="product-search__delivery">Get it as soon as <span className="product-search__delivery__date">{getDate(5)}</span></h3>
      </div>
    </div>
  );
};

export default SearchProduct;