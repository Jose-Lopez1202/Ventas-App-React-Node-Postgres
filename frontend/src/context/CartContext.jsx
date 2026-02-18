import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // items: [{ product, quantity }]
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems((prev) => {
      const found = prev.find((x) => x.product.id === product.id);
      if (found) {
        return prev.map((x) =>
          x.product.id === product.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const decreaseQty = (productId) => {
    setItems((prev) =>
      prev
        .map((x) =>
          x.product.id === productId ? { ...x, quantity: x.quantity - 1 } : x
        )
        .filter((x) => x.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((x) => x.product.id !== productId));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => {
    return items.reduce(
      (sum, x) => sum + Number(x.product.price) * x.quantity,
      0
    );
  }, [items]);

  const count = useMemo(() => {
    return items.reduce((sum, x) => sum + x.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
