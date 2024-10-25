import React, { useEffect, useState } from "react";
import Image from "next/image";
import placeholder from "@/src/public/placeholder.webp";
import { useRouter } from "next/router";
import star from "@/src/icons/star.svg";

import dynamic from "next/dynamic";
const AliceCarousel = dynamic(() => import("react-alice-carousel"), {
  ssr: false,
});

const responsive = {
  0: { items: 2 },
  640: { items: 3 },
  1300: { items: 4 },
};

function Reyler({ messages, reylerData }) {
  const [data, setData] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = (index) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [index]: !showFullDescription[index],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedData = reylerData.map((result) => ({
          name: result.providerName,
          star: result.star,
          description: result.description,
          imageUrl: result.imageUrl,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reylerData]);
  if (data.length === 0) {
    return null; // Don't render anything if the data array is empty
  }

  const childDataArray = Object.values(data).map((child, index) => ({
    jsxElement: (
      <div
        key={index}
        className="flex flex-row items-center justify-center py-[10px]"
      >
        <div
          className="flex flex-col w-[145px] screen360:w-[160px] screen375:w-[175px] screen412:w-[185px] sm:w-[195px] lg:w-[302px] relative
              rounded-[10px] lg:rounded-[20px]
              bg-white
              drop-shadow-cardAlt"
        >
          <div className="p-[10px] lg:p-[30px] space-y-[10px] lg:space-y-[15px]">
            {/* photo, name */}
            <div className="flex gap-x-[10px] lg:gap-x-[15px]">
              {child?.imageUrl ? (
                <Image
                  width={65}
                  height={65}
                  src={`https://api.cagir.az${child?.imageUrl}`}
                  alt={child.name}
                  title={child.name}
                  className="z-8 rounded-full w-[33px] lg:w-[65px] h-[33px] lg:h-[65px] ml-[3.5px] lg:ml-[7px] mt-[3.5px] lg:mt-[7px] object-cover object-center"
                  loading="lazy"
                  unoptimized
                />
              ) : (
                <Image
                  width={65}
                  height={65}
                  src={placeholder}
                  alt={child.name}
                  title={child.name}
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
                <span>{child.name}</span>
              </h4>
            </div>

            {/* rey */}
            <div className="overflow-hidden ">
              <div
                className="w-full italic font-semibold lg:font-bold text-[12px] lg:text-[14px] leading-[18px]
                  sm:leading-[19px] lg:leading-[21px] min-h-[60px] text-black100"
              >
                {showFullDescription[index]
                  ? child.description
                  : child.description.slice(0, 70)}

                {child.description.length > 70 ? (
                  <button
                    className="font-semibold block text-cagiraz"
                    onClick={() => toggleDescription(index)}
                  >
                    {showFullDescription[index] ? "Bağla" : "...Daha çox gör"}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* review stars */}
            <div className="rating rating-sm">
              {Array.from({ length: child.star }, (_, index) => (
                <Image
                  key={index}
                  src={star}
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
      </div>
    ),
  }));

  return (
    <div id="target-element-0">
      <h2 className="my-h2 mb-0 lg:mb-[15px] text-center">
        {messages["customer-comments"]}
      </h2>
      <div className="flex flex-row gap-x-[30px]">
        {data.length < 3 ? (
          childDataArray.map((child, index) => (
            <div key={index} className="flex flex-row gap-x-[5px]">
              {child.jsxElement}
            </div>
          ))
        ) : (
          <AliceCarousel
            animationDuration={1300}
            animationType="fadeout"
            autoPlayStrategy="action"
            controlsStrategy="responsive"
            infinite
            mouseTracking
            items={childDataArray.map((child, index) => (
              <div key={index} className="">
                {child.jsxElement}
              </div>
            ))}
            responsive={responsive}
            animationEasingFunction="ease"
            disableButtonsControls
            paddingLeft={0}
            paddingRight={0}
            keyboardNavigation
            touchTracking={true}
            touchMoveDefaultEvents={false}
          />
        )}
      </div>
    </div>
  );
}

export default Reyler;
