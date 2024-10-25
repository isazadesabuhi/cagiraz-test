import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import info_btn from "@/src/icons/form/info_btn.svg";
import info_btn_green from "@/src/icons/form/info_btn_green.svg";
import touch_finger from "@/src/icons/touch_finger.svg";
import exit_modal from "@/src/icons/exit_modal.svg";

function RadioButton({
  name,
  checked,
  handleChange,
  criteriaId,
  selectedRadioId,
  whichComponent,
  serviceInfos,
  index,
}) {
  const [desc, setdesc] = useState("");
  const labelClasses = `inline-flex items-center font-medium lg:font-semibold 
                        text-[14px] leading-[18px] lg:leading-[15px] 
                        justify-between  px-[10px]  lg:px-[15px] 
                        text-black500 border-[1px] border-gray900 rounded-[108px] 
                        lg:rounded-[58px] cursor-pointer  
                        peer-checked:border-none 
                        xs:w-[220px]
                        screen360:w-[255px]
                        screen375:w-[275px]
                        screen390:w-[290px]
                        screen412:w-[310px]
                        screen428:w-[330px]
                        sm:w-[450px]
                        md:w-[590px]
                        lg:w-auto ${
                          criteriaId === selectedRadioId
                            ? `bg-[#4AE159] text-white border-none`
                            : "bg-white text-black"
                        }
                        
                        lg:py-[12px] py-[11px]`;

  const scrollToTarget = (index) => {
    const target = document.getElementById(`target-element-2`);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const navbarHeight = 120;
      const positionToScroll = scrollTop + targetPosition - navbarHeight;
      window.scrollTo({ top: positionToScroll, behavior: "smooth" });
    }
  };

  const modalId = `modal-${Number(index)}`;

  const handleClick = (currentIndex, e) => {
    e.stopPropagation();
    window.innerWidth > 1020
      ? scrollToTarget()
      : document.getElementById(modalId)?.showModal();

    setdesc(serviceInfos[currentIndex].serviceNames[0].text);
  };

  //close the modal, if an element outside of modal is clicked
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        document.getElementById(modalId)?.close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalId]);

  const scrollToElement = () => {
      const element = document.getElementById("chooseService");
      if (element && window.innerWidth < 1020) {
        const targetPosition = element.getBoundingClientRect().top;
        const scrollTop = document.documentElement.scrollTop;
        const positionToScroll = scrollTop + targetPosition - 25;
        window.scrollTo({ top: positionToScroll, behavior: "smooth" });
      }
  };

  return (
    <div
      className={`${"flex justify-between lg:justify-normal items-center gap-x-[5px]"}`}
    >
      <div className="flex flex-row items-center">
        <input
          key={whichComponent}
          name="rating"
          type="radio"
          id={name}
          value={name}
          className="hidden peer"
          checked={checked}
          onChange={() => handleChange(name, criteriaId)}
          onClick={scrollToElement}
        />

        <label htmlFor={name} className={labelClasses}>
          {name}
        </label>

        <Image
          src={touch_finger}
          alt="touch_finger"
          width={20}
          height={23}
          unoptimized
          className="
          pointer-events-none
          absolute
          hidden
          left-[190px]
          screen360:left-[225px]
          screen375:left-[245px]
          screen390:left-[260px]
          screen412:left-[280px]
          screen428:left-[298px]
          sm:left-[420px]
          md:left-[560px] 
          xs:block lg:hidden"
        />
      </div>
      <div
        className={`absolute lg:relative flex flex-row gap-x-[5px] lg:gap-x-[10px] right-0
      ${serviceInfos[index].serviceNames[0].text ? "" : "hidden"}`}
        onClick={(e) => {
          handleClick(index, e);
        }}
      >
        <button className="">
          {criteriaId === selectedRadioId ? (
            <Image
              src={info_btn_green}
              alt="info_btn_green"
              width={22}
              height={22}
              className={`${
                whichComponent === "dropdown" ? "" : "w-[18px] h-[18px]"
              }`}
              unoptimized
            />
          ) : (
            <Image
              src={info_btn}
              alt="info_btn"
              width={22}
              height={22}
              className={`block lg:hidden ${
                whichComponent === "dropdown" ? "" : "w-[18px] h-[18px]"
              }`}
              unoptimized
            />
          )}
        </button>
        <dialog id={modalId} className="modal px-[20px]">
          <form
            ref={modalRef}
            method="dialog"
            className="modal-box  bg-white modal-middle w-auto h-auto rounded-[20px] 
      px-[10px] lg:px-[20px] py-[15px] lg:py-[25px] max-h-[300px]"
          >
            <div className="flex justify-end">
              <button className="modal-action mt-0">
                <Image
                  src={exit_modal}
                  alt="exit_modal_icon"
                  loading="lazy"
                  className="w-[15px] h-[15px]"
                  unoptimized
                />
              </button>
            </div>
            <div
              className="text-black"
              dangerouslySetInnerHTML={{
                __html: `${desc}`,
              }}
            />
          </form>
        </dialog>
        <p className="text-[14px] leading-[18px] lg:leading-[15px] text-black lg:hidden">
          Ətraflı
        </p>
      </div>
    </div>
  );
}

export default RadioButton;