import { useAppFeatures } from "../../contexts/AppFeaturesContext";
import Button from "../Button";
import EmptyLink from "./EmptyLink";
import Loader from "../Loader";

import LinkContainer from "./LinkContainer";

function Links() {
  const {
    handleAddLinkContainer,
    amtOfLinkContainer,
    handleUpdateLink,
    isSavingLinks,
  } = useAppFeatures();

  return (
    <main className="p-[24px] min-[1440px]:p-[40px] bg-white m-[16px] rounded-[8px] mb-[16px] max-w-[720px] md:m-auto md:mt-[24px] min-[1440px]:max-w-[808px] w-full ">
      <h1 className="font-bold text-[24px] leading-[36px] text-[#333333]">
        Customize your links
      </h1>
      <p className="text-[16px] font-normal leading-[24px] text-[#737373] mt-[8px]">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <button
        className="w-full py-[11px] px-[27px] border border-[#633CFF] text-[#633CFF] font-semibold text-[16px] rounded-[8px] mt-[40px] hover:bg-[#EFEBFF] transition-colors duration-300 ease-in-out"
        onClick={handleAddLinkContainer}
      >
        + Add new link
      </button>

      {amtOfLinkContainer?.length === 0 && <EmptyLink />}

      {amtOfLinkContainer?.length > 0 && (
        <form className="w-full" onSubmit={(e) => handleUpdateLink(e)}>
          <div className="max-h-[465px] min-[1440px]:flex flex-col overflow-y-auto border-b mt-[24px] w-full min-[1440px]:h-[509px]">
            {amtOfLinkContainer.map((container, index) => (
              <LinkContainer
                key={container.id}
                id={container.id}
                position={index + 1}
                container={container}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              className=" mt-[24px] text-white w-full min-[1440px]:max-w-[91px] flex items-center justify-center"
              isDisabled={isSavingLinks}
            >
              {isSavingLinks ? <Loader /> : "Save"}
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}

export default Links;
