// SVGIcons.js
import React from 'react';

// Store your SVG icons as objects
const icons = {
  messages: (
    <svg
      className="block w-[15px] h-[15px] sm:w-[22px] sm:h-[22px] lg:w-[32px]  lg:h-[32px]"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9 12.9H31.45M12.9 23.5H23.5M22.8087 33.6392L11.7479 44.7V33.6392H7.60005C4.67294 33.6392 2.30005 31.2663 2.30005 28.3392V7.60005C2.30005 4.67294 4.67294 2.30005 7.60005 2.30005H39.4C42.3272 2.30005 44.7 4.67294 44.7 7.60005V28.3392C44.7 31.2663 42.3272 33.6392 39.4 33.6392H22.8087Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  play: (
    <svg
      className="block w-[15px] h-[15px] sm:w-[22px] sm:h-[22px] lg:w-[32px]  lg:h-[32px]"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.5651 25.4041L30.7468 24.147L30.7258 24.1606L30.7054 24.1749L31.5651 25.4041ZM31.5651 22.3651L30.6757 23.5729L30.7426 23.6222L30.8146 23.6638L31.5651 22.3651ZM19.3852 13.3964L20.2747 12.1885L20.2323 12.1573L20.1879 12.1292L19.3852 13.3964ZM16.8318 14.736L18.3318 14.7316L18.3318 14.7185L18.3315 14.7054L16.8318 14.736ZM16.8829 32.3534L15.3829 32.3578L15.383 32.4002L15.3855 32.4426L16.8829 32.3534ZM19.5299 33.8215L20.2563 35.134L20.3251 35.0958L20.3896 35.0507L19.5299 33.8215ZM23.6166 43.3166C12.7366 43.3166 3.91663 34.4966 3.91663 23.6166H0.916626C0.916626 36.1535 11.0798 46.3166 23.6166 46.3166V43.3166ZM43.3166 23.6166C43.3166 34.4966 34.4966 43.3166 23.6166 43.3166V46.3166C36.1535 46.3166 46.3166 36.1535 46.3166 23.6166H43.3166ZM23.6166 3.91663C34.4966 3.91663 43.3166 12.7366 43.3166 23.6166H46.3166C46.3166 11.0798 36.1535 0.916626 23.6166 0.916626V3.91663ZM23.6166 0.916626C11.0798 0.916626 0.916626 11.0798 0.916626 23.6166H3.91663C3.91663 12.7366 12.7366 3.91663 23.6166 3.91663V0.916626ZM32.3835 26.6612C33.2848 26.0744 34.233 25.1461 34.2312 23.8386C34.2293 22.4975 33.2386 21.5997 32.3157 21.0663L30.8146 23.6638C31.096 23.8264 31.2184 23.9502 31.2589 24.0018C31.2888 24.04 31.2314 23.9802 31.2312 23.8427C31.231 23.7108 31.2841 23.6687 31.2349 23.7351C31.179 23.8106 31.0393 23.9566 30.7468 24.147L32.3835 26.6612ZM32.4545 21.1572L20.2747 12.1885L18.4958 14.6042L30.6757 23.5729L32.4545 21.1572ZM20.1879 12.1292C19.2795 11.5538 18.0807 11.2713 16.9877 11.7816C15.8118 12.3306 15.3069 13.5285 15.3321 14.7666L18.3315 14.7054C18.327 14.4838 18.3698 14.4024 18.3683 14.4053C18.3672 14.4073 18.3577 14.4241 18.3351 14.4461C18.3122 14.4682 18.2848 14.4869 18.2569 14.4999C18.199 14.5269 18.1828 14.5111 18.2407 14.5192C18.3005 14.5276 18.4199 14.5605 18.5826 14.6635L20.1879 12.1292ZM15.3318 14.7403L15.3829 32.3578L18.3829 32.3491L18.3318 14.7316L15.3318 14.7403ZM15.3855 32.4426C15.4505 33.5344 15.8202 34.7877 16.9731 35.4035C18.1106 36.011 19.3451 35.6382 20.2563 35.134L18.8036 32.5091C18.5337 32.6585 18.3637 32.7035 18.2875 32.7141C18.2234 32.723 18.2821 32.7016 18.3864 32.7573C18.4932 32.8143 18.5117 32.8794 18.4873 32.8273C18.4564 32.7616 18.3997 32.5914 18.3802 32.2643L15.3855 32.4426ZM20.3896 35.0507L32.4248 26.6333L30.7054 24.1749L18.6702 32.5923L20.3896 35.0507Z"
        fill="black"
      />
    </svg>
  ),
  profile: (
    <svg
      className="block w-[15px] h-[15px] sm:w-[22px] sm:h-[22px] lg:w-[32px]  lg:h-[32px]"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.30005 42.2983C2.30005 33.9606 9.26576 27.2016 23.5 27.2016C37.7343 27.2016 44.7 33.9606 44.7 42.2983C44.7 43.6247 43.7323 44.7 42.5385 44.7H4.46162C3.26782 44.7 2.30005 43.6247 2.30005 42.2983Z"
        stroke="black"
        strokeWidth="3"
      />
      <path
        d="M31.45 10.25C31.45 14.6407 27.8907 18.2 23.5 18.2C19.1094 18.2 15.55 14.6407 15.55 10.25C15.55 5.85938 19.1094 2.30005 23.5 2.30005C27.8907 2.30005 31.45 5.85938 31.45 10.25Z"
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  ),
};

// SVG Icon Component
// const SVGIcon = ({ name, width = 24, height = 24, fill = 'none', stroke = 'currentColor' }) => {
const SVGIcon = ({ name}) => {
  const icon = icons[name];
  if (!icon) {
    return <span>Icon not found</span>;
  }

  // Return the icon with passed props for flexibility
  return React.cloneElement(icon);
};

export default SVGIcon;