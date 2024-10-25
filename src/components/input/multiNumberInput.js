import React, { useEffect,useState, useRef } from "react";
import Image from "next/image";
import minus from "@/src/icons/form/minus.svg";
import plus from "@/src/icons/form/plus.svg";
import info_btn from "@/src/icons/form/info_btn.svg";
import info_btn_green from "@/src/icons/form/info_btn_green.svg";
import exit_modal from "@/src/icons/exit_modal.svg";

const CustomInput = ({
  name,
  updateCriteriaValue,
  updateMultiNumberName,
  criteriaId,
  updateCriteriaId,
  desc,
  index
}) => {

  // value takes Service Criteria ID each time a new input is clicked
  const [value, setValue] = useState(0);
  // newId takes Service Criteria name each time a new input is clicked
  const [newId, setnewId] = useState(criteriaId);

  const handleIncrease = () => {
    setValue(value + 1);
    updateCriteriaValue(value + 1);
    updateCriteriaId(newId);
    updateMultiNumberName(name);
    // Step 2: Invoke the onUpdate callback with the updated value
  };

  const handleDecrease = () => {
    if (value > 0) {
      setValue(value - 1);
      updateCriteriaValue(value - 1);
      updateCriteriaId(newId);
      updateMultiNumberName(name);
    }
    // Step 2: Invoke the onUpdate callback with the updated value
  };

  const checkBox = () => {
    const newValue = value > 0 ? 0 : 1;
    setValue(newValue);
    updateCriteriaValue(newValue);
    updateCriteriaId(newId);
    updateMultiNumberName(name);
    // Step 2: Invoke the onUpdate callback with the updated value, if needed
  }
  

  const modalId = `modal-${Number(index)}`;

  const handleClick = (currentIndex) => { 
    document.getElementById(modalId)?.showModal()
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

  return (
    <div className="flex flex-row justify-between items-center lg:justify-normal lg:gap-[5px]">
      <input
        onClick={checkBox}
        type="checkbox"
        checked={`${value > 0 ? "checked" : ""}`}
        className="checkbox border-cagiraz bg-white hidden lg:block"
      />

      <div
        className="inline-flex items-center justify-between border-none lg:border lg:border-solid lg:border-gray900 rounded-full
    lg:pl-[15px] pr-[5px] lg:h-[40px]
    xs:w-[220px]
                        screen360:w-[250px]
                        screen375:w-[275px]
                        screen390:w-[290px]
                        screen412:w-[310px]
                        screen428:w-[312px]
                        sm:w-[450px]
                        lg:w-[250px]
                        xl:w-[300px]"
      >
        <label className="text-gray-600 pr-[8px] font-semibold text-[12px] leading-[15px] ">
          <p>{name}</p>
        </label>
        <div className="flex flex-row">
          <button
            className="bg-cagiraz rounded-[5px] lg:rounded-full w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] flex justify-center focus:outline-none"
            onClick={handleDecrease}
          >
            <Image
              src={minus}
              alt="minus_logo"
              className="self-center"
              loading="lazy"
              unoptimized
            />
          </button>
          <input
            className="min-w-[8px] max-w-[30px] text-center  focus:outline-none bg-white text-black"
            type=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="bg-cagiraz rounded-[5px] lg:rounded-full w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] flex justify-center focus:outline-none "
            onClick={handleIncrease}
          >
            <Image
              src={plus}
              alt="plus_logo"
              className="self-center"
              loading="lazy"
              unoptimized
            />
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          handleClick(index);
        }}
        className={`${desc ? "flex flex-row gap-x-[10px] hidden" : "hidden"}`}
      >
        <Image
          src={value > 0 ? info_btn_green : info_btn}
          alt={`${value > 0 ? "info_btn_green" : "info_btn"}`}
          width={22}
          height={22}
          unoptimized
        />
        <p className="text-[14px] leading-[18px] lg:leading-[15px] text-black lg:hidden">
          Ətraflı
        </p>
      </button>
      <dialog id={modalId} className="modal px-[20px]">
        <form
          ref={modalRef}
          method="dialog"
          className="modal-box bg-white modal-middle w-auto h-auto rounded-[20px] px-[10px] lg:px-[20px]
       py-[15px] lg:py-[25px] max-h-[300px] lg:h-auto"
        >
          <div className="flex justify-end">
            {/* if there is a button in form, it will close the modal */}
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
    </div>
  );
};

export default CustomInput;