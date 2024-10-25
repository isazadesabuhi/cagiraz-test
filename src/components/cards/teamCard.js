import Image from "next/image";
import Link from "next/link"

  import placeholder from "@/src/public/placeholder.webp";
  function TeamCard({name,position,email,number}) {
  return (
    <div className="flex flex-col gap-y-0 sm:gap-y-[2px] lg:gap-y-[4px]">
      <Image
        className="w-[140px] h-[140px] lg:w-[220px] lg:h-[220px] rounded-[20px] object-cover object-center"
        width={300}
        height={300}
        src={placeholder}
        alt={name}
        loading="lazy"
        unoptimized
      />
      <div>
        <p
          className="
        font-semibold lg:font-bold text-[14px] lg:text-[20px] leading-[16px] lg:leading-[30px] text-black500 pt-[5px]"
        >
          {name}
        </p>
      </div>
      <p
        className="w-[140px]  lg:w-[220px] 
      text-[#959595] font-semibold text-[12px] lg:text-[14px] leading-[18px] "
      >
        {position}
      </p>
      <div>
        <Link
          href={`mailto:${email}`}
          className="text-[#959595] text-[12px] lg:text-[14px] leading-[21px] lg:leading-[30px]"
        >
          {email}
        </Link>
        <p className="text-[#959595] text-[12px] lg:text-[14px] leading-[21px] lg:leading-[30px]">
          {number}
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
