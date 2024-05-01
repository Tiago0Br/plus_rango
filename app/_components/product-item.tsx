import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculatePrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";

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
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="h-[250px] w-[150px] min-w-[200px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />

        {product.discountPercentage > 0 && (
          <div
            className="absolute left-0 top-0 flex items-center gap-[2px] rounded-full bg-primary 
            p-1 px-2 py-[2px] text-white"
          >
            <ArrowDownIcon size={12} />
            <span className="text- font-semibold">
              {product.discountPercentage}%
            </span>
          </div>
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
  );
};
