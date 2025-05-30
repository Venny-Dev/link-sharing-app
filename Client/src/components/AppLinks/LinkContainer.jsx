import { useEffect, useState } from "react";
import { useAppFeatures } from "../../contexts/AppFeaturesContext";

import Select from "react-select";
import {
  CustomOption,
  CustomSingleValue,
  customStyles,
} from "./DropdownStyles";

function LinkContainer({ id, position, container }) {
  const {
    options,
    handleRemoveLinkContainer,
    handlePlatformChange,
    errorId,
    handleInputChange,
  } = useAppFeatures();

  const [platformAndLink, setPlatformAndLink] = useState({
    selectedPlatform: options[0],
    userLink: container.link,
  });

  useEffect(() => {
    if (container.value) {
      const matchedOption = options.find(
        (option) => option.value === container.value
      );

      if (matchedOption) {
        setPlatformAndLink((prevPlatformAndLink) => ({
          ...prevPlatformAndLink,
          selectedPlatform: matchedOption,
        }));
      }
    }
  }, [container.value, options]);

  function handleSelectChange(selected) {
    setPlatformAndLink((prevPlatformAndLink) => ({
      ...prevPlatformAndLink,
      selectedPlatform: selected,
    }));
    handlePlatformChange(selected, id);
  }

  return (
    <div className="bg-[#FAFAFA] p-[20px] rounded-[8px]   mb-3 w-full">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <img src="/equals-icon.png" />
          <p className="font-bold text-[16px] leading-[24px] text-[#737373]">
            Link #{position}
          </p>
        </div>
        <button
          className="font-normal text-[16px] leading-[24px] text-[#737373]"
          onClick={() => handleRemoveLinkContainer(id)}
        >
          Remove
        </button>
      </div>

      <div className="w-full mt-3">
        <p className="text-[#333333] font-[400] text-[12px] leading-[18px]">
          Platform
        </p>
        <Select
          value={platformAndLink.selectedPlatform}
          onChange={handleSelectChange}
          options={options}
          components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
          styles={customStyles}
        />
      </div>

      <div className="flex flex-col relative mt-3 w-full">
        <label className="text-[#333333] font-[400] text-[12px] leading-[18px]">
          Link
        </label>
        <input
          type="text"
          className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%]   focus:outline-none focus:border-[#633CFF] focus:shadow-xl ${
            errorId.some((errid) => errid.id === id) ? "border-[#FF3939]" : ""
          }`}
          placeholder="e.g. github.com/examplename"
          value={platformAndLink.userLink}
          onChange={(e) => handleInputChange(e, setPlatformAndLink, id)}
        />
        <img src="/linkblack-icon.png" className="absolute top-[40px] left-3" />
        {errorId.map(
          (errid) =>
            errid.id === id && (
              <p
                className="text-[#FF3939] font-normal text-[12px] leading-[18px] absolute right-1 bottom-0"
                key={id}
              >
                cannot be empty
              </p>
            )
        )}
      </div>
    </div>
  );
}

export default LinkContainer;
