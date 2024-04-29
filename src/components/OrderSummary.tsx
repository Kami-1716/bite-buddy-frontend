import { CartItems } from "@/pages/DetailPage";
import { MyRestaurant } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

export type OrderSummaryState = {
  cartItems: CartItems[];
  restaurant: MyRestaurant;
  removeFromCart: (cartItem: CartItems) => void;
};

const OrderSummary = ({
  restaurant,
  cartItems,
  removeFromCart,
}: OrderSummaryState) => {
  const getTotalCost = () => {
    const totalInCents = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    return ((totalInCents + restaurant.deliveryPrice) / 100).toFixed(2);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
            <span>Order Summary</span>
            <span>${getTotalCost()}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {cartItems.map((cartItem) => (
            <div className="flex justify-between">
              <span>
                <Badge variant="outline" className="mr-1">
                  {cartItem.quantity}
                </Badge>
                {cartItem.name}
              </span>
              <span className="flex items-center gap-1">
                <Trash
                  color="red"
                  size="20"
                  className="cursor-pointer"
                  onClick={() => removeFromCart(cartItem)}
                />
                ${((cartItem.price * cartItem.quantity) / 100).toFixed(2)}
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between">
            <span>Delivery Price</span>
            <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
          </div>
          <Separator />
        </CardContent>
      </Card>
    </>
  );
};

export default OrderSummary;
