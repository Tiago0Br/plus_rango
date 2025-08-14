"use client";

import { Button } from "../ui/button";
import { useToggleFavoriteRestaurant } from "../../hooks/use-toggle-favorite-restaurant";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  isFavorite: boolean;
  userId?: string;
}

export const RestaurantImage = ({
  restaurant,
  isFavorite,
  userId,
}: RestaurantImageProps) => {
  function handleClick() {
    router.back();
  }

  const router = useRouter();

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId,
    isRestaurantFavorited: isFavorite,
  });

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />

      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full ${isFavorite ? "bg-primary" : "bg-gray-700"}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};
