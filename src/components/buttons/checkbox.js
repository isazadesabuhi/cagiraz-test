import React, { useState } from "react";

const checkbox = ({ name, criteriaId, sendDataToParent }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    const checkboxIsChecked = !isChecked;
    sendDataToParent(name, criteriaId, checkboxIsChecked);
    setIsChecked(checkboxIsChecked);
  };

  const labelClasses = `inline-flex items-center font-medium lg:font-semibold
                         text-[12px] leading-[18px] lg:leading-[15px]
                         justify-between py-[7px] px-[10px] lg:py-[12px] lg:px-[15px]
                         text-black500 border-[1px] border-gray900 rounded-[10px]
                         lg:rounded-full cursor-pointer ${
                           isChecked ? "bg-cagiraz border-none text-white" : ""
                         }`;

  return (
    <div className="grid">
      <input
        name="meyar"
        type="checkbox"
        id={name}
        value={name}
        className="hidden peer"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        onClick={handleClick}
      />
      <label htmlFor={name} className={labelClasses}>
        <div className="w-full">{name}</div>
      </label>
    </div>
  );
};

export default checkbox;
