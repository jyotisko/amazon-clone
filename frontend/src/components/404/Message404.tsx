import { Link } from 'react-router-dom';

const Message404: React.FC = () => {
  return (
    <Link className="main--404__link" to="/">
      <img
        src="https://res.cloudinary.com/jyocloud/image/upload/v1630063914/amazon/assets/message404_efsogp.png"
        alt="We are unable to find the page."
        className="main--404__message main--404__image"
      />
    </Link>
  );
};

export default Message404;