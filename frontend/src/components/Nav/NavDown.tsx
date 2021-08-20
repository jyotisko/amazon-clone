import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const NavDown: React.FC = () => {
  return (
    <div className="nav__down">
      <ul className="nav__links">
        <li className="nav__item"><a href="#" className="nav__link"><i className="icon icon--burger"><GiHamburgerMenu /></i>All</a></li>
        <li className="nav__item"><a href="#" className="nav__link">Today's Deals</a></li>
        <li className="nav__item"><Link to="/wishlist" className="nav__link">My List</Link></li>
        <li className="nav__item"><a href="#" className="nav__link">Browsing History</a></li>
        <li className="nav__item"><a href="#" className="nav__link">Sell</a></li>
      </ul>
      <a href="#" className="nav__covid">Amazon & Covid-19</a>
    </div>
  );
}

export default NavDown;