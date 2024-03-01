import { useGetCurrentUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetCurrentUser();

  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Unable to load user profile</div>;
  }

  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
      user={currentUser}
    />
  );
};

export default UserProfilePage;
