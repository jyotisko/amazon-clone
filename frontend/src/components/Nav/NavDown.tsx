import { Link } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';

const NavDown: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootStateOrAny) => state.auth);

  return (
    <div className="nav__down">
      <ul className="nav__links">
        <li className="nav__item"><a href="#" className="nav__link"><i className="icon icon--burger"><GiHamburgerMenu /></i>All</a></li>
        <li className="nav__item"><a href="#" className="nav__link">Today's Deals</a></li>
        <li className="nav__item"><Link to="/wishlist" className="nav__link">My List</Link></li>
        <li className="nav__item"><Link to="/history" className="nav__link">Browsing History</Link></li>
        <li className="nav__item">
          <Link to={isLoggedIn ? "/sell-on-amazon" : '/login'} className="nav__link">Sell</Link>
        </li>
        <li className="nav__item"><Link to="/orders" className="nav__link">Orders</Link></li>
      </ul>
      <a href="#" className="nav__covid">Amazon & Covid-19</a>
    </div>
  );
}

export default NavDown;