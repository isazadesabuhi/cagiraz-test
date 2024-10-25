import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import up from "@/src/icons/form/up.svg";
import down from "@/src/icons/form/down.svg";

function FaqComponent({ question, answer, isActive, faqId, id }) {
  const [clickedItems, setClickedItems] = useState({});

  const faqIsClicked = (id) => {
    setClickedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the clicked state
    }));
  };

  return (
    <div>
      <summary
        onClick={() => faqIsClicked(id)}
        className="flex items-center gap-x-[10px] rounded-lg cursor-pointer"
      >
        <h5 className="my-h5 text-black">{question}</h5>
        {clickedItems[id] === true ? (
          <Image src={up} alt="upicon" loading="lazy" unoptimized />
        ) : (
          <Image src={down} alt="downicon" loading="lazy" unoptimized />
        )}
      </summary>
      <Transition
        show={clickedItems[id] === true ? clickedItems[id] : false}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 translate-y-[-20px] scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transform duration-[300ms] transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <p
          className="mt-[5px] lg:mt-[2px] mb-[15px] lg:mb-[20px] font-normal lg:font-semibold
            text-[12px] lg:text-[14px] leading-[18px] lg:leading-[21px] text-gray900"
        >
          {answer}
        </p>
      </Transition>
    </div>
  );
}

export default FaqComponent;
