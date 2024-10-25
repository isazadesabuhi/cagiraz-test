import React from "react";
import Image from "next/image";
import memnuniyyet from "@/src/icons/deyerler/memnuniyyet.svg";
import kefiyyet from "@/src/icons/deyerler/kefiyyet.svg";
import pesekar from "@/src/icons/deyerler/pesekar.svg";
import qenaet from "@/src/icons/deyerler/qenaet.svg";

function Deyerler({ messages, chosenLang,deyerlerMainPage }) {
  return (
    <div>
      <h2 className="my-h2 mb-[15px] lg:mb-[60px] text-center">
        {messages["our-values"]}
      </h2>
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-x-[10px] sm:gap-x-[40px] md:gap-x-[70px] lg:gap-x-[100px] xl:gap-x-[130px] 2xl:gap-x-[156px] 
            gap-y-[15px]"
      >
        {deyerlerMainPage.map(({ index, title, text, imageUrl, id }) => (
          <div key={id}>
            <div className="flex flex-col">
              <div className="flex justify-center items-center w-[30px] lg:w-[60px] h-[30px] lg:h-[60px] mb-[15px] lg:mb-[30px]">
                <Image
                  src={
                    id === 37
                      ? pesekar
                      : id === 31
                      ? qenaet
                      : id === 34
                      ? memnuniyyet
                      : kefiyyet
                  }
                  alt={title}
                  title={title}
                  className=""
                  width={200}
                  height={200}
                  loading="lazy"
                  unoptimized
                />
              </div>

              <h5 className="mb-[5px] my-h5 text-black">{title}</h5>

              <p className="font-medium lg:font-semibold text-[12px] lg:text-[14px] leading-[12px] sm:leading-[15px] md:leading-[18px] lg:leading-[21px] text-gray900">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deyerler;