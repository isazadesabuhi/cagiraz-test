import Image from "next/image";

import placeholder from "@/public/placeholder.webp";

  function ContactTeamCard({name,position,email}) {
  return (
    <div className="flex flex-col gap-y-0 sm:gap-y-[2px] lg:gap-y-[4px]">
      <Image
        className="w-[98px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[220px] lg:h-[220px] rounded-[20px] object-cover object-center"
        width={300}
        height={300}
        src={placeholder}
        alt="placeholder"
        loading="lazy"
        unoptimized
      />
      <div>
        <p className="font-semibold lg:font-bold text-[14px] lg:text-[20px] leading-[16px] lg:leading-[30px] text-black500">
          {name}
        </p>
      </div>
      <p className="text-[#959595] font-semibold text-[12px] lg:text-[14px] leading-[18px] ">
        {position}
      </p>
      <p className="text-[#959595] text-[12px] lg:text-[14px] leading-[21px] lg:leading-[30px]">
        {email}
      </p>
    </div>
  );
}

export default ContactTeamCard;
