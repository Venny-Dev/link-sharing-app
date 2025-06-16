import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import { useAppFeatures } from "../contexts/AppFeaturesContext";
import {
  handleDrop,
  handleImageChange,
  handleDragOver,
} from "../firebase/helpers";
import Loader from "./Loader";

function Profile() {
  const { user } = useAuth();

  const { handleChangeUserData, setImage, handleProfileSubmit, isUpdating } =
    useAppFeatures();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
  });

  useEffect(() => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      email: user?.email || prevDetails.email,
      firstName: user?.firstName || prevDetails.firstName,
      lastName: user?.lastName || prevDetails.lastName,
      profilePicture: user?.image || prevDetails.profilePicture,
    }));
  }, [user]);

  return (
    <main className="p-[24px] min-[1440px]:p-[40px] bg-white m-[16px] rounded-[8px] mb-[16px] max-w-[720px] md:m-auto md:mt-[24px] min-[1440px]:max-w-[808px] w-full ">
      <h1 className="font-bold text-[24px] leading-[36px] text-[#333333]">
        Profile details
      </h1>
      <p className="text-[16px] font-normal leading-[24px] text-[#737373] mt-[8px]">
        Add your details to create a personal touch to your profile.
      </p>

      <div className="mt-[40px] flex flex-col  justify-start bg-[#FAFAFA] rounded-[8px] p-[20px] md:flex-row md:items-center">
        <p className="font-normal text-[16px] leading-[24px] text-[#737373] md:w-full md:flex-1 md:basis-2/5">
          Profile picture
        </p>

        <div className="md:flex items-center justify-center w-full md:gap-6 md:flex-1 md:basis-3/5">
          <div
            className="mt-[16px] h-[193px] overflow-hidden  bg-[#EFEBFF] flex items-center justify-center flex-col rounded-[8px] w-[193px] md:w-full relative"
            onDrop={(e) => handleDrop(e, setUserDetails, setImage)}
            onDragOver={(e) => handleDragOver(e)}
          >
            <label className="cursor-pointer text-white rounded-md absolute">
              <div className="flex items-center flex-col">
                {userDetails.profilePicture ? (
                  <>
                    <img src="/photo-not-empty-icon.png" />
                    <p className="text-white text-[16px] font-semibold">
                      Change Image
                    </p>
                  </>
                ) : (
                  <>
                    <img src="/photo-empty-icon.png" />
                    <p className="text-[#633CFF] text-[16px] font-semibold">
                      + Upload Image
                    </p>
                  </>
                )}
              </div>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, setUserDetails, setImage)}
                className="hidden"
                accept="image/*"
              />
            </label>
            {userDetails.profilePicture && (
              <div className="">
                <img
                  src={userDetails.profilePicture}
                  alt="Selected"
                  className="max-w-full h-auto border border-gray-300 rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          <p className="font-normal text-[12px] leading-[18px] text-[#737373] mt-[24px] md:max-w-[127px]">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
      </div>

      <div className="bg-[#FAFAFA] p-[20px] mt-[24px] rounded-[8px]">
        <form onSubmit={(e) => handleProfileSubmit(e, userDetails)}>
          <div className="flex flex-col relative ">
            <label className="text-[#333333]  font-[400] text-[12px] leading-[18px]">
              First name*
            </label>
            <input
              type="firstName"
              className="border py-[12px] px-[16px] outline-none rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl"
              placeholder="e.g. John"
              value={userDetails.firstName}
              onChange={(e) =>
                handleChangeUserData(e, userDetails, setUserDetails)
              }
            />
          </div>

          <div className="flex flex-col relative  mt-[12px]">
            <label className="text-[#333333]  font-[400] text-[12px] leading-[18px]">
              Last name*
            </label>
            <input
              type="text"
              className="border py-[12px] px-[16px] outline-none rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl"
              placeholder="e.g. Appleseed"
              value={userDetails.lastName}
              onChange={(e) =>
                handleChangeUserData(e, userDetails, setUserDetails)
              }
            />
          </div>

          <div className="flex flex-col relative mt-[12px]">
            <label className="text-[#333333]  font-[400] text-[12px] leading-[18px]">
              Email address
            </label>
            <input
              type="text"
              className="border py-[12px] px-[16px] outline-none rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl"
              placeholder="e.g. example@email.com"
              value={userDetails.email}
              disabled
              onChange={(e) =>
                handleChangeUserData(e, userDetails, setUserDetails)
              }
            />
          </div>

          <div className="flex justify-end">
            <Button
              className="mt-[40px] text-white w-full min-[1440px]:max-w-[91px] flex items-center justify-center"
              isDiaabled={isUpdating}
            >
              {isUpdating ? <Loader /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
//

export default Profile;
