import { Header } from "@/components/header";
import { RestaurantItem } from "@/components/restaurant-item";
import { db } from "@/lib/prisma";
import { searchUserFavoriteRestaurants } from "@/actions/restaurant/search";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const RecommendedRestaurants = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({});
  const favoriteRestaurants = await searchUserFavoriteRestaurants(
    session?.user.id,
  );

  return (
    <>
      <Header />
      <div className="p-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes recomendados
        </h2>

        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              restaurant={restaurant}
              userFavoriteRestaurants={favoriteRestaurants}
              key={restaurant.id}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
