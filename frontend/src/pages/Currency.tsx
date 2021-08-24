import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import { availableCurrencies } from '../utils';
import { currencyActions } from '../store/currencySlice';

const Currency: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectRef = useRef<HTMLSelectElement>(null);

  const updateCurrency = () => {
    const currencyDetails = JSON.parse(selectRef.current!.value);
    localStorage.setItem('currency', JSON.stringify(currencyDetails));
    dispatch(currencyActions.changeCurrency({ ...currencyDetails }));
  };

  return (
    <React.Fragment>
      <Nav />
      <main className="main main--currency currency">
        <h2 className="currency__title">Currency settings</h2>
        <h3 className="currency__paragraph">Select the currency you want to shop with</h3>
        <select ref={selectRef} name="Select Currency" className="currency__select" defaultValue={localStorage.getItem('currency') || ''}>
          {
            availableCurrencies.map((currency, index) => {
              return <option key={index} value={JSON.stringify(currency)} >
                {currency.symbol} - {currency.currency} - {currency.currencyName}
              </option>
            })
          }
        </select>
        <div className="currency__buttons">
          <button className="btn btn--outlined" onClick={() => history.go(-1)}>Cancel</button>
          <button className="btn btn--yellow" onClick={updateCurrency}>Save changes</button>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Currency;