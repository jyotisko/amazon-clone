import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { RootStateOrAny, useSelector } from 'react-redux';
import { ProductResponseType } from '../../types/APIResponseTypes';

export interface NameAndSummaryProps {
  product: ProductResponseType
};

const NameAndSummary: React.FC<NameAndSummaryProps> = ({ product }) => {
  const currency = useSelector((state: RootStateOrAny) => state.currency);

  return (
    <section className="product-column-middle">
      {/* The name and ratings */}
      <div className="product-column-middle__row-1">
        <h1 className="product-column-middle__name">{product.name}</h1>
        <a href={`http://${product.sellerLink}`} className="product-column-middle__manufacturer-store">{product.sellerUser.name} Store</a>
        <div className="product-column-middle__ratings">
          {
            [1, 2, 3, 4, 5].map((rating, index) => {
              if (product.ratingsAverage >= rating) return <i key={index} className="icon icon--star icon--star--fill"><AiFillStar /></i>;
              else return <i key={index} className="icon icon--star icon--star--outline"><AiOutlineStar /></i>;
            })
          }
          <a href="#" className="product-column-middle__ratings-quantity">{product.ratingsQuantity} ratings</a>
        </div>
      </div>
      {/* The price and summary */}
      <div className="product-column-middle__row-2">
        <div className="product-column-middle__price">
          <span className="product-column-middle__price-offer">
            <h5 className="product-column-middle__price-offer__text">Price: </h5>
            <h2 className="product-column-middle__price-offer__value">{currency.symbol}{product.priceOffer * currency.multiplier}</h2>
          </span>
          <span className="product-column-middle__price-original">
            <h5 className="product-column-middle__price-original__value">{currency.symbol}{product.priceOriginal * currency.multiplier}</h5>
            <h5 className="product-column-middle__price-original__percentage">(You save {product.savingsPercentage}%)</h5>
          </span>
        </div>
        {
          product.productSummary && <div className="product-column-middle__summary">
            {
              Object.entries(product.productSummary).map(([key, value], index) => {
                return (
                  <div key={index} className="product-column-middle__summary__row">
                    <h3 className="product-column-middle__summary__key">{key}</h3>
                    <h3 className="product-column-middle__summary__value">{value}</h3>
                  </div>
                )
              })
            }
          </div>
        }
      </div>
      {
        product.productAbout && (
          <div className="product-column-middle__row-3">
            <ul className="product-column-middle__about-list">
              {product.productAbout.map((about, index) => <li key={index} className="product-column-middle__about-item">{about}</li>)}
            </ul>
          </div>
        )
      }
    </section>
  );
}

export default NameAndSummary;