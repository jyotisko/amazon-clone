import { ProductResponseType } from '../../types/APIResponseTypes';

export interface InformationProps {
  product: ProductResponseType;
};

const Information: React.FC<InformationProps> = ({ product }) => {
  return (
    <section className="section section--info product-info">
      <div className="product-info__technical">
        <h2 className="product-info__title">Technical Details</h2>
        {
          Object.entries(product.technicalDetails).map(([key, value], index) => {
            return (
              <div key={index} className="product-info__row">
                <div className="product-info__key">{key}</div>
                <div className="product-info__value">{value}</div>
              </div>
            )
          })
        }
      </div>
      <div className="product-info__additional-and-warranty">
        <div className="product-info__additional">
          <h2 className="product-info__title">Additional Information</h2>
          {
            Object.entries({ ...product.additionalInfo, ASIN: product.ASIN }).map(([key, value], index) => {
              return (
                <div key={index} className="product-info__row">
                  <div className="product-info__key">{key}</div>
                  <div className="product-info__value">{value}</div>
                </div>
              );
            })
          }
        </div>
        {
          product.warrantyDetails && (
            <div className="product-info__warranty">
              <h2 className="product-info__title">Warranty and Support</h2>
              <p className="product-info__warranty-text">{product.warrantyDetails}</p>
            </div>
          )
        }
      </div>
    </section>
  );
};

export default Information;