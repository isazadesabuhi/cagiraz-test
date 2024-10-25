import React, { useState, useRef } from "react";
import useOutsideClick from "@/src/components/others/UseOutsideClick";

const SearchInputMd = ({
  onChange,
  value,
  sendDataToParent,
  messages,
  chosenLang,
  whichPage,
}) => {
  // State variables
  const [inputValue, setInputValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  // Hooks and Utilities
  const outsideClickRef = useRef(null);
  useOutsideClick(outsideClickRef, () => setIsClicked(false));

  // Event Handlers
  const handleClick = () => setIsClicked(!isClicked);

  const handleDelete = () => {
    setInputValue(value);
    setDeleteBtnClicked(inputValue.length > 0);
  };

  return (
    <div
      ref={outsideClickRef}
      className={`flex flex-row w-full sm:w-2/3 lg:w-1/3 justify-between items-center px-[12px] lg:px-[10px] py-[12px] lg:py-[15px] rounded-[10px] lg:rounded-[50px] border ${
        isClicked ? "border-cagiraz" : "border-[#595959]"
      }`}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="#959595"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
      {whichPage === "search" ? (
        <input
          className="w-full rounded border-none text-left text-[12px] font-semibold leading-normal text-black500 outline-none focus:outline-none focus:ring-white px-[10px] bg-white"
          type="text"
          autoFocus
          placeholder={messages.search}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className="w-full rounded border-none text-left text-[12px] font-semibold leading-normal text-black500 outline-none focus:outline-none focus:ring-white px-[10px] bg-white"
          type="text"
          placeholder={messages.search}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default SearchInputMd;
