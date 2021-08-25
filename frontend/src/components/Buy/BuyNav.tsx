import logo from '../../assets/logo-black.png';

const BuyNav: React.FC = () => {
  return (
    <nav className="nav nav--buy">
      <img src={logo} alt="Amazon Logo" className="nav--buy__image" />
    </nav>
  );
};

export default BuyNav;