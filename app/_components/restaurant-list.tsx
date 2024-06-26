import { getServerSession } from "next-auth";
import { db } from "@/app/_lib/prisma";
import { RestaurantItem } from "./restaurant-item";
import { authOptions } from "@/app/_lib/auth";
import { searchUserFavoriteRestaurants } from "../restaurants/_actions/search";

export const RestaurantList = async () => {
  const session = await getServerSession(authOptions);

  const restaurants = await db.restaurant.findMany({ take: 10 });
  const userFavoriteRestaurants = await searchUserFavoriteRestaurants(
    session?.user?.id,
  );

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </div>
  );
};
