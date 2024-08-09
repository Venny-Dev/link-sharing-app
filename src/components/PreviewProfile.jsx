import CreatedLink from "./CreatedLink";
import { useEffect, useState } from "react";
import { getUserProfile } from "../firebase/firebaseUtils";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

function PreviewProfile({ view }) {
  const [previewDetails, setPreviewDetails] = useState({
    fullName: "",
    links: [],
    email: "",
    profilePicture: "/transparent-icon.png",
  });

  const { user } = useAuth();

  useEffect(() => {
    async function getPrevDetails() {
      if (user) {
        try {
          const data = await getUserProfile(user.id);
          console.log(data);

          setPreviewDetails((prevDetails) => ({
            ...prevDetails,
            fullName:
              `${data.firstName} ${data.lastName}` || prevDetails.fullName,
            email: data.email || prevDetails.email,
            profilePicture: data.profilePicture || prevDetails.profilePicture,
            links: data.links,
          }));
        } catch (err) {
          console.log(err);
          toast.error("Error getting user details");
        }
      }
    }
    getPrevDetails();
  }, [user, user?.id]);

  return (
    <div
      className={`flex flex-col items-center w-[237px] md:w-[349px] md:rounded-[24px] md:py-[48px] md:absolute ${view === "preview" ? "md:bg-white  md:shadow-2xl md:px-[56px] m-auto mt-[60px] min-[1440px]:mt-[130px] md:mt-[168px] md:left-1/2 md:top-[279px] gap-[56px] md:transform md:-translate-x-1/2 md:-translate-y-1/2" : "bg-transparent md:px-[0px] mt-[0px] md:left-[130px] top-[150px] gap-[45px]"} ${view === "links" ? "top-[135px]" : ""}`}
    >
      <div
        className={`flex flex-col  ${view === "preview" ? " items-center" : " items-start"} `}
      >
        <div
          className={`${view === "preview" ? "w-[104px] h-[104px]" : "w-[96px] h-[96px] -ml-7"} border-[4px] border-[#633CFF] rounded-[50%] overflow-hidden`}
        >
          <img
            src={previewDetails.profilePicture}
            alt="transparent-icon"
            className="object-cover w-full h-full"
          />
        </div>

        <div
          className={`font-bold max-h-full leading-[48px] text-[#333333] ${view === "preview" ? "mt-[25px] text-center text-[26px] md:text-[28px] h-[48px] w-full" : "text-start mt-[4px] text-[20px] "}   rounded-[8px] `}
        >
          <p className={`${view === "preview" ? " ml-[0px]" : " -ml-[55px] "}`}>
            {previewDetails.fullName
              ?.split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </p>
          <p
            className={`text-[#888888] font-normal leading-[24px]  ${view === "preview" ? " mt-[8px]  text-[16px] " : " -mt-[15px] -ml-[15px] text-[14px] "}`}
          >
            {previewDetails.email}
          </p>
        </div>
      </div>

      {previewDetails.links.length === 0 && <div> No links yet</div>}

      {previewDetails.links.length > 0 && (
        <div
          className={`${view === "preview" ? " mt-[56px] max-h-[400px] md:max-h-[208px]" : "max-h-[285px] mt-[0px] ml-[50px]"} w-full overflow-y-auto  scrollbar-thin `}
        >
          {previewDetails.links.map((link, i) => (
            <CreatedLink key={i} link={link} view={view} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PreviewProfile;
