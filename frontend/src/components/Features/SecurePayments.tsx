import { Link } from 'react-router-dom';
import cardPayment from '../../assets/cc-payment.png';
import locationPackageImage from '../../assets/location-package.png';
import forumImage from '../../assets/forum.png';
import returnsImage from '../../assets/returns.png';

const SecurePayments: React.FC = () => {
  return (
    <section className="section section--worldwide-shipping features-row features-row--reversed">
      <div className="features-row__left">
        <img src={cardPayment} loading='lazy' alt="Safe and secure payments" className="features-row__left__image" />
        <h3 className="features-row__left__red-text">SHOP WITH CONFIDENCE</h3>
        <h2 className="features-row__left__title">Safe and secure payments</h2>
        <p className="features-row__left__paragraph">We protect your personal payment information</p>
        <Link to='/'><button className="btn btn--outlined">Shop now</button></Link>
      </div>
      <div className="features-row__right">
        <div className="features-row__right__feature">
          <img src={locationPackageImage} loading='lazy' alt="Track your orders" className="features-row__right__image" />
          <div className="features-row__right__texts">
            <h2 className="features-row__right__title">Track your orders</h2>
            <p className="features-row__right__paragraph">Get updates on package delivery</p>
          </div>
        </div>
        <div className="features-row__right__feature">
          <img src={forumImage} loading='lazy' alt="24/7 customer service" className="features-row__right__image" />
          <div className="features-row__right__texts">
            <h2 className="features-row__right__title">24/7 customer service</h2>
            <p className="features-row__right__paragraph">You can email, chat, or call us any time</p>
          </div>
        </div>
        <div className="features-row__right__feature">
          <img src={returnsImage} loading='lazy' alt="Easy returns" className="features-row__right__image" />
          <div className="features-row__right__texts">
            <h2 className="features-row__right__title">Easy returns</h2>
            <p className="features-row__right__paragraph">Explore options to return your order</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurePayments;