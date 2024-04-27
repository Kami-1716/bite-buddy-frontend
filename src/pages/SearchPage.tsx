import { useSearchRestaurants } from "@/api/RearaurantSearchApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBox, { SearchForm } from "@/components/SearchBox";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchTerm: string;
  page: number;
  selectedCuisines: string[];
};

const SearchPage = () => {
  const { city } = useParams();
  const [SearchState, setSearchState] = useState<SearchState>({
    searchTerm: "",
    page: 1,
    selectedCuisines: [],
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { restaurants, isLoading } = useSearchRestaurants(SearchState, city);

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

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
      <div id="cuisines-list">
        {/* insert cuisines here */}
        <CuisineFilter
          onChange={setSelectedCuisines}
          selectedCuisines={SearchState.selectedCuisines}
          isExpanded={isExpanded}
          onExpandClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
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
        <PaginationSelector
          page={restaurants.pagination.page}
          pages={restaurants.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
