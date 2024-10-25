const linkSmBtn = ({ btnName, classNames, onClick }) => {
  const buttonClasses = `py-[10px] px-[26px] font-extrabold text-cagiraz text-[14px] leading-[21px] ${classNames}`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {btnName}
    </button>
  );
};

export default linkSmBtn;
