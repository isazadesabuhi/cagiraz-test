import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const DatePicker = dynamic(() => import("react-datepicker"), {
  ssr: false,
});
import { registerLocale } from "react-datepicker";
import az from "date-fns/locale/az";
import date from "@/src/icons/form/date.svg";
registerLocale("az", az);
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ onInputValueChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setIsFocused(false); // Ensure focus state is false when clicked
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    // You can perform other logic here if needed
  };

  const handleOutsideClick = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsClicked(false);
      setIsFocused(false);
    }
  };

  useEffect(() => {
    // Add an event listener to handle clicks outside the input
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (startDate) {
      const dateFormatted = `${startDate.getDate()}/${
        startDate.getMonth() + 1
      }/${startDate.getFullYear()}`;
      setInputValue(dateFormatted);
    }
  }, [startDate]);

  useEffect(() => {
    if (inputValue) {
      onInputValueChange(inputValue);
    }
  }, [inputValue]);

  return (
    <div
      className={`h-[40px] relative flex flex-row justify-between items-center px-[15px] border ${
        isClicked || isFocused ? "border-[#3598EA]" : "border-gray-300"
      } rounded-[10px] lg:rounded-full`}
      ref={inputRef}
      onClick={handleClick}
    >
      <DatePicker
        locale="az"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        placeholderText="Tarixi seç"
        // readOnly
        customInput={
          <input
            type="text"
            className="xs:w-[280px] screen360:w-[px] 
            screen375:w-[335px]
            screen390:w-[350px]
            screen412:w-[372px]
            screen428:w-[388px]
            sm:w-[600px]
            lg:w-[300px] 
            
            font-semibold text-[12px] leading-[15px] text-black500 focus:outline-none focus:ring focus:ring-white border-none bg-white"
            value={inputValue}
            onChange={handleChange}
            readOnly="readOnly"
          />
        }
      />
      <Image
        className="absolute right-[15px] w-[14px] h-[14px] "
        alt="date_icon"
        src={date}
        loading="lazy"
        unoptimized
      />
    </div>
  );
};

export default Calendar;
