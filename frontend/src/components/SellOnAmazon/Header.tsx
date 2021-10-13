import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import PrimeBoxImage from '../../assets/prime-box.png';

interface SellOnAmazonHeaderProps {
  setShowPopup: Function;
};

const SellOnAmazonHeader: React.FC<SellOnAmazonHeaderProps> = ({ setShowPopup }) => {
  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  return (
    <section className="section sell-on-amazon__header">
      <div className="sell-on-amazon__header__texts">
        <h1 className="sell-on-amazon__header__texts__main">Become an <br /> Amazon seller</h1>
        <h2 className="sell-on-amazon__header__texts__paragraph">
          More than half the units sold in our stores are from <br /> independent sellers.
        </h2>
        <button className="btn btn--dark-orange" disabled={user?.isGettingVerifiedAsSeller} onClick={() => setShowPopup(true)}>
          {!user?.isGettingVerifiedAsSeller ? 'Sign up' : 'Hold on! You are being verified.'}
        </button>
      </div>
      <img className="sell-on-amazon__header__image" src={PrimeBoxImage} alt="Prime Delivery Box" />
    </section>
  );
};

export default SellOnAmazonHeader;