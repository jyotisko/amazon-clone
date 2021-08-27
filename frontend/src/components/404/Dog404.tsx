import { Link } from 'react-router-dom';

const Dog404: React.FC = () => {
  return (
    <Link className="main--404__link" to="/">
      <img
        src="https://res.cloudinary.com/jyocloud/image/upload/v1630063914/amazon/assets/dog404_bixpzs.jpg"
        alt="Meet the dogs of amazon"
        className="main--404__dog main--404__image"
      />
    </Link>
  );
};

export default Dog404;