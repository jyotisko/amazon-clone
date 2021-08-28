import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils';
import Spinner from '../Utils/Spinner';
import AuthError from './AuthError';

const SignupForm: React.FC = () => {
  const history = useHistory();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState<boolean>(true);

  const handleSubmitSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const name = nameInputRef.current!.value;
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const passwordConfirm = passwordConfirmInputRef.current!.value;

    setIsEmailValid(true);
    setIsPasswordValid(true);
    setIsPasswordConfirmValid(true);
    setError(null);

    if (!EMAIL_REGEX.test(email)) return setIsEmailValid(false);
    if (!PASSWORD_REGEX.test(password)) return setIsPasswordValid(false);
    if (password !== passwordConfirm) return setIsPasswordConfirmValid(false);

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
      });

      if (data.status === 'success') return history.replace('/?login=true');

    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong!');
    }

    setIsLoading(false);
  };

  return (
    <>
      {error && <AuthError message={error} />}
      <section className="section section--auth section--signup">
        <form onSubmit={handleSubmitSignup} className="form form--signup">
          <h1 className="form__title">Sign-In</h1>
          <div className="form__group">
            <label htmlFor="name" className="form__label">Name</label>
            <input ref={nameInputRef} id="name" type="text" className="form__input" required minLength={3} />
          </div>
          <div className="form__group">
            <label htmlFor="email" className="form__label">Email</label>
            <input ref={emailInputRef} id="email" type="text" className="form__input" required />
            {isEmailValid || <h5 className="form__invalid">Please enter a valid email</h5>}
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">Password</label>
            <input ref={passwordInputRef} id="password" type="password" placeholder="At least 6 characters" className="form__input" required />
            {isPasswordValid || <h5 className="form__invalid">Minimum eight characters, at least one uppercase letter, one lowercase letter and one number</h5>}
          </div>
          <div className="form__group">
            <label htmlFor="passwordConfirm" className="form__label">Re-enter password</label>
            <input ref={passwordConfirmInputRef} id="passwordConfirm" type="password" className="form__input" required />
            {isPasswordConfirmValid || <h5 className="form__invalid">The passwords don't match</h5>}
          </div>
          {isLoading && <button className="form__submit" disabled><Spinner size={30} styles={{ margin: '-15px' }} /></button>}
          {isLoading || <button className="form__submit">Continue</button>}
        </form>
        <div className="new-to-amazon">
          <h4 className="new-to-amazon__text">Already a customer?</h4>
          <Link to='/login'><button className="new-to-amazon__button">Login to your account</button></Link>
        </div>
      </section>
    </>
  );
}

export default SignupForm;