import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import show_pswrd from "@/src/icons/show_pswrd.svg";
import close_pswrd from "@/src/icons/close_pswrd.svg";
const InputPassword = ({ label, onPasswordChange, changePswrdClasses }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (typeof onPasswordChange === "function") {
      // Invoke the callback function whenever the password changes
      onPasswordChange(password);
    }
  }, [password, onPasswordChange]);

  return (
    <div className="flex flex-col gap-y-[5px]">
      <p className="hidden lg:block font-semibold text-[12px] leading-[18px] text-black500 pl-[15px]">
        {label}
      </p>
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="inpt"
            name="inpt"
            className="hidden lg:block  w-full font-semibold text-[12px] leading-[15px] text-black500 focus:outline-none focus:ring focus:ring-white border-none p-0 bg-white"
            placeholder={isClicked ? "" : ""}
            onClick={handleClick}
          />

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="inpt"
            name="inpt"
            className="block lg:hidden w-full font-semibold text-[12px] leading-[15px] text-black500 focus:outline-none focus:ring focus:ring-white border-none p-0 bg-white"
            placeholder={isClicked ? "" : label}
            onClick={handleClick}
          />
          <Image
            alt={showPassword ? "Hide" : "Show"}
            src={showPassword ? close_pswrd : show_pswrd}
            onClick={togglePasswordVisibility}
            className="w-[16px] h-[16px]"
            loading="lazy"
            unoptimized
          />
        </div>
      </div>
      {/* Parolu deyis */}
      <div className={`${changePswrdClasses}`}>
        <p className="font-semibold text-[14px] leading-[21px] text-cagiraz">
          Parolu dəyiş
        </p>
      </div>
    </div>
  );
};

export default InputPassword;
