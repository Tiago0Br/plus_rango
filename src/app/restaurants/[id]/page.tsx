import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { RestaurantImage } from '@/components/restaurants/restaurant-image'
import Image from 'next/image'
import { StarIcon } from 'lucide-react'
import { DeliveryInfo } from '@/components/delivery-info'
import { ProductList } from '@/components/product-list'
import { CartBanner } from '@/components/restaurants/cart-banner'
import { searchUserFavoriteRestaurants } from '@/actions/restaurant/search'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { isRestaurantFavorited } from '@/helpers/restaurant'

interface RestaurantPageProps {
  params: Promise<{
    id: string
  }>
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { id } = await params
  const session = await getServerSession(authOptions)

  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            take: 10,
          },
        },
      },
      products: {
        take: 10,
      },
    },
  })

  if (!restaurant) {
    return notFound()
  }

  const userFavoriteRestaurants = await searchUserFavoriteRestaurants(session?.user.id)
  const isFavorite = isRestaurantFavorited(restaurant.id, userFavoriteRestaurants)

  if (!restaurant) {
    return notFound()
  }

  const products = restaurant.products.map((product) => ({
    ...product,
    restaurant,
  }))

  return (
    <div>
      <RestaurantImage
        restaurant={restaurant}
        isFavorite={isFavorite}
        userId={session?.user.id}
      />

      <div
        className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl 
        rounded-tr-3xl bg-white px-5 pt-5"
      >
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-foreground p-1 px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center"
          >
            <span className="text-xs text-muted-foreground">{category.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="px-5 font-semibold">Mais pedidos</h2>
        <ProductList products={products} />
      </div>

      {restaurant.categories.map((category) => (
        <div key={category.id} className="mt-6 space-y-4">
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList
            products={category.products.map((product) => ({
              ...product,
              restaurant,
            }))}
          />
        </div>
      ))}

      <CartBanner restaurant={restaurant} />
    </div>
  )
}

export default RestaurantPage
