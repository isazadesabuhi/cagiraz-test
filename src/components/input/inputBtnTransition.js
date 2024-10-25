import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";

import paper_plane from "@/src/icons/footer/paper_plane.svg";

const InputBtnTransition = ({ name, classNames }) => {
  const [isRotated, setIsRotated] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidEmailText, setIsValidEmailText] = useState(false);

  const validateEmail = (input) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(input);
  };

  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);

    if (!validateEmail(input)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const handleButtonClick = () => {
    setIsRotated(true);

    setTimeout(() => {
      setIsRotated(false);
    }, 1000); // Adjust the duration as per your requirement
  };

  useEffect(() => {
    if (email.length > 0) {
      if (isRotated && !isValidEmail) {
        setIsValidEmailText(true);
        setIsRotated(false);
      }
    } else {
      setIsValidEmailText(false);
      setIsRotated(false);
    }
  }, [email, isRotated, isValidEmail]);

  return (
    <div className="flex justify-center">
      <ul className="space-y-[10px] lg:space-y-[15px] font-semibold text-[14px] leading-[21px] text-black500">
        <li className={`mb-[5px] ${classNames}`}>
          <div href="#" className="">
            {name}
          </div>
        </li>
        <li className="w-[235px] h-[58px] bg-white rounded-full flex items-center border">
          <div className="flex items-center h-[46px]">
            <input
              className={`appearance-none bg-transparent border-none text-black focus:outline-none text-[14px] 
                  pl-[10px] pr-[6px] ml-[2px] leading-[21px] w-[181px] bg-white ${
                    !isValidEmail ? "border-red-500" : ""
                  }`}
              type="text"
              placeholder=""
              aria-label="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              id="myButton"
              className="flex w-[46px] h-[46px] rounded-full bg-gradient-to-r from-[#3598EA] to-[#3D55DF] "
              type="button"
              onClick={handleButtonClick}
            >
              <Transition
                show={!isRotated}
                enter="transition ease-in-out duration-1000 transform"
                enterFrom="translate-x-45"
                enterTo="translate-x-45"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0 -rotate-45"
                leaveTo="translate-x-full -rotate-45 opacity-0"
              >
                <Image
                  id="myImage"
                  className="mt-[14px] ml-[13px] w-[20px] h-[17.44] transform"
                  src={paper_plane}
                  alt="paper plane icon"
                  loading="lazy"
                  unoptimized
                />
              </Transition>
            </button>
          </div>
        </li>
        <li
          className={`text-red-500 text-sm w-[220px] ${
            isValidEmailText ? "" : "hidden"
          }`}
        >
          Zəhmət olmasa uyğun emaili daxil edin.
        </li>
      </ul>
    </div>
  );
};

export default InputBtnTransition;
