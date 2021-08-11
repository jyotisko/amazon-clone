const AuthFooter: React.FC = () => {
  return (
    <footer className="footer--auth">
      <div className="footer--auth__links">
        <a href="#" className="footer--auth__link">Condition of Use</a>
        <a href="#" className="footer--auth__link">Privacy Notice</a>
        <a href="#" className="footer--auth__link">Help</a>
      </div>
      <div className="footer--auth__copyright">
        <h5>&copy; This is an amazon clone, not the real website. <br /> Please do not enter real credentials</h5>
      </div>
    </footer>
  );
}

export default AuthFooter;