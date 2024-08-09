import { getPlatformColor } from "../firebase/helpers";

function CreatedLink({ link, view }) {
  console.log(`${link.label}-icon.png`);
  return (
    <div
      className={` ${getPlatformColor(link.value)} flex items-center justify-between p-4  rounded-[8px]   ${view === "preview" ? "h-[56px] mb-[20px] w-full " : "h-[44px] w-[237px] mb-[14px] "}  `}
    >
      <div className="flex items-center gap-2 justify-center">
        <img src={`/${link.label}-icon.png`} alt={`${link.value}-icon`} />
        <p
          className={`${link.value === "Frontend Mentor" ? "text-[#333333]" : "text-white"}`}
        >
          {link.value}
        </p>
      </div>
      <div>
        <img src="/right-icon.png" />
      </div>
    </div>
  );
}

export default CreatedLink;
