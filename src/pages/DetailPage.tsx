import { useGetRestaurantById } from "@/api/RearaurantSearchApi";
import MenuItemCard from "@/components/MenuItemCard";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurantById, isLoading } = useGetRestaurantById(restaurantId);

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
          {restaurantById.menuItems?.map((menuItems) => (
            <MenuItemCard menuItem={menuItems} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
