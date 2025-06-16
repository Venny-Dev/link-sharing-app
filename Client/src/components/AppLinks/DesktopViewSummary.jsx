import { useAuth } from "../../contexts/AuthContext";
import PreviewProfile from "../PreviewProfile";

function DesktopViewSummary() {
  const path = window.location.pathname.slice(5);

  // console.log(window.location.pathname);
  const { user } = useAuth();

  return (
    <div className=" col-span-2 min-[1440px]:flex items-center justify-center max-w-[560px] hidden bg-white rounded-[8px]  px-[126px] py-[101px] mt-[24px] ">
      <div>
        <img src="/illustration-phone-mockup.svg" alt="phone-mockup" />
      </div>
      <PreviewProfile view={path} user={user} />
    </div>
  );
}

export default DesktopViewSummary;
