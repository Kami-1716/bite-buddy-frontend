import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

type CuisineFilterProps = {
  onChange: (cuisine: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandClick,
}: CuisineFilterProps) => {
  const handleCuisineReset = () => {
    onChange([]);
  };

  const handleChangeCuisine = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((c) => c !== clickedCuisine);

    onChange(newCuisinesList);
  };

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter by Cuisine</div>
        <div
          className="text-sm font-semibold underline text-blue-400 cursor-pointer mb-2"
          onClick={handleCuisineReset}
        >
          Reset Filters
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isChecked = selectedCuisines?.includes(cuisine);
            return (
              <div key={cuisine} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  id={`cuisine_${cuisine}`}
                  checked={isChecked}
                  onChange={handleChangeCuisine}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer font-semibold py-2 text-sm rounded-full px-3 ${
                    isChecked
                      ? "border border-green-600 text-green-600 bg-blue-100"
                      : "border border-slate-300 bg-gray-200 text-gray-800"
                  }`}
                >
                  {isChecked && <Check size={16} />} {cuisine}
                </Label>
              </div>
            );
          })}

        <Button variant="link" onClick={onExpandClick} className="mt-4 flex-1">
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp size={16} />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown size={16} />
            </span>
          )}
        </Button>
      </div>
      {/* {isExpanded && (
        <div
          className="text-sm text-center font-semibold underline cursor-pointer mt-2"
          onClick={onExpandClick}
        >
          Show Less
        </div>
      )}
      {!isExpanded && (
        <div
          className="text-sm text-center font-semibold underline cursor-pointer mt-2"
          onClick={onExpandClick}
        >
          Show More
        </div>
      )} */}
    </>
  );
};

export default CuisineFilter;
