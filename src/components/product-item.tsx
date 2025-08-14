"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculatePrice, formatCurrency } from "../helpers/price";
import Link from "next/link";
import { DiscountBagde } from "./discount-badge";
import { cn } from "../lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

export const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn("w-[150px] min-w-[150px]", className)}
      href={`/products/${product.id}`}
    >
      <div className="h-full space-y-2">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />

          {product.discountPercentage > 0 && (
            <DiscountBagde
              style={{ position: "absolute", top: 5, left: 5 }}
              product={product}
            />
          )}
        </div>

        <div>
          <h2 className="text-sm">{product.name}</h2>
          <div className="flex items-center gap-1">
            <h3 className="items-center font-semibold">
              {formatCurrency(calculatePrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(+product.price)}
              </span>
            )}
          </div>

          <span>{product.restaurant.name}</span>
        </div>
      </div>
    </Link>
  );
};
