import Image from "next/image";

function ExecutiveCard({ name, title, image, description }){
    return(
        <div className="flex flex-row items-center justify-center py-[10px]">
    <div
      className="w-[145px] screen360:w-[160px] screen375:w-[175px] screen412:w-[185px] sm:w-[195px] lg:w-[302px] h-full 
              rounded-[10px] lg:rounded-[20px] flex flex-col
              bg-white
              drop-shadow-cardAlt"
    >
      <div className="p-[10px] lg:p-[30px] space-y-[10px] lg:space-y-[15px]">
        {/* photo, name */}
        <div className="flex gap-x-[10px] lg:gap-x-[15px] items-center">
          <Image
            width={200}
            height={200}
            src={`https://api.cagir.az${image}`}
            alt={name}
            title={name}
            className="rounded-full w-[65px] lg:w-[112px] h-[65px] lg:h-[112px] object-cover object-center border-2 border-cagiraz border-opacity-20"
            loading="lazy"
            unoptimized
          />
          <div className="flex flex-col">
            <h4
              className="
                        font-semibold lg:font-bold text-[12px] leading-[14px] 
                        lg:leading-[18px] text-black500"
            >
              {name}
            </h4>

            <p
              className="lg:font-semibold italic text-[12px] lg:text-[14px] leading-[18px]
                    lg:leading-[21px] text-[#595959]"
            >
              {title}
            </p>
          </div>
        </div>

        {/* icraci */}
        <div className="w-full h-full">
          <p
            className=" italic font-semibold lg:font-bold text-[12px] lg:text-[14px] leading-[18px]
                  sm:leading-[19px] lg:leading-[21px] text-[#404040]"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
    )
}

export default ExecutiveCard