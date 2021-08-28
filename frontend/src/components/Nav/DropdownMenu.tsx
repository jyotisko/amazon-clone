import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserResponseType } from '../../types/APIResponseTypes';

interface DropdownMenuProps {
  authState: {
    user: null | UserResponseType,
    isLoggedIn: boolean
  };
};

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users/logout`);
      if (data.status === 'success') window.location.reload();
    } catch (err) {
      console.log(err?.reponse?.data?.message);
    }
  };

  return (
    <div className="nav__dropdown">
      {props.authState.isLoggedIn ? <button className="nav__dropdown__button" onClick={handleLogout}>Logout</button> : <Link to="/login" className="nav__dropdown__button">Sign in</Link>}
      {
        props.authState.isLoggedIn ? (
          <h5 className="nav__dropdown__already-customer">Welcome back, {props.authState.user?.name?.split(' ')[0]}</h5>
        ) : (
          <h5 className="nav__dropdown__already-customer">
            Already a customer?<Link to="/signup" className="nav__dropdown__link">Start here</Link>
          </h5>
        )
      }
    </div>
  );
}

export default DropdownMenu;