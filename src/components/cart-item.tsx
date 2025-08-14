"use client";

import Image from "next/image";
import { CartContext, CartProduct } from "../context/cart";
import { calculatePrice, formatCurrency } from "../helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

export const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(calculatePrice(cartProduct))}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(cartProduct.price))}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 border border-solid border-muted-foreground"
              onClick={() => decreaseProductQuantity(cartProduct.id)}
            >
              <ChevronLeftIcon size={18} />
            </Button>
            <span className="w-5 text-sm">{cartProduct.quantity}</span>
            <Button
              size="icon"
              className="h-9 w-9"
              onClick={() => increaseProductQuantity(cartProduct.id)}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        className="h-8 w-8 border border-solid border-muted-foreground"
        variant="ghost"
        onClick={() => removeProductFromCart(cartProduct.id)}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};
