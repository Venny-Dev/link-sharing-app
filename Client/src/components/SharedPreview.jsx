import { useParams } from "react-router-dom";
import PreviewProfile from "./PreviewProfile";
import { useGetSharedProfile } from "../reactQueryHooks/useAppFeatures";
import LoaderFull from "./LoaderFull";

function SharedPreview() {
  const { id } = useParams();
  const { sharedUserProfile, isGettingSharedUserProfile } =
    useGetSharedProfile(id);

  return (
    <div className="md:bg-[#633CFF] md:h-[357px] md:pt-6 rounded-b-[32px] w-full ">
      {isGettingSharedUserProfile ? (
        <LoaderFull />
      ) : (
        <PreviewProfile user={sharedUserProfile} view="preview" />
      )}
    </div>
  );
}

export default SharedPreview;
