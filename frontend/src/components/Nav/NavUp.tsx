import { FiShoppingCart } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import UserCountry from './UserCountry'
import NavSearch from './NavSearch';

const NavUp = () => {
  return (
    <div className="nav__up">
      <img src={logo} alt="Amazon Logo" className="nav__logo" />
      <UserCountry />
      <NavSearch />
      <div className="nav__dropdown">
        <div className="nav__texts">
          <h5>Hello, Sign in</h5>
          <h4>Account & Lists</h4>
        </div>
      </div>
      <div className="nav__return-orders">
        <div className="nav__texts">
          <h5>Returns &</h5>
          <h4>Orders</h4>
        </div>
      </div>
      <div className="nav__cart">
        <i><FiShoppingCart /></i>
        <h4>Cart</h4>
      </div>
    </div>
  );
}

export default NavUp;