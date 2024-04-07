import { useSearchRestaurants } from "@/api/RearaurantSearchApi";
import SearchBox, { SearchForm } from "@/components/SearchBox";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchTerm: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [SearchState, setSearchState] = useState<SearchState>({
    searchTerm: "",
  });
  const { restaurants, isLoading } = useSearchRestaurants(SearchState, city);

  console.log(restaurants);
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

  const setSearchTerm = (SearchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchTerm: SearchFormData.searchTerm,
    }));
  };

  const onResetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchTerm: "",
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">{/* insert cuisines here */}</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBox
          onSubmit={setSearchTerm}
          placeholder="Search by cuisine and restaurant name"
          onReset={onResetSearch}
          searchTerm={SearchState.searchTerm}
        />
        <SearchResultsInfo total={restaurants?.pagination.total} city={city} />
        {restaurants.data.map((restaurant) => (
          <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
