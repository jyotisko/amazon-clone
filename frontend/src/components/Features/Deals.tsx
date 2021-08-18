import { Link } from 'react-router-dom';
import discountImage from '../../assets/discount.png';
import browseImage from '../../assets/browse.png';
import phoneImage from '../../assets/phone.png';
import ratingsImage from '../../assets/ratings.png';

const Deals: React.FC = () => {
  return (
    <section className="section section--worldwide-shipping features-row">
      <div className="features-row__left">
        <img src={discountImage} loading='lazy' alt="Great deals and super value" className="features-row__left__image" />
        <h3 className="features-row__left__red-text">EXPERIENCE THE AMAZON ADVANTAGE</h3>
        <h2 className="features-row__left__title">Great deals and super value</h2>
        <p className="features-row__left__paragraph">Low prices and amazing deals every day</p>
        <Link to='/'><button className="btn btn--outlined">Explore the products</button></Link>
      </div>
      <div className="features-row__right">
        <div className="features-row__right__feature">
          <img src={browseImage} loading='lazy' alt="Browse an epic selection" className="features-row__right__image" />
          <div className="features-row__right__texts">
            <h2 className="features-row__right__title">Browse an epic selection</h2>
            <p className="features-row__right__paragraph">Discover millions of products that ship globally</p>
          </div>
        </div>
        <div className="features-row__right__feature">
          <img src={phoneImage} loading='lazy' alt="Shop on the go" className="features-row__right__image" />
          <div className="features-row__right__texts">
            <h2 className="features-row__right__title">Shop on the go</h2>
            <p className="features-row__right__paragraph">Download the Amazon app for convenient shopping</p>
          </div>
        </div>
        <div className="features-row__right__feature">
          <img src={ratingsImage} loading='lazy' alt="Trusted reviews and ratings" className="features-row__right__image" />
          <div className="features-row__right__texts">
            <h2 className="features-row__right__title">Trusted reviews and ratings</h2>
            <p className="features-row__right__paragraph">Check product feedback from actual shoppers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deals;