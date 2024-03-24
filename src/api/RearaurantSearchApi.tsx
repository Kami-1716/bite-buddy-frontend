import { RestaurantSearchResult } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?: string) => {
  const searchRestaurant = async (): Promise<RestaurantSearchResult> => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/restaurants/search/${city}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Error while fetching the restaurants");
    }
    return response.json();
  };

  const { data: restaurants, isLoading } = useQuery(
    ["searchRestaurants", city],
    searchRestaurant,
    {
      staleTime: 0,
    }
  );

  console.log(restaurants);

  return { restaurants, isLoading };
};
