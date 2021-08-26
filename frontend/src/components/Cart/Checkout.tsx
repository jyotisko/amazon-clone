import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { purchaseActions } from '../../store/purchaseSlice';
import { cartStateType, currencyStateType } from '../../types/stateTypes';
import { formatNumber } from '../../utils';

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart: cartStateType = useSelector((state: RootStateOrAny) => state.cart);
  const currency: currencyStateType = useSelector((state: RootStateOrAny) => state.currency);

  const handleClick = () => {
    if (!cart.items) return;
    const items = cart.items.map((item) => {
      return {
        name: item.product.name,
        description: item.product.description,
        imageMain: item.product.imageMain,
        priceOffer: item.product.priceOffer,
        quantity: item.quantity,
        productId: item.product._id
      }
    });

    dispatch(purchaseActions.configurePurchaseState({
      products: items
    }));

    history.push('/buy');
  };

  return (
    <section className="cart__checkout">
      <h2 className="cart__checkout__text">Subtotal ({cart.totalItems}):&nbsp;
        <span className="cart__checkout__price">{formatNumber(currency.symbol, currency.multiplier * cart.totalPrice)}</span>
      </h2>
      <button className="btn btn--checkout" onClick={handleClick}>Proceed to checkout</button>
    </section>
  );
};

export default Checkout;