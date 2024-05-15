"use client";

import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "@/app/_actions/restaurant";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

  const handleFavorite = async () => {
    if (!userId) {
      toast.error("Por favor, faça login primeiro!");
      return;
    }
    try {
      if (isFavorite) {
        await unfavoriteRestaurant(userId, restaurant.id);
        toast.success("Restaurante removido dos favoritos!");
        return;
      }

      await favoriteRestaurant(userId, restaurant.id);
      toast.success("Restaurante adicionado aos favoritos!");
    } catch (error) {
      toast.error("Ocorreu um erro ao favoritar o restaurante!");
      console.error(error);
    }
  };

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
        onClick={handleFavorite}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};
