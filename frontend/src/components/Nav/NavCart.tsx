import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { authStateType, cartStateType } from '../../types/stateTypes';
import { CartResponseType } from '../../types/APIResponseTypes';
import { cartActions } from '../../store/cartSlice';

const NavCart: React.FC = () => {
  const dispatch = useDispatch();
  const cart: cartStateType = useSelector((state: RootStateOrAny) => state.cart);
  const auth: authStateType = useSelector((state: RootStateOrAny) => state.auth);

  const getCartData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/carts/myCarts`, {
      withCredentials: true
    });
    const items = data.data.cartItems.map((item: CartResponseType) => {
      return {
        quantity: item.quantity,
        product: item.product
      }
    });
    return items;
  };

  useEffect(() => {
    if (cart.items !== null) return;
    if (!auth.user || !auth.isLoggedIn) return;
    getCartData().then((items) => dispatch(cartActions.pushItemsToCart({
      items: items
    })));
  }, [auth.user]);

  return (
    <Link to="/cart" className="nav__cart">
      <i><FiShoppingCart /></i>
      <h4>Cart</h4>
      {cart.items && <h2>{cart.totalItems > 9 ? '9+' : cart.totalItems}</h2>}
    </Link>
  );
};

export default NavCart;