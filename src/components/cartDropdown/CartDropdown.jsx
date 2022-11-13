import "./CartDropdown.scss";
import Button from "../button/Button";
import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import CartItem from "../cartItem/CartItem";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const naviage = useNavigate();

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={() => naviage("/checkout")}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
