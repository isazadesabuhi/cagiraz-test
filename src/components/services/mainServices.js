import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "@/src/icons/arrow.svg";
import arrow_mobile from "@/src/icons/arrow_mobile.svg";

const ServiceItem = ({ id, imageUrl, nameUrl, serviceNames }) => (
  <li key={id}>
    <Link href={`/${serviceNames?.[0].titleUrl}`} passHref>
      <div className="block rounded-[10px] lg:rounded-[25px] bg-white p-[11px] lg:p-[26px] group hover:drop-shadow-card transition duration-300">
        <div className="relative mb-[5px] lg:mb-[15px]">
          {imageUrl ? (
            <Image
              priority={true}
              src={`https://api.cagir.az${imageUrl}`}
              alt={nameUrl}
              title={serviceNames[0].name}
              width={367}
              height={283}
              unoptimized
              className="rounded-[5px] sm:rounded-[20px] w-full aspect-[123/96] object-cover object-center"
              sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 30vw"
            />
          ) : (
            <div className="rounded-[5px] sm:rounded-[20px] w-full aspect-[123/96] object-cover object-center"></div>
          )}
        </div>
        {serviceNames.map(({ name }, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between"
          >
            <h3 className="font-bold text-[14px] lg:text-[20px] leading-[21px] lg:leading-[30px] text-black500">
              {name}
            </h3>
            <div className="lg:hidden group-hover:block transition duration-300">
              <Image
                src={arrow}
                alt="arrow_icon"
                title="arrow_icon"
                className="hidden lg:block"
                loading="lazy"
                unoptimized
              />
              <Image
                src={arrow_mobile}
                alt="arrow_mobile_icon"
                title="arrow_mobile_icon"
                className="block lg:hidden"
                loading="lazy"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </Link>
  </li>
);

const Xidmetler = ({ getAllForFront, messages, chosenLang }) => {
  return (
    <div>
      <h1 className="my-h2 mb-[15px] lg:mb-[30px] text-center">
        {messages.services}
      </h1>
      
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] lg:gap-[60px] px-[10px] justify-between">
        {getAllForFront.slice(0, 6).map(ServiceItem)}
      </ul>
      <div className="flex items-center justify-center max-w-[155px] mx-auto rounded-[25px] mt-[15px] lg:mt-[30px]">
        <Link
          href="/xidmetler"
          className="bg-white rounded-[30px] py-[10px] px-[26px] border-[2px] border-cagiraz 
                 font-extrabold text-cagiraz text-[14px] leading-[21px] 
                 transition duration-400 transform hover:-translate-y-[5px] whitespace-nowrap"
        >
          {messages["all-services"]}
        </Link>
      </div>
    </div>
  );
};

export default Xidmetler;
