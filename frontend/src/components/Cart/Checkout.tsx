import { RootStateOrAny, useSelector } from 'react-redux';
import { cartStateType, currencyStateType } from '../../types/stateTypes';
import { formatNumber } from '../../utils';

const Checkout: React.FC = () => {
  const cart: cartStateType = useSelector((state: RootStateOrAny) => state.cart);
  const currency: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);

  return (
    <section className="cart__checkout">
      <h2 className="cart__checkout__text">Subtotal ({cart.totalItems}):&nbsp;
        <span className="cart__checkout__price">{formatNumber(currency.symbol, currency.multiplier * cart.totalPrice)}</span>
      </h2>
      <button className="btn btn--checkout">Proceed to checkout</button>
    </section>
  );
};

export default Checkout;