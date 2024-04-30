import { SearchState } from "@/pages/SearchPage";
import { MyRestaurant, RestaurantSearchResult } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const searchRestaurantRequest = async (): Promise<RestaurantSearchResult> => {
    const params = new URLSearchParams();
    params.set("searchTerm", searchState.searchTerm);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOptions", searchState.sortOption);
    const response = await fetch(
      `${API_BASE_URL}/api/v1/restaurants/search/${city}?${params.toString()}`,
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
    ["searchRestaurants", searchState, city],
    searchRestaurantRequest,
    {
      enabled: !!city,
    }
  );
  return { restaurants, isLoading };
};

export const useGetRestaurantById = (restaurantId?: string) => {
  const getRestaurantRequest = async (): Promise<MyRestaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/restaurants/${restaurantId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Error while fetching the restaurant");
    }
    return response.json();
  };

  const { data: restaurantById, isLoading } = useQuery(
    ["getRestaurantById", restaurantId],
    getRestaurantRequest,
    {
      enabled: !!restaurantId,
    }
  );
  return { restaurantById, isLoading };
};
