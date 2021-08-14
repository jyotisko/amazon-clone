import { Link } from 'react-router-dom';
import { ProductResponseType } from '../../types/APIResponseTypes';

export interface ProductProps {
  product: ProductResponseType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const maxLength = 50;
  return (
    <div className="product-row__product" key={product._id}>
      <Link to={`/product/${product._id}`}>
        <img className="product-row__product__image" loading='lazy' src={product.imageMain} alt={product.name.slice(0, maxLength)} />
      </Link>
      <Link to={`/product/${product._id}`}>
        <a className="product-row__product__name">{product.name.length > maxLength ? `${product.name.slice(0, maxLength)}...` : product.name}</a>
      </Link>
      <div className="product-row__product__price">
        <h6 className="product-row__product__price__offer"><span className="currency-sign">$</span>{product.priceOffer}</h6>
        <h6 className="product-row__product__price__original"><span className="currency-sign">$</span>{product.priceOriginal}</h6>
      </div>
    </div>
  );
};

export default Product;