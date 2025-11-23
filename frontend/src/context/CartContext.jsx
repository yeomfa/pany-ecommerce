import { createContext, useState, useContext } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { addToast } = useToast();

  const addToCart = (product, qty = 1) => {
    const existItem = cartItems.find((x) => x._id === product._id);

    if (existItem) {
      const newQty = existItem.qty + qty;
      if (newQty > product.countInStock) {
        addToast(
          "Sorry, you cannot add more items than available in stock.",
          "error"
        );
        return;
      }
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...existItem, qty: newQty } : x
        )
      );
      addToast("Item quantity updated in cart", "success");
    } else {
      if (qty > product.countInStock) {
        addToast(
          "Sorry, you cannot add more items than available in stock.",
          "error"
        );
        return;
      }
      setCartItems([...cartItems, { ...product, qty }]);
      addToast("Item added to cart", "success");
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
