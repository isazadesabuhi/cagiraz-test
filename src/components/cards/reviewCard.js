import React, { useEffect, useState } from "react";
import Image from "next/image";
import placeholder from "@/src/public/placeholder.webp";
import starSvg from "@/src/icons/star.svg";

function ReviewCard({description,id,imageUrl,providerName,star}){
    const [showFullDescription, setShowFullDescription] = useState(false);
    const toggleDescription = (index) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [index]: !showFullDescription[index],
    }));
  };

    return(
        <div
          className="flex flex-col w-[145px] screen360:w-[160px] screen375:w-[175px] screen412:w-[185px] sm:w-[195px] lg:w-[302px] relative
              rounded-[10px] lg:rounded-[20px]
              bg-white
              drop-shadow-cardAlt"
        >
          <div className="p-[10px] lg:p-[30px] space-y-[10px] lg:space-y-[15px]">
            {/* photo, name */}
            <div className="flex gap-x-[10px] lg:gap-x-[15px]">
              {imageUrl ? (
                <Image
                  width={65}
                  height={65}
                  src={`https://api.cagir.az${imageUrl}`}
                  alt={providerName}
                  title={providerName}
                  className="z-8 rounded-full w-[33px] lg:w-[65px] h-[33px] lg:h-[65px] ml-[3.5px] lg:ml-[7px] mt-[3.5px] lg:mt-[7px] object-cover object-center"
                  loading="lazy"
                  unoptimized
                />
              ) : (
                <Image
                  width={65}
                  height={65}
                  src={placeholder}
                  alt={providerName}
                  title={providerName}
                  className="z-8 rounded-full w-[33px] lg:w-[65px] h-[33px] lg:h-[65px] ml-[3.5px] lg:ml-[7px] mt-[3.5px] lg:mt-[7px] object-cover object-center"
                  loading="lazy"
                  unoptimized
                />
              )}

              <div className="absolute z-[-5]">
                <div className="absolute rounded-full bg-bluebckg opacity-[15%] w-[33px] lg:w-[65px] h-[33px] lg:h-[65px] mt-0 ml-0"></div>
                <div className="absolute rounded-full bg-bluebckg opacity-[15%] w-[33px] lg:w-[65px] h-[33px] lg:h-[65px] mt-[3.5px] lg:mt-[7px] ml-[7px] lg:ml-[14px]"></div>
                <div className="absolute rounded-full bg-bluebckg opacity-[15%] w-[33px] lg:w-[65px] h-[33px] lg:h-[65px] ml-[1px] lg:ml-[2px] mt-[7px] lg:lg:mt-[14px]"></div>
              </div>

              <h4
                className="w-[80px]
                    font-semibold text-[12px] leading-[12px] 
                   lg:leading-[18px]
                    text-black500 mt-[2px] lg:mt-[18px]"
              >
                <span>{providerName}</span>
              </h4>
            </div>

            {/* rey */}
            <div className="overflow-hidden ">
              <div
                className="w-full italic font-semibold lg:font-bold text-[12px] lg:text-[14px] leading-[18px]
                  sm:leading-[19px] lg:leading-[21px] min-h-[60px] text-black100"
              >
                {showFullDescription[id]
                  ? description
                  : description.slice(0, 70)}

                {description.length > 70 ? (
                  <button
                    className="font-semibold block text-cagiraz"
                    onClick={() => toggleDescription(id)}
                  >
                    {showFullDescription[id] ? "Bağla" : "...Daha çox gör"}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* review stars */}
            <div className="rating rating-sm">
              {Array.from({ length: star }, (_, index) => (
                <Image
                  key={index}
                  src={starSvg}
                  alt="star_icon"
                  width={14}
                  height={13}
                  className="text-[#FFC300] pl-[1px]"
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>
    )
}

export default ReviewCard