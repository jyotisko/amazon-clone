import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Nav404: React.FC = () => {
  return (
    <Link to="/">
      <nav className="nav nav--404">
        <img className="nav--404__logo" src={logo} alt="Amazon Logo" />
      </nav>
    </Link>
  );
};

export default Nav404;