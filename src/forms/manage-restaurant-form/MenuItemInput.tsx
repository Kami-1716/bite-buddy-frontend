import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type MenuItemInputProps = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: MenuItemInputProps) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="Burger" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Price ($)
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="Burger" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button variant="destructive" type="button" onClick={removeMenuItem}>
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
