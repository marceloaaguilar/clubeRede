"use client";

import { createContext, useContext  } from "react";

import { Voucher } from "@/lib/interfaces";
import { useState } from "react";

interface CartContextType {
  items: Voucher[];
  addItems: (items: Voucher[]) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

  const [items, setItems] = useState<Voucher[]>([]);

const addItems = (items: Voucher[]) => {
  setItems((prev) => [...(prev || []), ...items]);
};

  const removeItem = (id: string) => {
    setItems((prev) => (prev || []).filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItems, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}