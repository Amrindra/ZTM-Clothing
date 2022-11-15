import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import { CartIconContainer, ItemCount } from "./CartIconStyle";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartQtyCount } = useContext(CartContext);
  return (
    <CartIconContainer onClick={() => setIsCartOpen(!isCartOpen)}>
      <ShoppingIcon />
      <ItemCount>{cartQtyCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
