const PrimarySmBtn = ({ btnName, classNames, onClick }) => {
  const buttonClasses = `lg:w-auto bg-cagiraz rounded-[30px] py-[10px] px-[26px] 
                         font-extrabold text-white text-[14px] leading-[21px] 
                         transition duration-400 transform hover:-translate-y-[5px] 
                         shadow-btnShdw ${classNames}`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {btnName}
    </button>
  );
};

export default PrimarySmBtn;