import React, { useState, useRef } from "react";
import useOutsideClick from "@/src/components/others/UseOutsideClick";

const InputCustomized = ({
  label,
  type,
  inputTextId,
  updateInputText,
  typeMore,
  id,
}) => {
  // State variables and refs
  const [inputState, setInputState] = useState({ value: "", id: "" });
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Handle the input click to toggle state
  const handleClick = () => setIsClicked(!isClicked);

  // Handle the input change event
  const handleChange = (event) => {
    const { value } = event.target;
    setInputState({ value, id: inputTextId });

    if (typeof updateInputText === "function") {
      updateInputText(inputTextId, value);
    }
  };

  // Hook to detect outside click and update isClicked
  useOutsideClick(containerRef, () => setIsClicked(false));

  return (
    <div className="flex flex-col gap-y-[5px]" ref={containerRef}>
      {/* <p className="hidden lg:flex font-semibold text-[12px] leading-[18px] text-black500 pl-[15px]">
        {label}
      </p> */}
      <div className="inline-flex flex-col w-full">
        <div
          className={`flex flex-row items-center px-[15px] py-[15px] lg:px-[15px] lg:py-[12.5px] border ${
            isClicked ? "border-[#3598EA]" : "border-gray-300"
          } rounded-[10px] lg:rounded-full`}
          ref={inputRef}
        >
          {isClicked && (
            <label
              htmlFor="inpt"
              className="block lg:hidden absolute mt-[-45px] px-[10px] z-10 bg-white font-medium text-[8px] leading-[12px] text-cagiraz"
            >
              {label}
            </label>
          )}
          <input
            type={type}
            value={inputState.value}
            id={id}
            name="inpt"
            className="w-full font-semibold text-[12px] leading-[15px] text-black500 focus:outline-none focus:ring focus:ring-white border-none p-0 lg:hidden bg-white"
            placeholder={isClicked ? "" : `${label}`}
            onClick={handleClick}
            onChange={handleChange}
          />
          <input
            type={type}
            value={inputState.value}
            id={id}
            name="inpt"
            className="hidden lg:block w-full font-semibold text-[12px] leading-[15px] text-black500 focus:outline-none focus:ring focus:ring-white border-none p-0 bg-white"
            placeholder={isClicked ? "" : `${label}`}
            onClick={handleClick}
            onChange={handleChange}
          />
          <span
            className={`text-[12px] leading-[14px] ${
              typeMore === "money" ? "" : "hidden"
            }`}
          >
            AZN
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputCustomized;