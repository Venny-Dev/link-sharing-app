import Select, { components } from "react-select";

export const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center">
        <img src={props.data.icon} alt={props.data.label} className=" mr-2" />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

export const CustomSingleValue = (props) => (
  <components.SingleValue {...props}>
    <div className="flex items-center font-normal text-[16px] text-[#333333]">
      <img src={props.data.icon} alt={props.data.label} className=" mr-2" />
      {props.data.label}
    </div>
  </components.SingleValue>
);

export const customStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    borderColor: "#ddd",
    boxShadow: "none",
    padding: "4px 2px",
    backgroundColor: "#fff",
    "&:hover": {
      borderColor: "#aaa",
    },
  }),
  menu: (provided) => ({
    ...provided,
    height: "215px",
    overflowY: "auto",
  }),
};

// function Dropdown({ id, value }) {
//   const { options, arrangedUpdatedData, setAmtOfLinkContainer } =
//     useAppFeatures();
//   const [selectedOption, setSelectedOption] = useState(options[0]);

//   function handleChange(selected) {
//     setSelectedOption(selected);
//     // setUpdatedLink((prevLink) => [prevLink, { ...selected, id }]);
//     // handleAddLinkContainer(selected);
//     // console.log(selected);

//     arrangedUpdatedData(selected, id);
//   }

//   return (
//     <Select
//       value={selectedOption}
//       onChange={handleChange}
//       options={options}
//       components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
//       styles={customStyles}
//     />
//   );
// }

// export default Dropdown;
