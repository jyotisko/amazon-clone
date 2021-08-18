import { Link } from 'react-router-dom';
import shippingGlobeImage from '../../assets/shipping-globe.png';
import globeImage from '../../assets/globe.png';
import currencyImage from '../../assets/currency.png';
import vanImage from '../../assets/van.png';
import packageImage from '../../assets/package.png';

const WorldwideShipping: React.FC = () => {
  return (
    <section className="section section--worldwide-shipping features-row">
      <div className="features-row__left">
        <img src={shippingGlobeImage} loading='lazy' alt="Shipping Around The Globe" className="features-row__left__image" />
        <h3 className="features-row__left__red-text">AMAZON DELIVERS TO YOU</h3>
        <h2 className="features-row__left__title">Worldwide shipping</h2>
        <p className="features-row__left__paragraph">We ship to over 100 countries and regions, right to your doorstep</p>
        <Link to='/'><button className="btn btn--outlined">Shop now</button></Link>
      </div>
      <div className="features-row__right">
        <div className="features-row__right__feature">
          <img src={globeImage} loading='lazy' alt="Shop in 8 different languages" className="features-row__right__image" />
          <div className="features-row__right__texts">
            <h2 className="features-row__right__title">Shop in 8 lnaguages</h2>
            <p className="features-row__right__paragraph">Browse or search in your language</p>
          </div>
        </div>
        <div className="features-row__right__feature">
          <img src={currencyImage} loading='lazy' alt="Shop in 75 currencies" className="features-row__right__image" />
          <div className="features-row__right__texts">
            <h2 className="features-row__right__title">Shop in 75 currencies</h2>
            <p className="features-row__right__paragraph">Freedom to choose your preferred currency</p>
          </div>
        </div>
        <div className="features-row__right__feature">
          <img src={vanImage} loading='lazy' alt="Products that ship to you" className="features-row__right__image" />
          <div className="features-row__right__texts">
            <h2 className="features-row__right__title">Products that ship to you</h2>
            <p className="features-row__right__paragraph">Find top products that ship to you</p>
          </div>
        </div>
        <div className="features-row__right__feature">
          <img src={packageImage} loading='lazy' alt="Transparent costs" className="features-row__right__image" />
          <div className="features-row__right__texts">
            <h2 className="features-row__right__title">Transparent costs</h2>
            <p className="features-row__right__paragraph">We estimate shipping and custom fees on your behalf</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldwideShipping;