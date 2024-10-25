import React, { useState } from "react";

const SearchInput = ({messages}) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleDelete = () => {
    setInputValue("");
  };

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      className={`flex flex-row justify-between items-center px-[12px] py-[8.5px] rounded-[10px] border
      ${isClicked ? "border-cagiraz" : "border-gray900"}  
      mt-[15px] mb-[30px]`}
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
      <input
        className="w-full rounded border-none text-left text-sm leading-none text-gray-600 outline-none
          focus:outline-none focus:ring-white px-[10px] bg-white"
        type="text"
        placeholder={messages.search}
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue.length > 0 && (
        <div onClick={handleDelete} className="">
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 6C4.63261 6 4.75979 6.05268 4.85355 6.14645C4.94732 6.24021 5 6.36739 5 6.5V12.5C5 12.6326 4.94732 12.7598 4.85355 12.8536C4.75979 12.9473 4.63261 13 4.5 13C4.36739 13 4.24021 12.9473 4.14645 12.8536C4.05268 12.7598 4 12.6326 4 12.5V6.5C4 6.36739 4.05268 6.24021 4.14645 6.14645C4.24021 6.05268 4.36739 6 4.5 6ZM7 6C7.13261 6 7.25979 6.05268 7.35355 6.14645C7.44732 6.24021 7.5 6.36739 7.5 6.5V12.5C7.5 12.6326 7.44732 12.7598 7.35355 12.8536C7.25979 12.9473 7.13261 13 7 13C6.86739 13 6.74021 12.9473 6.64645 12.8536C6.55268 12.7598 6.5 12.6326 6.5 12.5V6.5C6.5 6.36739 6.55268 6.24021 6.64645 6.14645C6.74021 6.05268 6.86739 6 7 6ZM10 6.5C10 6.36739 9.94732 6.24021 9.85355 6.14645C9.75979 6.05268 9.63261 6 9.5 6C9.36739 6 9.24021 6.05268 9.14645 6.14645C9.05268 6.24021 9 6.36739 9 6.5V12.5C9 12.6326 9.05268 12.7598 9.14645 12.8536C9.24021 12.9473 9.36739 13 9.5 13C9.63261 13 9.75979 12.9473 9.85355 12.8536C9.94732 12.7598 10 12.6326 10 12.5V6.5Z"
              fill="#F64242"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.5 3.5C13.5 3.76522 13.3946 4.01957 13.2071 4.20711C13.0196 4.39464 12.7652 4.5 12.5 4.5H12V13.5C12 14.0304 11.7893 14.5391 11.4142 14.9142C11.0391 15.2893 10.5304 15.5 10 15.5H4C3.46957 15.5 2.96086 15.2893 2.58579 14.9142C2.21071 14.5391 2 14.0304 2 13.5V4.5H1.5C1.23478 4.5 0.98043 4.39464 0.792893 4.20711C0.605357 4.01957 0.5 3.76522 0.5 3.5V2.5C0.5 2.23478 0.605357 1.98043 0.792893 1.79289C0.98043 1.60536 1.23478 1.5 1.5 1.5H5C5 1.23478 5.10536 0.98043 5.29289 0.792893C5.48043 0.605357 5.73478 0.5 6 0.5H8C8.26522 0.5 8.51957 0.605357 8.70711 0.792893C8.89464 0.98043 9 1.23478 9 1.5H12.5C12.7652 1.5 13.0196 1.60536 13.2071 1.79289C13.3946 1.98043 13.5 2.23478 13.5 2.5V3.5ZM3.118 4.5L3 4.559V13.5C3 13.7652 3.10536 14.0196 3.29289 14.2071C3.48043 14.3946 3.73478 14.5 4 14.5H10C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V4.559L10.882 4.5H3.118ZM1.5 3.5V2.5H12.5V3.5H1.5Z"
              fill="#F64242"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
