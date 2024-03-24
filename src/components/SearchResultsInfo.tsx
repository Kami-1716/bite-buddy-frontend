import { Link } from "react-router-dom";

type SearchResultsInfoProps = {
  total: number;
  city: string;
};
const SearchResultsInfo = ({ total, city }: SearchResultsInfoProps) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:flex-row lg:items-center">
      <span>
        {total} restaurants found in {city}
        <Link
          to="/"
          className="text-blue-500 ml-1 text-sm underline cursor-pointer hover:text-blue-700"
        >
          Change location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultsInfo;
