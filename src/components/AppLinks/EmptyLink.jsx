import Button from "../Button";

function EmptyLink() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-[46px] px-[20px] mt-[24px] bg-[#FAFAFA] w-full rounded-[8px] min-[1440px]:h-[490px]">
        <div>
          <img
            src="/illustration-empty.svg"
            alt="empty icon"
            className="w-[124px]"
          />
        </div>
        <h1 className="mt-[24px] text-[#333333] font-bold text-[24px] leading-[36px]">
          Let’s get you started
        </h1>
        <p className="mt-[24px] text-[#737373] font-[400] text-[16px] leading-[24px]">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>

      <hr className="border-t-3 border-[#FAFAFA] my-4" />

      <div className="flex justify-end">
        <Button
          onClick={() => ""}
          className="opacity-[25%] w-full mt-[40px] text-white min-[1440px]:max-w-[91px] "
          isDisabled={true}
        >
          Save
        </Button>
      </div>
    </>
  );
}

export default EmptyLink;
