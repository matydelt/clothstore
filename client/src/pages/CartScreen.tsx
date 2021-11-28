import * as React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import CartItem from "../components/CartItem";

type CartItemType = {
  id: string;
  amount: number;
  price: number;
  image: string;
  title: string;
  category: string;
};

type CartType = CartItemType[];

const CartScreen = () => {
  const [cart, setCart] = useLocalStorage<CartType>("cart", []);

  const calculateTotal = () =>
    cart.reduce((acc, item) => acc + item.amount * item.price, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCart((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartType)
    );
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>No items</p> : null}
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal().toFixed(2)}</h2>
    </div>
  );
};

export default CartScreen;