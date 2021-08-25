import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { purchaseActions } from '../../store/purchaseSlice';
import { ProductResponseType } from '../../types/APIResponseTypes';
import { authStateType } from '../../types/stateTypes';

interface BuyButtonProps {
  product: ProductResponseType;
};

const BuyButton: React.FC<BuyButtonProps> = ({ product }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isLoggedIn }: authStateType = useSelector((state: RootStateOrAny) => state.auth);

  const handleBuyButtonClick = () => {
    if (!user || !isLoggedIn) return history.push('/login');
    dispatch(purchaseActions.configurePurchaseState({
      products: [{
        name: product.name,
        description: product.description,
        imageMain: product.imageMain,
        priceOffer: product.priceOffer,
        quantity: 1,
        productId: product._id
      }]
    }));
    return history.push('/buy');
  };
  return (
    <button className="btn btn--buy" onClick={handleBuyButtonClick}>Buy Now</button>
  );
};

export default BuyButton;