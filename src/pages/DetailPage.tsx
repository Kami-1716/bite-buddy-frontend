import { useGetRestaurantById } from "@/api/RearaurantSearchApi";
import MenuItemCard from "@/components/MenuItemCard";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItems = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurantById, isLoading } = useGetRestaurantById(restaurantId);

  const [cartItems, setCartItems] = useState<CartItems[]>(() => {
    const items = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return items ? JSON.parse(items) : [];
  });

  // add to cart function
  const addToCart = (menuItem: MenuItem) => {
    const existingItem = cartItems.find((item) => item._id === menuItem._id);

    let newCartItems;

    if (existingItem) {
      newCartItems = cartItems.map((item) =>
        item._id === menuItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCartItems = [
        ...cartItems,
        {
          _id: menuItem._id,
          name: menuItem.name,
          quantity: 1,
          price: menuItem.price,
        },
      ];
    }

    setCartItems(newCartItems);
    sessionStorage.setItem(
      `cartItems-${restaurantId}`,
      JSON.stringify(newCartItems)
    );
  };

  const removeFromCart = (id: string) => {
    const newCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(newCartItems);
    sessionStorage.setItem(
      `cartItems-${restaurantId}`,
      JSON.stringify(newCartItems)
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  if (!restaurantById) {
    return (
      <div className="flex items-center justify-center text-xl font-bold">
        Restaurant not found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurantById.imageUrl}
          alt=""
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurantById} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurantById.menuItems?.map((menuItem) => (
            <MenuItemCard
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <OrderSummary
            restaurant={restaurantById}
            cartItems={cartItems}
            removeFromCart={(cartItem: CartItems) =>
              removeFromCart(cartItem._id)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
