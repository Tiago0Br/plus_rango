"use client";

import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import { CartItem } from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { products, subtotalPrice, totalPrice, totalDiscount, clearCart } =
    useContext(CartContext);

  const { data } = useSession();

  const handleFinishOrder = async () => {
    setIsConfirmDialogOpen(false);

    if (!data?.user) return;

    const restaurant = products[0]?.restaurant;

    try {
      setIsLoading(true);
      await createOrder({
        subtotalPrice,
        totalDiscount,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTime: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: {
            id: data.user.id!,
          },
        },
      });

      clearCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>

                <Separator />
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={() => setIsConfirmDialogOpen(true)}
            className="mt-6 w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Finalizar pedido
          </Button>
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

      <AlertDialog open={isConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja confirmar o pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Seu pedido será preparado pelo restaurante e logo vai chegar ao
              seu endereço!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsConfirmDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishOrder}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
