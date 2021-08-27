import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProductResponseType } from '../../types/APIResponseTypes';
import { currencyStateType } from '../../types/stateTypes';
import { formatNumber } from '../../utils';

export interface NodesProductProps {
  product: ProductResponseType;
};

const NodesProduct: React.FC<NodesProductProps> = ({ product }) => {
  const currency: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);

  return (
    <div className="nodes__product">
      <Link to={`/product/${product._id}`}>
        <img src={product.imageMain} alt={product.name.slice(0, 50)} className="nodes__product__image" />
      </Link>
      <Link to={`/product/${product._id}`} className="nodes__product__name">{product.name}</Link>
      <div className="nodes__product__ratings">
        {
          [1, 2, 3, 4, 5].map((rating, index) => {
            if (product.ratingsAverage >= rating) return <i key={index} className="icon icon--star icon--star--fill"><AiFillStar /></i>;
            else return <i key={index} className="icon icon--star icon--star--outline"><AiOutlineStar /></i>;
          })
        }
        <a href="#" className="nodes__product__ratings-quantity">{product.ratingsQuantity} ratings</a>
      </div>
      <div className="nodes__product__price">
        <h4 className="nodes__product__price--offer">
          {formatNumber(currency.symbol, currency.multiplier * product.priceOffer)}
        </h4>
        <h5 className="nodes__product__price--original">
          {formatNumber(currency.symbol, currency.multiplier * product.priceOriginal)}
        </h5>
      </div>
    </div>
  );
};

export default NodesProduct;