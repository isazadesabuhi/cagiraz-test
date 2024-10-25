const PrimaryMdBtn = ({ btnName, classNames, onClick }) => {
  const buttonClasses = `w-full bg-cagiraz rounded-[50px] py-[10px] px-[26px]
                         font-extrabold text-white text-[16px] leading-[24px]
                         transition duration-400 transform hover:-translate-y-[5px]
                         shadow-btnShdw ${classNames}`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {btnName}
    </button>
  );
};

export default PrimaryMdBtn;
