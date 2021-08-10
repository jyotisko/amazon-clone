import React from 'react';
import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <FooterTop />
      <FooterBottom />
    </footer>
  );
}

export default Footer;