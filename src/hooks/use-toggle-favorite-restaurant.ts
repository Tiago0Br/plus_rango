import { toast } from 'sonner'
import { toggleFavoriteRestaurant } from '../actions/restaurant'
import { useRouter } from 'next/navigation'

interface useToggleFavoriteRestaurantProps {
  userId?: string
  restaurantId: string
  isRestaurantFavorited?: boolean
}

export const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  isRestaurantFavorited,
}: useToggleFavoriteRestaurantProps) => {
  const router = useRouter()

  const handleFavoriteClick = async () => {
    if (!userId) {
      toast.error('Por favor, faça login primeiro!')
      return
    }

    try {
      await toggleFavoriteRestaurant(userId, restaurantId)
      toast(
        isRestaurantFavorited
          ? 'Restaurante desfavoritado com sucesso!'
          : 'Restaurante favoritado com sucesso!',
        {
          action: {
            label: 'Ver favoritos',
            onClick: () => router.push('/favorite-restaurants'),
          },
        }
      )
    } catch (error) {
      toast.error('Não foi possível favoritar o restaurante!')

      console.error(error)
    }
  }

  return { handleFavoriteClick }
}
