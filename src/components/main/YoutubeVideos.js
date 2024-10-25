import Image from "next/image";
import { useRef } from "react";
import right_left from "@/src/icons/arrow_left_shorts.svg";
import right_arrow from "@/src/icons/arrow_right_shorts.svg";
import AliceCarousel from "react-alice-carousel";

const responsive = {
  0: { items: 1 },
  500: { items: 2 },
  1280: { items: 3 },
};

const items = [
  {
    index: 0,
    link: "https://www.youtube.com/embed/Ra1YcrcYLzw",
    videoId: "Ra1YcrcYLzw",
  },
  {
    index: 1,
    link: "https://www.youtube.com/embed/6CM-R7ohmdA",
    videoId: "6CM-R7ohmdA",
  },
  {
    index: 2,
    link: "https://www.youtube.com/embed/n8OVDtf4RuY",
    videoId: "n8OVDtf4RuY",
  },
  {
    index: 3,
    link: "https://www.youtube.com/embed/IDpCpvmQ4ak",
    videoId: "IDpCpvmQ4ak",
  },
  {
    index: 4,
    link: "https://www.youtube.com/embed/Lm6pye0QwOQ",
    videoId: "Lm6pye0QwOQ",
  },
];

function Reels() {
  const carouselRef = useRef(null);

  const slidePrev = () => {
    carouselRef.current.slidePrev();
  };

  const slideNext = () => {
    carouselRef.current.slideNext();
  };

  return (
    <div id="target-element-2">
      <h2 className="my-h2 pb-[15px] lg:pb-[30px] text-center">Əl işlərimiz</h2>
      <div className="relative">
        {/* Left Arrow Button */}
        <button aria-label="prev">
          <Image
            onClick={slidePrev}
            className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md top-1/2 -translate-y-1/2"
            src={right_left}
            alt="right_arrow"
            unoptimized
          />
        </button>

        <AliceCarousel
          animationDuration={1300}
          animationType="slide"
          infinite
          mouseTracking
          items={[...items].reverse().map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between"
            >
              {/* <YouTubeVideo videoId={item.videoId} /> */}
              <iframe
                className="rounded-[25px] 
                w-[140px] h-[249px]
                screen360:w-[160px] screen360:h-[284px]
                screen390:w-[200px] screen390:h-[355px]
                sm:w-[170px] sm:h-[301px]
                md:w-[200px] md:h-[355px] 
                lg:w-[302px] lg:h-[537px]"
                width="302"
                height="537"
                src={item.link}
                title="YouTube video player"
                // frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          ))}
          responsive={responsive}
          controlsStrategy="responsive"
          animationEasingFunction="ease"
          disableButtonsControls
          ref={carouselRef}
        />

        {/* Right Arrow Button */}
        <button aria-label="next">
          <Image
            onClick={slideNext}
            className="absolute right-0 z-10 flex items-center justify-center  w-10 h-10 bg-white rounded-full shadow-md top-1/2 -translate-y-1/2"
            src={right_arrow}
            alt="right_arrow"
            unoptimized
          />
        </button>
      </div>
    </div>
  );
}

export default Reels;
