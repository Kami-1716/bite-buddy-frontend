import { MyRestaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    formData: FormData
  ): Promise<MyRestaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created successfully");
  }
  if (error) {
    toast.error("Failed to create restaurant");
    console.error(error);
  }

  return { createRestaurant, isLoading };
};
