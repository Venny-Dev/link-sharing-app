import Button from "../components/Button";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Loader from "../components/Loader";

import PreviewProfile from "../components/PreviewProfile";

function Preview() {
  const navigate = useNavigate();
  const { isLoading } = useAuth();

  return (
    <div className="md:bg-[#633CFF] md:h-[357px] md:pt-6 rounded-b-[32px] w-full">
      <div className=" md:relative">
        <div className="flex items-center justify-between gap-4 md:bg-white md:justify-between md:max-w-[720px] md:m-auto p-4 md:rounded-[8px] min-[1440px]:max-w-[1392px]">
          <Button
            className="bg-white text-[#633CFF] border border-[#633CFF]  w-full max-w-[159px] "
            onClick={() => navigate(-1)}
          >
            Back to Editor
          </Button>

          <Button className=" text-white w-full max-w-[159px]">Share</Button>
        </div>

        <PreviewProfile view="preview" />
      </div>

      {isLoading && (
        <>
          <Loader />
          <div className="absolute inset-0 bg-gray-800 opacity-40 w-full h-full"></div>
        </>
      )}
    </div>
  );
}

export default Preview;
