"use client";

import { Cart } from "../cart";
import { DeliveryInfo } from "../delivery-info";
import { DiscountBagde } from "../discount-badge";
import { ProductList } from "../product-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { CartContext } from "../../context/cart";
import { calculatePrice, formatCurrency } from "../../helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
      category: {
        select: {
          name: true;
        };
      };
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const { addProductToCart, products } = useContext(CartContext);

  const addToCart = () => {
    addProductToCart({ product, quantity });
    setIsCartOpen(true);
  };

  const addAndClearCart = () => {
    addProductToCart({ product, quantity, cleanCart: true });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    const hasProductFromOtherRestaurant = products.some(
      (currentProduct) => currentProduct.restaurantId !== product.restaurantId,
    );

    if (hasProductFromOtherRestaurant) {
      setConfirmationDialogOpen(true);
      return;
    }

    addToCart();
  };

  const handleIncreaseQuantityClick = () =>
    setQuantity(quantity < 100 ? quantity + 1 : 100);
  const handleDecreaseQuantityClick = () =>
    setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
        <div className="flex items-center gap-[0.375rem] px-5">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-between px-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculatePrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <DiscountBagde product={product} />
              )}
            </div>

            {product.discountPercentage && (
              <p className="text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-5">{quantity}</span>
            <Button size="icon" onClick={handleIncreaseQuantityClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="px-5">
          <DeliveryInfo restaurant={product.restaurant} />
        </div>

        <div className="mb-3 mt-6 space-y-3 px-5">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="px-5 font-semibold">
            Outros produtos da categoria {product.category.name}
          </h3>
          <ProductList products={complementaryProducts} />
        </div>

        <div className="px-5 pt-2">
          <Button className="w-full" onClick={handleAddToCartClick}>
            Adicionar à sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      {confirmationDialogOpen && (
        <AlertDialog
          open={confirmationDialogOpen}
          onOpenChange={setConfirmationDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Esse produto é de outro restaurante
              </AlertDialogTitle>
              <AlertDialogDescription>
                Deseja mesmo adicionar esse produto? Isso limpará sua sacola
                atual.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={addAndClearCart}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
