import { MyRestaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type RestaurantProps = {
  restaurant: MyRestaurant;
};

const RestaurantInfo = ({ restaurant }: RestaurantProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription className="text-lg text-gray-500">
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((item, index) => (
          <span className="flex">
            {item}
            {index < restaurant.cuisines.length - 1 && (
              <span className="mx-1">
                <Dot />
              </span>
            )}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
