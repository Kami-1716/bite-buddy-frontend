import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetCurrentUser } from "@/api/MyUserApi";

export type CheckoutButtonProps = {
  onCheckout: (formData: UserFormData) => void;
  disabled: boolean;
};

const CheckoutButton = ({ onCheckout, disabled }: CheckoutButtonProps) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { pathname } = useLocation();
  const { currentUser, isLoading: isGetUserLoading } = useGetCurrentUser();

  const onLogin = async () => {
    await loginWithRedirect({ appState: { returnTo: pathname } });
  };

  if (isAuthLoading || !currentUser) {
    return <LoadingButton />;
  }

  if (!isAuthenticated) {
    return (
      <Button className="bg-orange-500 text-white w-full" onClick={onLogin}>
        Login to Checkout
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 text-white flex-1">
          Checkout
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px] md:max-w-[700px] bg-gray-50">
        <UserProfileForm
          user={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continue to Payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
