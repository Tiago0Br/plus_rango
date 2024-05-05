"use client";

import { useContext } from "react";
import { CartContext } from "../_context/cart";
import { CartItem } from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);

  return (
    <>
      {products.length > 0 ? (
        <div className="flex h-full flex-col py-5  ">
          <div className="flex-auto space-y-3">
            {products.map((product) => (
              <CartItem cartProduct={product} key={product.id} />
            ))}
          </div>

          <div className="mt-6">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Entrega</span>
                  <span>
                    {Number(products[0].restaurant.deliveryFee) > 0 ? (
                      formatCurrency(Number(products[0].restaurant.deliveryFee))
                    ) : (
                      <span className="uppercase text-primary">Grátis</span>
                    )}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Desconto</span>
                  <span>- {formatCurrency(totalDiscount)}</span>
                </div>

                <Separator />
              </CardContent>
            </Card>
          </div>

          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </div>
      ) : (
        <div className="py-5">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center">
              Seu carrinho está vazio :D
            </div>

            <span className="text-md text-center text-muted-foreground">
              Comece adicionando itens na sua sacola!
            </span>
          </div>
        </div>
      )}
    </>
  );
};
