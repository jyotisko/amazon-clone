import React from 'react';
import Logo from '../../assets/logo.svg';

const FooterBottom: React.FC = () => {
  return (
    <div className="footer__bottom">
      <img className="footer__logo" src={Logo} alt="Amazon Logo" />
      <h3 className="footer__currency">$ USD - U.S. Dollar</h3>
    </div>
  );
}

export default FooterBottom;