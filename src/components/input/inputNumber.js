import React, { useState, useRef } from "react";
import useOutsideClick from "@/src/components/others/UseOutsideClick";

const MAX_PHONE_LENGTH = 10;
const phonePrefixes = [
  "+50",
  "+51",
  "+55",
  "+70",
  "+77",
  "+90",
  "+99",
  "+10",
  "+65",
];
const INITIAL_PHONE_PREFIX = phonePrefixes[0];

const InputNumber = ({ label }) => {
  const inputRef = useRef(null);
  const outsideClickRef = useRef(null);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [phonePrefix] = useState(INITIAL_PHONE_PREFIX);

  const toggleInputFocus = () => setIsInputFocused(!isInputFocused);

  useOutsideClick(outsideClickRef, () => setIsInputFocused(false));

  const handleInputChange = (e) => {
    // If backspace is pressed and the cursor is right after a dash, skip over the dash.
    if (
      e.nativeEvent.inputType === "deleteContentBackward" &&
      e.target.value[e.target.selectionStart - 1] === "-"
    ) {
      e.target.selectionStart--;
      e.target.selectionEnd--;
    }

    const formattedValue = formatInputValue(e.target.value);
    setInputValue(formattedValue);
  };

  const formatInputValue = (value) => {
    let onlyNumbers = value.replace(/[^0-9]/g, "").slice(0, MAX_PHONE_LENGTH);

    let sections = [];

    if (onlyNumbers.length > 0) sections.push(onlyNumbers.slice(0, 3));
    if (onlyNumbers.length > 3) sections.push(onlyNumbers.slice(3, 6));
    if (onlyNumbers.length > 6) sections.push(onlyNumbers.slice(6, 8));
    if (onlyNumbers.length > 8) sections.push(onlyNumbers.slice(8, 10));

    return sections.join("-");
  };

  return (
    <div className="flex flex-col gap-y-[5px]">
      <p className="hidden lg:block font-semibold text-[12px] leading-[18px] text-black500 pl-[15px]">
        {label}
      </p>
      <div ref={outsideClickRef} className="inline-flex flex-col w-full">
        <div
          className={`flex flex-row items-center px-[15px] py-[15px] lg:py-[12.5px] border ${
            isInputFocused ? "border-blue-600" : "border-gray-300"
          } rounded-[10px] lg:rounded-full`}
          ref={inputRef}
        >
          {isInputFocused && (
            <label
              htmlFor="input"
              className="block lg:hidden absolute mt-[-45px] px-[10px] z-10 bg-white font-medium text-[8px] leading-[12px] text-cagiraz"
            >
              {label}
            </label>
          )}
          <input
            ref={inputRef}
            className="w-full font-semibold text-[12px] leading-[15px] text-black500 focus:outline-none p-0 lg:hidden bg-white"
            minLength="7"
            type="text"
            placeholder={!isInputFocused ? label : ""}
            aria-label="Phone Number"
            value={inputValue}
            onChange={handleInputChange}
            onClick={toggleInputFocus}
          />
          <input
            ref={inputRef}
            className="hidden lg:block w-full font-semibold text-[12px] leading-[15px] text-black500 focus:outline-none p-0 bg-white"
            minLength="7"
            type="text"
            placeholder={!isInputFocused ? "(0xx)-xxx-xx-xx" : ""}
            aria-label="Phone Number"
            value={inputValue}
            onChange={handleInputChange}
            onClick={toggleInputFocus}
          />
        </div>
      </div>
    </div>
  );
};

export default InputNumber;
