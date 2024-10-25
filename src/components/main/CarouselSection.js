import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SifarishBtn from "@/src/components/buttons/sifarishBtn";
import SocialNetworks from "@/src/components/others/SocialNetworks";
import SearchInput from "@/src/components/input/inputSearchSm";

export default function Carousel1({ messages, carouselPhotos }) {
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % carouselPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentSlide, carouselPhotos.length]);

  function insertLineBreakAtComma(text) {
    return text.split(",").map((part, index) =>
      index === 0 ? (
        part + ","
      ) : (
        <>
          <br />
          {part}
        </>
      )
    );
  }
  return (
    <div className="flex flex-col justify-between lg:gap-x-[25px] xl:gap-x-[45px] 2xl:gap-x-[75px] lg:flex-row">
      {/* first part of carousel section */}
      <div className="flex flex-col justify-between w-full lg:w-3/5 ">
        <div className="flex flex-col gap-y-[10px] lg:gap-x-0 mt-[-15px] lg:mt-0 pb-[10px]">
          <h1 className="hidden lg:flex flex-col my-h1 text-black500 mx-0 lg:w-full text-center lg:text-left">
            {/* {messages["slider-part-2"]} */}
            {insertLineBreakAtComma(messages["slider-part-2"])}
          </h1>
          <p
            className="hidden lg:flex flex-col text-[12px] lg:leading-[22px] 
          lg:tracking-[0.02em] text-[#595959] w-full  screen428:w-[300px] lg:w-[300px] xl:w-[380px] 
          2xl:w-[411px] lg:pt-[20px] 2xl:pt-[30px]"
          >
            {messages["hero-text"]}
          </p>
        </div>

        {/* search button */}
        <Link href="/axtaris" className="block lg:hidden">
          <SearchInput {...{ messages }} />
        </Link>

        {/* sifaris button-for desktop */}
        <SifarishBtn
          {...{ messages }}
          classNames="hidden lg:block pt-[10px] xl:pt-0"
        />

        <div className="hidden lg:block space-y-[10px]">
          <p className="font-semibold non-italic tracking-[0.02em] text-[14px] leading-[22px] text-black500">
            {messages["follow-us"]}
            {/* Biz sosial şəbəkələrdə */}
          </p>
          {/* Sosial sebekeler insta, fb, linkedin */}
          <SocialNetworks classNames="flex flex-row space-x-[20px]" />
        </div>
      </div>

      {/* carousel part */}
      <div className="w-full h-full">
        <div
          id="default-carousel"
          className="relative overflow-hidden rounded-lg w-full aspect-[821/438] lg:w-[643.88px] lg:h-[343.5px] xl:w-[821px] xl:h-[438px]"
          data-carousel="slide"
        >
          {carouselPhotos.map(({ imageUrl, orderIndex }, index) => (
            <div
              key={orderIndex}
              className={`absolute w-full aspect-[821/438] lg:w-[643.88px] lg:h-[343.5px] xl:w-[790px] xl:h-[421px] ${
                orderIndex === currentSlide
                  ? "slide-enter-active"
                  : "slide-exit-active"
              }`}
            >
              <Image
                fill
                src={`https://api.cagir.az${imageUrl}`}
                alt={`carousel image-${index}`}
                className="w-full aspect-[821/438] lg:w-[643.88px] lg:h-[343.5px] xl:w-[821px] xl:h-[438px]"
                priority={true}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
