'use client'

import { Restaurant, UserFavoriteRestaurant } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { searchForRestaurants } from '@/actions/restaurant/search'
import { Header } from '../header'
import { RestaurantItem } from '../restaurant-item'

interface RestaurantsProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export const Restaurants = ({ userFavoriteRestaurants }: RestaurantsProps) => {
  const searchParams = useSearchParams()
  const searchFor = searchParams.get('search')
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor || searchFor.trim() === '') return

      const foundRestaurants = await searchForRestaurants(searchFor)
      setRestaurants(foundRestaurants)
    }

    fetchRestaurants()
  }, [searchFor]) // eslint-disable-line
  return (
    <>
      <Header />
      <div className="p-5 py-6">
        {restaurants.length > 0 ? (
          <>
            <h2 className="mb-6 text-lg font-semibold">Restaurantes encontrados</h2>

            <div className="flex w-full flex-col gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  userFavoriteRestaurants={userFavoriteRestaurants}
                  className="min-w-full max-w-full"
                />
              ))}
            </div>
          </>
        ) : (
          <h2 className="mb-6 text-lg font-semibold">Nenhum restaurante encontrado</h2>
        )}
      </div>
    </>
  )
}
