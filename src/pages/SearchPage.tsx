import { useSearchRestaurants } from "@/api/RearaurantSearchApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBox, { SearchForm } from "@/components/SearchBox";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionsDropdown from "@/components/SortOptionsDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchTerm: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchTerm: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { restaurants, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption: sortOption,
      page: 1,
    }));
  };

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
        <CuisineFilter
          onChange={setSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
          isExpanded={isExpanded}
          onExpandClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBox
          onSubmit={setSearchTerm}
          placeholder="Search by cuisine and restaurant name"
          onReset={onResetSearch}
          searchTerm={searchState.searchTerm}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultsInfo
            total={restaurants?.pagination.total}
            city={city}
          />
          <SortOptionsDropdown
            sortOption={searchState.sortOption}
            onSortOptionChange={(value) => setSortOption(value)}
          />
        </div>
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
