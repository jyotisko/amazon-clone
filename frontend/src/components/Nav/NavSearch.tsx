import { IoSearchSharp } from 'react-icons/io5';

const NavSearch: React.FC = () => {
  return (
    <div className="nav__search">
      <select className="nav__caterogy-dropdown">
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="toys">Toys</option>
        <option value="computer-and-accessories">Computer And Accessories</option>
        <option value="mobiles">Mobiles</option>
      </select>
      <input type="text" />
      <button><i className="icon icon--search"><IoSearchSharp /></i></button>
    </div>
  );
}

export default NavSearch;