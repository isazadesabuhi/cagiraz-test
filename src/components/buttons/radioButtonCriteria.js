import Image from "next/image";
import info_btn from "@/src/icons/form/info_btn.svg";
import info_btn_green from "@/src/icons/form/info_btn_green.svg";
import touch_finger from "@/src/icons/touch_finger.svg";

function RadioButtonCriteria({
  name,
  checked,
  handleChange,
  criteriaId,
  selectedRadioId,
  whichComponent,
  desc,
}) {
  const inputClasses = "hidden peer";
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
                          criteriaId === selectedRadioId || checked
                            ? `bg-[#4AE159] text-white border-none`
                            : "bg-white text-black"
                        }

                             py-[7px]
                        `;
  const scrollToTarget = () => {
    const target = document.getElementById("target-element");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div
      className={`${"flex justify-between lg:justify-normal text-center items-center gap-x-[5px]"}`}
    >
      <div className="flex flex-row items-center">
        <input
          key={whichComponent}
          name="rating"
          type="radio"
          id={name}
          value={name}
          className={inputClasses}
          checked={checked}
          onChange={() => handleChange(name, criteriaId)}
        />

        <label htmlFor={name} className={labelClasses}>
          {name}
        </label>

        <Image
          src={touch_finger}
          alt="touch_finger"
          width={20}
          height={22}
          unoptimized
          className="pointer-events-none absolute
          hidden
          left-[200px]
          screen360:left-[235px]
                        screen375:left-[255px]
                        screen390:left-[270px]
                        screen412:left-[290px]
                        screen428:left-[309px]
                        sm:left-[430px]
                        md:left-[570px] xs:block lg:hidden"
        />
      </div>

      <div
        className={
          desc
            ? "absolute lg:relative flex flex-row gap-x-[10px] right-0"
            : "hidden"
        }
        onClick={() => {
          scrollToTarget();
        }}
      >
        <button aria-label="dropdown">
          {criteriaId === selectedRadioId ? (
            <Image
              src={info_btn_green}
              alt="info_btn_green"
              width={22}
              height={22}
              unoptimized
              className={`${
                whichComponent === "dropdown" ? "" : "w-[18px] h-[18px]"
              }`}
            />
          ) : (
            <Image
              src={info_btn}
              alt="info_btn"
              width={22}
              height={22}
              unoptimized
              className={`block lg:hidden ${
                whichComponent === "dropdown" ? "" : "w-[18px] h-[18px]"
              }`}
            />
          )}
        </button>
        <p className="text-[14px] leading-[18px] lg:leading-[15px] text-black lg:hidden">
          Ətraflı
        </p>
      </div>
    </div>
  );
}
export default RadioButtonCriteria;
