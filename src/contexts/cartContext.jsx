import { createContext, useEffect, useState } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // ...cartItems here meaning that to spread all the exisiting items
  //{ ...productToAdd, quantity: 1 } meaning that to add new item when user add to cart and add qty as well
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartQtyCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQtyCount, setCartQtyCount] = useState(0);

  // This useEffect is used to perform the change of cart qty
  useEffect(() => {
    const newCartQtyCount = cartItems.reduce(
      (currentTotal, currentCartItem) =>
        currentTotal + currentCartItem.quantity,
      0
    );
    setCartQtyCount(newCartQtyCount);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartQtyCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
