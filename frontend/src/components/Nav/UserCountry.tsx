import { FiMapPin } from 'react-icons/fi';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UserCountry: React.FC = () => {
  const [country, setCountry] = useState<string>('');

  const getUserCountry = async (): Promise<string> => {
    const { data } = await axios.get(`https://api.ipregistry.co?key=${process.env.REACT_APP_IP_REGISTRY_API_KEY}`);
    const country = data?.location?.country?.name;
    if (country) localStorage.setItem('country', country);
    return country || '';
  };

  useEffect(() => {
    const localStorageCountry = localStorage.getItem('country');
    if (localStorageCountry) return setCountry(localStorageCountry);

    getUserCountry().then(country => country === '' ? setCountry('USA') : setCountry(country));
  }, []);

  return (
    <div className="nav__deliver">
      <i className="icon icon--pin"><FiMapPin /></i>
      <div className="nav__deliver--text">
        <div className="nav__texts">
          <h5>Deliver to</h5>
          <h4>{country}</h4>
        </div>
      </div>
    </div>
  );
}

export default UserCountry;