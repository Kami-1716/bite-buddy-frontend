import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/manage-restaurant"
        className="flex bg-white text-black items-center hover:text-orange-500 font-bold"
      >
        Manage Restaurant
      </Link>
      <Separator />
      <Link
        to="/user-profile"
        className="flex bg-white text-black items-center hover:text-orange-500 font-bold"
      >
        User Profile
      </Link>
      <Separator />
      <Button
        className="flex items-center px-3 w-full hover:bg-orange-500 font-bold"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </div>
  );
};

export default MobileNavLinks;
