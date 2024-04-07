import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const searchFormSchema = z.object({
  searchTerm: z.string().nonempty("Search term cannot be empty"),
});

type SearchBoxProps = {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
  searchTerm: string;
};

export type SearchForm = z.infer<typeof searchFormSchema>;

const SearchBox = ({
  onSubmit,
  placeholder,
  onReset,
  searchTerm,
}: SearchBoxProps) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: { searchTerm },
  });

  useEffect(() => {
    form.reset({ searchTerm });
  }, [form, searchTerm]);

  const handleReset = () => {
    form.reset({
      searchTerm: "",
    });
    onReset?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5 ${
          form.formState.errors.searchTerm && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          name="searchTerm"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  onReset={onReset}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          type="button"
          className="rounded-full"
          onClick={handleReset}
        >
          Clear
        </Button>
        <Button size="lg" type="submit" className="rounded-full bg-orange-500">
          <span className="hidden md:block">Search</span>
          <Search strokeWidth={2.5} size={20} className="md:hidden" />
        </Button>
      </form>
    </Form>
  );
};

export default SearchBox;
