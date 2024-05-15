import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";
import { Header } from "../_components/header";
import { RestaurantItem } from "../_components/restaurant-item";

const FavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const restaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />
      <div className="p-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes favoritos</h2>

        <div className="flex w-full flex-col gap-6">
          {restaurants.length > 0 ? (
            restaurants.map(({ restaurant }) => (
              <RestaurantItem
                restaurant={restaurant}
                userFavoriteRestaurants={restaurants}
                key={restaurant.id}
                className="min-w-full max-w-full"
              />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não favoritou nenhum restaurante!
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoriteRestaurants;
