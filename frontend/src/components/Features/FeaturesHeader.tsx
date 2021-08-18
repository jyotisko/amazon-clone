import shippingHeaderImage from '../../assets/shipping-header.png';

const FeaturesHeader: React.FC = () => {
  return (
    <header className="header header--features">
      <h1 className="header--features__text">Amazon.com ships worldwide</h1>
      <img className="header--features__image" src={shippingHeaderImage} alt='Shipping Header Image' />
    </header>
  );
};

export default FeaturesHeader;