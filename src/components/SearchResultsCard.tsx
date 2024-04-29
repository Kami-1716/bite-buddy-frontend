import { MyRestaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock } from "lucide-react";

type SearchResultsCardProps = {
  restaurant: MyRestaurant;
};
const SearchResultsCard = ({ restaurant }: SearchResultsCardProps) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt=""
          className="rounded-md w-full h-full object-cover transition-transform transform group-hover:scale-105"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-wrap flex-row">
            {restaurant.cuisines.map((cuisine, index) => (
              <span key={cuisine} className="flex">
                <span>{cuisine}</span>
                {index < restaurant.cuisines.length - 1 && (
                  <span className="mx-1">•</span>
                )}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-green-600">
              <Clock size={20} className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote size={20} />
              Delivery From ${(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;
