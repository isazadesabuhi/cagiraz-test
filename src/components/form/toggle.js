import React from "react";
const Toggle = ({
  descMain,
  selectedMain,
  descSub,
  selectedSub,
  descSub2,
  selectedSub2,
}) => {
  const toggleInfos = {
    0: {
      description: descMain,
      serviceName: selectedMain,
    },
    1: {
      description: descSub,
      serviceName: selectedSub,
    },
    2: {
      description: descSub2,
      serviceName: selectedSub2,
    },
  };

  return (
    <div>
      {Object.keys(toggleInfos)
      .filter((index) => window.innerWidth >= 1020 || index === '1')
      .map((index) => {
        const description = toggleInfos[index].description;
        const serviceName = toggleInfos[index].serviceName;
        if (!description) {
          // If the description is null or empty, skip rendering this item
          return null;
        }
        return (
          <div key={index} className="pb-[40px] divide-y">
            <button
              id={`target-element-${index}`}
              className={`flex flex-row justify-between items-center w-full`}
            >
              <h6 className={`font-bold text-[14px] leading-[21px] text-cagiraz`}>
                {serviceName} haqda təsvir
              </h6>
            </button>

            <div
              className={`relative  over bg-white py-2 rounded mt-2 text-[14px] leading-[18px]`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: description
                    .replaceAll(
                      "<ul>",
                      '<ul class="list-disc list-inside py-[3px] mt-[3px] mb-[7px] text-black">'
                    )
                    .replaceAll("<p", '<p class="leading-[22px] text-black "')
                    .replaceAll("<a", "<a class='text-cagiraz '"),
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Toggle;