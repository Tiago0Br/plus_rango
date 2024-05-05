"use client";

import { Prisma } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculatePrice } from "../_helpers/price";

interface Product
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
        };
      };
    };
  }> {}

export interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  totalQuantity: number;
  addProductToCart: ({
    product, // eslint-disable-line
    quantity, // eslint-disable-line
    cleanCart, // eslint-disable-line
  }: {
    product: Product;
    quantity: number;
    cleanCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void; // eslint-disable-line
  increaseProductQuantity: (productId: string) => void; // eslint-disable-line
  removeProductFromCart: (productId: string) => void; // eslint-disable-line
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscount: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = useMemo(() => {
    return products.reduce((total, product) => {
      return total + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return (
      products.reduce((total, product) => {
        return total + calculatePrice(product) * product.quantity;
      }, 0) + Number(products[0]?.restaurant.deliveryFee) || 0
    );
  }, [products]);

  const totalQuantity = useMemo(() => {
    return products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount =
    subtotalPrice -
    totalPrice +
    (Number(products[0]?.restaurant.deliveryFee) || 0);

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) =>
        cartProduct.id === productId && cartProduct.quantity > 1
          ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
          : cartProduct,
      ),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) =>
        cartProduct.id === productId
          ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
          : cartProduct,
      ),
    );
  };

  const addProductToCart = ({
    product,
    quantity,
    cleanCart = false,
  }: {
    product: Product;
    quantity: number;
    cleanCart?: boolean;
  }) => {
    const isProductAlreadyInCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (cleanCart) {
      setProducts([]);
    }

    if (isProductAlreadyInCart) {
      setProducts((prev) =>
        prev.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
            : cartProduct,
        ),
      );

      return;
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        totalDiscount,
        totalQuantity,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
