export type MyUser = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  country: string;
  city: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type MyRestaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type RestaurantSearchResult = {
  data: MyRestaurant[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
};
