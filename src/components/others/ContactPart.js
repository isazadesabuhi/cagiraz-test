import React from "react";
import Image from "next/image";
import Link from "next/link";
import phone_black from "@/src/icons/phone_black.svg";

function Contact_Part() {
  return (
    <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-3 items-center justify-center bg-cagiraz w-full px-[20px] sm:px-[50px] py-[20px] rounded-[20px]">
      <div class="lg:col-span-1 w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] bg-white rounded-full flex justify-center">
        <Image src={phone_black} alt="phone_icon" unoptimized />
      </div>
      <div class="flex flex-col gap-[10px] items-center justify-center lg:col-span-1 pt-[15px] lg:pt-0 w-full sm:w-[300px] lg:ml-[20px]">
        <p className="text-white pb-[15px] lg:pb-0">Əlaqə nömrəsi:</p>
        <div className="flex flex-row justify-between sm:justify-none bg-white items-center py-[8px] sm:py-[3px] px-[15px] rounded-full w-full ">
          <Link
            href="tel:+994703482606"
            className="font-semibold text-[12px] sm:text-[14px] leading-[21px]"
          >
            +994 70 348 26 06
          </Link>
          <p className="text-[#959595] text-[12px] sm:text-[14px] leading-[21px]">
            -7/24
          </p>
        </div>
        <div className="flex flex-row justify-between sm:justify-none bg-white items-center py-[8px] sm:py-[3px] px-[15px] rounded-full w-full ">
          <Link
            href="tel:+994773482606"
            className="font-semibold text-[12px] sm:text-[14px] leading-[21px]"
          >
            +994 77 348 26 06
          </Link>
          <p className="text-[#959595] text-[12px] sm:text-[14px] leading-[21px]">
            -7/24
          </p>
        </div>
        <div className="flex flex-row justify-center sm:justify-none bg-white items-center text-center py-[8px] sm:py-[3px] px-[15px] rounded-full w-full ">
          <Link
            href="mailto:info@cagir.az"
            className="font-semibold text-[12px] sm:text-[14px] leading-[21px]"
          >
            info@cagir.az
          </Link>
          <p className="text-[#959595] text-[12px] sm:text-[14px] leading-[21px]">
            -7/24
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-x-0 lg:gap-x-[5px] w-full">
          {/* <Link href="tel:+994703482606">
            <p className="font-semibold text-[12px] sm:text-[14px] leading-[21px] text-white">
              +994 70 348 26 06
            </p>
          </Link> */}
          <p className="font-semibold text-[12px] sm:text-[14px] leading-[21px]">
            -Həftə içi, 10<sup class="text-[8px]">00</sup>-18
            <sup class="text-[8px]">00</sup>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact_Part;

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import phone_black from "@/src/icons/phone_black.svg";

// function Contact_Part() {
//   return (
//     <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-3 items-center justify-center bg-cagiraz w-full px-[20px] sm:px-[50px] py-[20px] rounded-[20px]">
//       <div className="lg:col-span-1 w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] bg-white rounded-full flex justify-center items-center">
//         <Image
//           src={phone_black}
//           alt="phone_icon"
//           className="w-[20px] h-[20px]"
//           loading="lazy"
//         />
//       </div>
//       <div className="flex flex-col gap-[10px] items-center justify-center lg:col-span-1 pt-[15px] lg:pt-0 w-full sm:w-[300px] lg:ml-[20px]">
//         <p className="text-white pb-[15px] lg:pb-0">Əlaqə nömrəsi:</p>
//         <div className="flex flex-row justify-between sm:justify-none bg-white items-center py-[8px] sm:py-[3px] px-[15px] rounded-full w-full ">
//           <Link
//             href="tel:+994703482606"
//             className="font-semibold text-[12px] sm:text-[14px] leading-[21px] text-black"
//           >
//             +994 70 348 26 06
//           </Link>
//           <p className="text-[12px] sm:text-[14px] leading-[21px] text-black">
//             -7/24
//           </p>
//         </div>
//         <div className="flex flex-row justify-center sm:justify-none bg-white items-center text-center py-[8px] sm:py-[3px] px-[15px] rounded-full w-full text-black">
//           <Link
//             href="mailto:info@cagir.az"
//             className="font-semibold text-[12px] sm:text-[14px] leading-[21px]"
//           >
//             info@cagir.az
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact_Part;