import { Link } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { authStateType } from '../../types/stateTypes';
import amazonBasics from '../../assets/amazon-basics.jpg';
import idealTV from '../../assets/ideal-tv.jpg';
import gaming from '../../assets/gaming.png';
import oculus from '../../assets/oculus.jpg';
import toysAndGames from '../../assets/toy-and-games.jpg';
import computerAndAccessories from '../../assets/computer-and-accessories.jpg';
import amazonPrime from '../../assets/prime.jpg';
import appliances from '../../assets/electronics.jpg';

const Featured: React.FC = () => {
  const auth: authStateType = useSelector((state: RootStateOrAny) => state.auth);

  return (
    <section className="featured__home">
      <div className="features">
        <div className="feature feature--1">
          <h1 className="feature__text">AmazonBasics</h1>
          <img src={amazonBasics} alt="Amazon Basics" className="feature__image" />
          <Link to="#" className="feature__link">See more</Link>
        </div>
        <div className="feature feature--2">
          <h1 className="feature__text">Find your ideal TV</h1>
          <img src={idealTV} alt="Find your ideal TV" className="feature__image" />
          <Link to="#" className="feature__link">See more</Link>
        </div>
        <div className="feature feature--3">
          <h1 className="feature__text">Gaming accessories</h1>
          <img src={gaming} alt="Gaming accessories" className="feature__image" />
          <Link to="/nodes/computer-accessories" className="feature__link">See more</Link>
        </div>
        <div className="feature feature--4 feature--prime">
          <div className="feature__signin">
            <h1 className="feature__text feature__signin__text">
              {!auth.isLoggedIn ? 'Sign in for the best experience' : `Hello, ${auth.user!.name.split(' ')[0]}`}
            </h1>
            {auth.isLoggedIn || <a className="feature__signin__link" href="#">Sign in securely</a>}
          </div>
          <div className="feature__prime">
            <Link to='/features'><img src={amazonPrime} alt="Amazon Prime" className="feature__prime__image" /></Link>
          </div>
        </div>
        <div className="feature feature--5">
          <h1 className="feature__text">Oculus</h1>
          <img src={oculus} alt="Oculus" className="feature__image" />
          <Link to="#" className="feature__link">Shop now</Link>
        </div>
        <div className="feature feature--6">
          <h1 className="feature__text">Toys and games</h1>
          <img src={toysAndGames} alt="Toys and games" className="feature__image" />
          <Link to="/nodes/toys" className="feature__link">Shop now</Link>
        </div>
        <div className="feature feature--7">
          <h1 className="feature__text">Computer and accessories</h1>
          <img src={computerAndAccessories} alt="Computer And Accessories" className="feature__image" />
          <Link to="/nodes/computer-accessories" className="feature__link">Shop now</Link>
        </div>
        <div className="feature feature--8">
          <h1 className="feature__text">Appliances</h1>
          <img src={appliances} alt="Appliances" className="feature__image" />
          <Link to="/nodes/electronics" className="feature__link">Shop now</Link>
        </div>
      </div>
    </section>
  );
}

export default Featured;