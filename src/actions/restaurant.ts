'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../lib/prisma'

export const toggleFavoriteRestaurant = async (userId: string, restaurantId: string) => {
  const restaurant = await db.userFavoriteRestaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  })

  if (restaurant) {
    return unfavoriteRestaurant(userId, restaurantId)
  }

  return favoriteRestaurant(userId, restaurantId)
}

export const favoriteRestaurant = async (userId: string, restaurantId: string) => {
  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  })

  revalidatePath('/')
}

export const unfavoriteRestaurant = async (userId: string, restaurantId: string) => {
  await db.userFavoriteRestaurant.delete({
    where: {
      userId_restaurantId: {
        userId,
        restaurantId,
      },
    },
  })

  revalidatePath('/')
}
