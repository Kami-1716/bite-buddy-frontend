import SearchBox, { SearchForm } from "@/components/SearchBox";
import burgerImage from "../assets/pexels-kampus-production-5920751.jpg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handlleSearch = (searchFormValues: SearchForm) => {
    navigate(`/search/${searchFormValues.searchTerm}`);
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Bringing Flavor to Your Fingertips
        </h1>
        <span className="text-xl">Food is just a click away</span>
        <SearchBox
          placeholder="Search by city or town"
          onSubmit={handlleSearch}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={burgerImage} alt="" />
        <div className=" text-center flex justify-center items-center flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-orange-600">
            Order Takeout, Elevate Speed
          </h2>
          <p className="text-lg">
            Ready to Elevate Your Culinary Experience? Click, Crave, and Conquer
            with BiteBuddy – Order Now
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
