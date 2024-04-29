import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export type SortOptions = {
  onSortOptionChange: (sortOption: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  { label: "Best Match", value: "bestMatch" },
  { label: "Delivery Price", value: "deliveryPrice" },
  { label: "Estimated Delivery Time", value: "estimatedDeliveryTime" },
];

const SortOptionsDropdown = ({
  onSortOptionChange,
  sortOption,
}: SortOptions) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="w-full">
          Sort by:{" "}
          {SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
            "Best Match"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer font-semibold"
            onClick={() => onSortOptionChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionsDropdown;
