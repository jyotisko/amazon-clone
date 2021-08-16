import NavUp from './NavUp';
import NavDown from './NavDown';

const Nav = ({ showSearchHistory = false }) => {
  return (
    <nav className="nav">
      <NavUp showSearchHistory={showSearchHistory} />
      <NavDown />
    </nav>
  );
}

export default Nav;