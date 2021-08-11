import logo from '../../assets/logo-black.png';

const AuthNav: React.FC = () => {
  return (
    <nav className="nav--auth">
      <img src={logo} alt="Amazon Logo" />
    </nav>
  );
};

export default AuthNav;