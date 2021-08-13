import { useRef, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import UserCountry from './UserCountry'
import NavSearch from './NavSearch';
import DropdownMenu from './DropdownMenu';

const NavUp = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const auth = useSelector((state: RootStateOrAny) => state.auth);

  useEffect(() => {
    const element = dropdownRef.current!.lastElementChild!;
    if (!auth.isLoggedIn) element.classList.remove('hidden');
    if (auth.isLoggedIn) element.classList.add('hidden');
  }, [auth]);

  const changeDropdownState = (state: 'show' | 'hide'): void => {
    const element = dropdownRef.current!.lastElementChild!;
    state === 'show' ? element.classList.remove('hidden') : element.classList.add('hidden');
  };

  return (
    <div className="nav__up">
      <img src={logo} alt="Amazon Logo" className="nav__logo" />
      <UserCountry />
      <NavSearch />
      <div className="nav__dropdown-container" ref={dropdownRef} onMouseEnter={() => changeDropdownState('show')} onMouseLeave={() => changeDropdownState('hide')}>
        <div className="nav__texts">
          <h5>Hello, {!auth.isLoggedIn ? 'Sign in' : auth.user.name.split(' ')[0]}</h5>
          <h4>Account & Lists</h4>
        </div>
        <DropdownMenu authState={auth} />
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