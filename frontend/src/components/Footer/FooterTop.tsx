import React from 'react';

const FooterTop: React.FC = () => {
  const scrollToTop = (): void => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="footer__top">
      <div className="footer-link-to-top" onClick={scrollToTop}>Back to top</div>
      <div className="footer__groups">
        <div className="footer__group">
          <h2 className="footer__group__heading">Get to know us</h2>
          <a href="#" className="footer__link">Careers</a><br />
          <a href="#" className="footer__link">Blogs</a><br />
          <a href="#" className="footer__link">About amazon</a><br />
          <a href="#" className="footer__link">Invester relationship</a><br />
          <a href="#" className="footer__link">Amazon devices</a>
        </div>
        <div className="footer__group">
          <h2 className="footer__group__heading">Make money with us</h2>
          <a href="#" className="footer__link">Sell products on amazon</a><br />
          <a href="#" className="footer__link">Sell on amazon business</a><br />
          <a href="#" className="footer__link">Sell apps on amazon</a><br />
          <a href="#" className="footer__link">Become an affiliate</a><br />
          <a href="#" className="footer__link">Advertise your products</a><br />
          <a href="#" className="footer__link">Host an amazon hub</a><br />
          <a href="#" className="footer__link">Self publish with us</a>
        </div>
        <div className="footer__group">
          <h2 className="footer__group__heading">Amazon payment products</h2>
          <a href="#" className="footer__link">Amazon business card</a><br />
          <a href="#" className="footer__link">Shop with points</a><br />
          <a href="#" className="footer__link">Reload your balance</a><br />
          <a href="#" className="footer__link">Amazon currency converter</a>
        </div>
        <div className="footer__group">
          <h2 className="footer__group__heading">Let us help you</h2>
          <a href="#" className="footer__link">Amazon and covid-19</a><br />
          <a href="#" className="footer__link">Your account</a><br />
          <a href="#" className="footer__link">Your orders</a><br />
          <a href="#" className="footer__link">Shipping rates and policies</a><br />
          <a href="#" className="footer__link">Return and replacements</a><br />
          <a href="#" className="footer__link">Manage your content and devices</a><br />
          <a href="#" className="footer__link">Amazon assistant</a><br />
          <a href="#" className="footer__link">Help</a>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;