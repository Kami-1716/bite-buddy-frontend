import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";
import { Button } from "@/components/ui/button";

const MenuSection = () => {
  const { control } = useFormContext();
  const { remove, append, fields } = useFieldArray({
    control,
    name: "menuItem",
  });
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <FormDescription>
          Add the menu items for your restaurant
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-3">
            {fields.map((_, index) => (
              <MenuItemInput
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        onClick={() =>
          append({
            name: "",
            price: 0,
          })
        }
        type="button"
      >
        Add Item
      </Button>
    </div>
  );
};

export default MenuSection;
