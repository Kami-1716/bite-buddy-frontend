import { useSearchRestaurants } from "@/api/RearaurantSearchApi";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { restaurants, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  if (!restaurants?.data || !city) {
    return (
      <div className="flex items-center justify-center text-xl font-bold">
        No restaurants found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">{/* insert cuisines here */}</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultsInfo total={restaurants?.pagination.total} city={city} />
        {restaurants.data.map((restaurant) => (
          <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
