"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "../_actions/restaurant";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

export const RestaurantItem = ({
  restaurant,
  className,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const { data: session } = useSession();

  const isFavorite = userFavoriteRestaurants.some(
    (favorite) => favorite.restaurantId === restaurant.id,
  );

  const handleFavorite = async () => {
    if (!session?.user.id) {
      toast.error("Por favor, faça login primeiro!");
      return;
    }

    try {
      if (isFavorite) {
        await unfavoriteRestaurant(session.user.id, restaurant.id);
        toast.success("Restaurante removido dos favoritos!");
        return;
      }

      await favoriteRestaurant(session.user.id, restaurant.id);
      toast.success("Restaurante adicionado aos favoritos!");
    } catch (error) {
      toast.error("Ocorreu um erro ao favoritar o restaurante!");
      console.error(error);
    }
  };

  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-lg object-cover"
            />
          </Link>

          <div
            className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary 
            p-1 px-2 py-[2px] text-white"
          >
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>

          <Button
            size="icon"
            className={`absolute right-2 top-2 h-7 w-7 rounded-full ${isFavorite ? "bg-primary" : "bg-gray-700"}`}
            onClick={handleFavorite}
          >
            <HeartIcon size={16} className="fill-white" />
          </Button>
        </div>

        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex gap-1">
            <BikeIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>
          <div className="flex gap-1">
            <TimerIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
