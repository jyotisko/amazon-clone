import { Link } from 'react-router-dom';

const DropdownMenu: React.FC = () => {
  return (
    <div className="nav__dropdown">
      <Link to="/login" className="nav__dropdown__button">Sign in</Link>
      <h5 className="nav__dropdown__already-customer">Already a customer? <Link to="/signup" className="nav__dropdown__link">Start here</Link></h5>
    </div>
  );
}

export default DropdownMenu;