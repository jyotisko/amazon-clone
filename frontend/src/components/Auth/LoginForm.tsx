import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils';
import Spinner from '../Utils/Spinner';

const LoginForm: React.FC = () => {
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const handleLoginSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsEmailValid(true);
    setIsPasswordValid(true);

    if (!EMAIL_REGEX.test(emailRef.current!.value.toLowerCase())) return setIsEmailValid(false);
    if (!PASSWORD_REGEX.test(passwordRef.current!.value)) return setIsPasswordValid(false);

    setLoading(true);
    try {
      const { data } = await axios.post('/api/v1/users/login', {
        email: emailRef.current!.value,
        password: passwordRef.current!.value
      });

      if (data.status === 'success') return history.push('/');

    } catch (err) {
      console.log(err);
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <section className="section section--auth">
      <form onSubmit={handleLoginSubmit} className="form form--login">
        <h1 className="form__title">Sign-In</h1>
        <div className="form__group">
          <label htmlFor="email" className="form__label">Email</label>
          <input ref={emailRef} id="email" type="text" className="form__input" required />
          {isEmailValid || <h5 className="form__invalid">Please enter a valid email</h5>}
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form__label">Password</label>
          <input ref={passwordRef} id="password" type="password" className="form__input" required />
          {isPasswordValid || <h5 className="form__invalid">Minimum eight characters, at least one uppercase letter, one lowercase letter and one number</h5>}
        </div>
        {loading && <button className="form__submit" disabled><Spinner size={30} styles={{ margin: '-15px' }} /></button>}
        {loading || <button className="form__submit">Continue</button>}
      </form>
      <div className="new-to-amazon">
        <h4 className="new-to-amazon__text">New to amazon?</h4>
        <button className="new-to-amazon__button">Create your amazon account</button>
      </div>
    </section>
  );
}

export default LoginForm;