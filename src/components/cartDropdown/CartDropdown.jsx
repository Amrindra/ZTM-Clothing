import "./CartDropdownStyle.jsx";
import Button from "../button/Button";
import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import CartItem from "../cartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { CartDropdownContainer, CartItems } from "./CartDropdownStyle.jsx";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const naviage = useNavigate();

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </CartItems>
      <Button onClick={() => naviage("/checkout")}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
