import { Link } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { currencyStateType } from '../../types/stateTypes';
import React from 'react';
import Logo from '../../assets/logo.svg';

const FooterBottom: React.FC = () => {
  const currency: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);

  return (
    <div className="footer__bottom">
      <img className="footer__logo" src={Logo} alt="Amazon Logo" />
      <Link to="/currency" className="footer__currency">{currency.symbol} {currency.currency} - {currency.currencyName}</Link>
    </div>
  );
}

export default FooterBottom;