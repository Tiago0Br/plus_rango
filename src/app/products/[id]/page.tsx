import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ProductImage } from '@/components/products/product-image'
import { ProductDetails } from '@/components/products/product-details'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params
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
  })

  if (!product) {
    return notFound()
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
  })

  return (
    <div>
      <ProductImage product={product} />
      <ProductDetails product={product} complementaryProducts={otherProducts} />
    </div>
  )
}

export default ProductPage
