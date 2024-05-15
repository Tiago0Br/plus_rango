"use server";

import { db } from "@/app/_lib/prisma";

export const searchForRestaurants = async (query: string) => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return restaurants;
};

export const searchUserFavoriteRestaurants = async (userId?: string) => {
  if (!userId) return [];

  return db.userFavoriteRestaurant.findMany({
    where: { userId },
  });
};
