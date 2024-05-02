import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { ProductImage } from "../_components/product-image";
import { ProductDetails } from "../_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  const otherProducts = await db.product.findMany({
    where: {
      id: { not: product.id },
      categoryId: product.categoryId,
      restaurantId: product.restaurant.id,
    },
    include: {
      restaurant: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    take: 5,
  });

  return (
    <div>
      <ProductImage product={product} />
      <ProductDetails product={product} complementaryProducts={otherProducts} />
    </div>
  );
};

export default ProductPage;
