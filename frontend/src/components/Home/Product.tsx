import { Link } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { ProductResponseType } from '../../types/APIResponseTypes';
import { currencyStateType } from '../../types/stateTypes';
import { formatNumber } from '../../utils';

export interface ProductProps {
  product: ProductResponseType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const currency: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);

  const maxLength = 50;
  return (
    <div className="product-row__product" key={product._id}>
      <Link to={`/product/${product._id}`}>
        <img className="product-row__product__image" loading='lazy' src={product.imageMain} alt={product.name.slice(0, maxLength)} />
      </Link>
      <Link to={`/product/${product._id}`}>
        <h3 className="product-row__product__name">{product.name.length > maxLength ? `${product.name.slice(0, maxLength)}...` : product.name}</h3>
      </Link>
      <div className="product-row__product__price">
        <h6 className="product-row__product__price__offer"><span className="currency-sign">{currency.symbol}</span>{formatNumber('', currency.multiplier * product.priceOffer)}</h6>
        <h6 className="product-row__product__price__original"><span className="currency-sign">{currency.symbol}</span>{formatNumber('', currency.multiplier * product.priceOriginal)}</h6>
      </div>
    </div>
  );
};

export default Product;