import "./CartDropdownStyle.jsx";
import Button from "../button/Button";
import { useContext } from "react";
import CartItem from "../cartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { CartDropdownContainer, CartItems } from "./CartDropdownStyle.jsx";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cartSelector.js";

const CartDropdown = () => {
  const naviage = useNavigate();

  const cartItems = useSelector(selectCartItems);

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
