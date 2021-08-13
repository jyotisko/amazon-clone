import { VscWarning } from 'react-icons/vsc';

interface AuthErrorProps {
  title?: string;
  message: string;
};

const AuthError: React.FC<AuthErrorProps> = ({ title = 'There was a problem', message }) => {
  return (
    <section className="section section--auth-error">
      <div className="error">
        <div className="error__icon">
          <i className="icon icon--error"><VscWarning /></i>
        </div>
        <div className="error__texts">
          <h2 className="error__title">{title}</h2>
          <h5 className="error__message">{message}</h5>
        </div>
      </div>
    </section>
  );
};

export default AuthError;