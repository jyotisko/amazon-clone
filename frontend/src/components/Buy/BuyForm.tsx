import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { authStateType, purchaseStateType } from '../../types/stateTypes';
import { countries } from '../../utils';
import { purchaseActions } from '../../store/purchaseSlice';

const BuyForm: React.FC = () => {
  const auth: authStateType = useSelector((state: RootStateOrAny) => state.auth);
  const purchase: purchaseStateType = useSelector((state: RootStateOrAny) => state.purchase);
  const history = useHistory();
  const dispatch = useDispatch();
  const countryRef = useRef<HTMLSelectElement>(null);
  const [name, setName] = useState<string>(auth.user?.name || '');
  const [phone, setPhone] = useState<string>(String(auth.user?.phone) || '');
  const [address, setAddress] = useState<string>(auth.user?.streetAddress || '');
  const [city, setCity] = useState<string>(auth.user?.city || '');
  const [state, setState] = useState<string>(auth.user?.state || '');
  const [zipcode, setZipcode] = useState<string>(String(auth.user?.zipcode) || '');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.user || !auth.isLoggedIn) return history.push('/');
    if (!purchase.products) return history.go('/');
  }, []);

  const updateAddress = async (): Promise<void> => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/users/updateMe`, {
        streetAddress: address,
        country: countryRef.current?.value,
        name: name,
        phone: phone,
        city: city,
        state: state,
        zipcode: zipcode
      }, {
        withCredentials: true
      });

    } catch (err) { throw err; }
  };

  const managePayment = async (): Promise<void> => {
    try {
      // 1) Get a checkout session
      const session = await axios.post(`${process.env.REACT_APP_API_URL}/purchases/checkout-session`, {
        products: purchase.products
      }, {
        withCredentials: true
      });

      dispatch(purchaseActions.resetPurchaseState());

      // 2) Create checkout form and charge the credit card
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);
      stripe && await stripe.redirectToCheckout({
        sessionId: session.data.session.id
      });

    } catch (err) { throw err; }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await updateAddress();
      await managePayment();

    } catch (err) {
      alert(err.response.data.message);
    }

    setIsProcessing(false);
  };

  return (
    <form className="form form--buy" onSubmit={handleSubmit}>
      <h2 className="form__title">Select a shipping address</h2>
      <div className="form__group">
        <label htmlFor="selectCountry" className="form__label">Country/Region</label>
        <select name="chooseCountry" ref={countryRef} id="selectCountry" className="form__select form__input" required>
          {countries.map((country: string, index: number) => <option key={index} className="form__option">{country}</option>)}
        </select>
      </div>
      <div className="form__group">
        <label htmlFor="name" className="form__label">Full name (First and Last name)</label>
        <input type="text" minLength={5} id="name" value={name} onChange={e => setName(e.target.value)} className="form__input" required />
      </div>
      <div className="form__group">
        <label htmlFor="phone" className="form__label">Phone number</label>
        <input type="number" minLength={10} id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="form__input" required />
      </div>
      <div className="form__group">
        <label htmlFor="address" className="form__label">Address</label>
        <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} className="form__input" required />
      </div>
      <div className="form__groups">
        <div className="form__group">
          <label htmlFor="city" className="form__label">City</label>
          <input type="text" id="city" value={city} onChange={e => setCity(e.target.value)} className="form__input" required />
        </div>
        <div className="form__group">
          <label htmlFor="state" className="form__label">State</label>
          <input type="text" id="state" value={state} onChange={e => setState(e.target.value)} className="form__input" required />
        </div>
        <div className="form__group">
          <label htmlFor="zipcode" className="form__label">Zip Code</label>
          <input type="number" id="zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} className="form__input" required />
        </div>
      </div>
      <button className="btn btn--yellow form__button" disabled={isProcessing} type="submit">
        {isProcessing ? 'Processing...' : 'Save address and continue'}
      </button>
    </form>
  );
};

export default BuyForm;