import { useParams } from "react-router-dom";
import PreviewProfile from "./PreviewProfile";

function SharedPreview() {
  const { id } = useParams();

  return (
    <div className="md:bg-[#633CFF] md:h-[357px] md:pt-6 rounded-b-[32px] w-full ">
      <PreviewProfile userId={id} view="preview" />
    </div>
  );
}

export default SharedPreview;
