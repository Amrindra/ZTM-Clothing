import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartIconContainer, ItemCount } from "./CartIconStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cartSelector";
import { setIsCartOpen } from "../../store/cart/cartAction";

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartQtyCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <CartIconContainer onClick={() => dispatch(setIsCartOpen(!isCartOpen))}>
      <ShoppingIcon />
      <ItemCount>{cartQtyCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
