import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import { ComponentProps } from "react";

interface DiscountBadgeProps extends ComponentProps<"div"> {
  product: Pick<Product, "discountPercentage">;
}

export const DiscountBagde = ({ product, ...props }: DiscountBadgeProps) => {
  return (
    <div
      className="flex items-center gap-[2px] rounded-full bg-primary p-1 px-2 py-[2px] text-white"
      {...props}
    >
      <ArrowDownIcon size={12} />
      <span className="text-xs font-semibold">
        {product.discountPercentage}%
      </span>
    </div>
  );
};
