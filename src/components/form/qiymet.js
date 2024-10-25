import React from "react";

const Qiymet = ({ priceBeforePromo, messages, criteriaDesc }) => {
  return (
    <>
      <div className="rounded-[10px] bg-cagiraz px-[15px] py-[20px]">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[16px] leading-[24px] text-white">
            {messages.amount}
          </p>
          <p className="font-bold text-[26px] leading-[39px] text-white">
            {priceBeforePromo} AZN
          </p>
        </div>
        {typeof criteriaDesc !== "undefined" ? (
          <div
            className={criteriaDesc ? "border-t-2 border-solid border-[#1773BF] pt-[10px]" : "hidden"}
            dangerouslySetInnerHTML={{
              __html: `${criteriaDesc}`
                ?.replaceAll(
                  "<ul>",
                  '<ul class="text-[12px] list-disc list-inside py-[3px] mt-[3px] mb-[7px] text-white">'
                )
                .replaceAll(
                  "<p",
                  '<p class="text-[12px] leading-[22px] text-white"'
                ),
            }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Qiymet;