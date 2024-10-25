import SvgIcon from "@/src/components/svgIcon"

const desktopBadges = [
  {
    src: <SvgIcon name="messages" />,
    text: "Müştərilər",
    class: "#FFFAD2",
  },
  {
    src: <SvgIcon name="profile" />,
    text: "İcraçılar",
    class: "#DFF3FF",
  },
  {
    index: 2,
    src: <SvgIcon name="play" />,
    text: "Əl işlərimiz",
    class: "#FFDADA",
  },
];

const scrollToTarget = (index) => {
  const target = document.getElementById(`target-element-${index}`);
  if (target) {
    // Get the position of the target element
    const targetPosition = target.getBoundingClientRect().top;

    // Get the current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Check the screen width and set navbarHeight accordingly
    const navbarHeight = window.innerWidth < 1020 ? 42 : 120;

    // Calculate the position to scroll to (taking into account the navbar height)
    const positionToScroll = scrollTop + targetPosition - navbarHeight;

    // Smooth scroll to the calculated position
    window.scrollTo({ top: positionToScroll, behavior: "smooth" });
  }
};

const Badge = () => (
  <div className="hidden xs:block pt-[20px]">
    {/* gap-x-[137px] xl:gap-x-[164px] 2xl:gap-x-[190px] */}
    <div className="flex justify-between">
      {desktopBadges.map((badge, index) => (
        <div key={index} className="">
          <button
            onClick={() => {
              if (index === 2) scrollToTarget(index + "-lazy");
              scrollToTarget(index);
            }}
            className={`flex flex-row items-center justify-center rounded-[10px]
           w-[98px] h-[33px]
           screen360:w-[110px] screen360:h-[40px]    
           screen412:w-[125px] screen412:h-[45px]
           screen428:w-[130px] screen428:h-[55px]
           sm:w-[200px] sm:h-[85px] 
          lg:w-[280px] lg:h-[120px] 
           gap-x-[7px] screen428:gap-x-[12px] sm:gap-x-[15px]
          bg-white
          border-[1px] border-[#D2D2D2]
          lg:border-none
           
           ${
             index === 0
               ? "lg:bg-[#FFFAD2]"
               : index === 1
               ? "lg:bg-[#DFF3FF]"
               : "lg:bg-[#FFDADA]"
           }`}
          >
            {badge.src}
            <p className="font-normal text-[12px] screen428:text-[14px] sm:text-[20px] lg:text-[30px] leading-[21px] text-black">
              {badge.text}
            </p>
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Badge;
