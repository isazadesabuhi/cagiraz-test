// components/CustomDropdown.js
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import info_btn from "@/src/icons/form/info_btn.svg";
import { useRouter } from "next/router";
import RadioButton from "@/src/components/buttons/radioButton";

const Dropdown = ({
  getMainServices,
  onSelectMainService,
  onSelectSubService,
  getSubServices,
  onSelectSub2Service,
  getSub2Services,
  defaultMain,
  defaultSub,
  onDataCallback,
  messages,
  mainInfoAfterEndPoint,
  subName,
}) => {
  const dropdownInfos = {
    0: {
      serviceInfos: getMainServices,
      onSelectService: onSelectMainService,
    },
    1: {
      serviceInfos: getSubServices,
      onSelectService: onSelectSubService,
    },
    2: {
      serviceInfos: getSub2Services,
      onSelectService: onSelectSub2Service,
    },
  };
  const router = useRouter();

  // dropdown options are set to false(closed).
  const [isOpen, setIsOpen] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(false);
  const myElementRef = useRef(null);

  const toggleDropdown = (index) => {
    setIsOpen((prevState) => ({
      ...Object.fromEntries(
        Object.entries(prevState).map(([key]) => [key, false])
      ),
      [index]: !prevState[index], // Toggle the dropdown's state
    }));
  };

  const handleClick = (event) => {
    if (myElementRef.current && !myElementRef.current.contains(event.target)) {
      setClickedOutside(true);
    }
  };

  useEffect(() => {
    setIsOpen((prevState) =>
      Object.fromEntries(Object.keys(prevState).map((key) => [key, false]))
    );
    setClickedOutside(false);
  }, [clickedOutside]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // mainServiceName is set to false as default.
  const [mainServiceName, setMainServiceName] = useState(
    defaultMain?.serviceNames?.[0].name
  );

  const [subServiceName, setSubServiceName] = useState(subName);
  const [sub2ServiceName, setSub2ServiceName] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const serviceNames = [
    mainServiceName,
    subServiceName || defaultSub?.serviceNames?.[0]["name"],
    sub2ServiceName,
  ];

  const findMainInfoByName = (mainServices, name) =>
    mainServices.find((obj) => obj.serviceNames[0].name === mainServiceName) ||
    {};
  const mainInfo = findMainInfoByName(getMainServices, mainServiceName);

  const findSubInfoByName = (subServices, name) =>
    subServices.find((obj) => obj.serviceNames[0].name === subServiceName) ||
    {};
  const subInfo = findSubInfoByName(getSubServices, subServiceName);

  const handleToggleDesc = (index) => {
    const element = document.getElementById("target-element-1");
    if (element && window.innerWidth < 1020) {
      const targetPosition = element.getBoundingClientRect().top;
      const scrollTop = document.documentElement.scrollTop;
      const positionToScroll = scrollTop + targetPosition - 45;
      window.scrollTo({ top: positionToScroll, behavior: "smooth" });
    }
  };

  //finding main service Description by using Id
  const findDescById = (index) =>
    dropdownInfos[index].serviceInfos.find(
      (obj) => obj.serviceNames[0].name === serviceNames[index]
    )?.serviceNames[0].text ?? null;

  const handleOptionClick = (mainIndex, serviceName) => {
    if (mainIndex == 0) {
      setMainServiceName(serviceName);
      onSelectMainService(serviceName);
    } else if (mainIndex == 1) {
      setSubServiceName(serviceName);
      onSelectSubService(serviceName);
    } else if (mainIndex == 2) {
      setSub2ServiceName(serviceName);
      onSelectSub2Service(serviceName);
    }

    setIsOpen(false);

    onDataCallback(mainIndex);
  };

  useEffect(() => {
    onSelectMainService(mainServiceName);
    onSelectSubService(subServiceName);
    onSelectSub2Service(sub2ServiceName);
  }, [
    mainServiceName,
    subServiceName,
    onSelectMainService,
    onSelectSubService,
    sub2ServiceName,
    onSelectSub2Service,
  ]);

  const isSub2ElementsExist = getSub2Services.length > 0;

  const pathMain = mainInfo.serviceNames?.[0].titleUrl;
  const pathSub =
    subInfo.serviceNames?.[0].titleUrl ||
    getSubServices[0]?.serviceNames[0].titleUrl;
  const newPath = `/${pathMain}/${pathSub}`;

  const isInitialMount = useRef(true);

  useEffect(() => {
    // If it's the initial mount, we'll check if we're being redirected
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      router.replace(newPath);
    }
  }, [mainInfoAfterEndPoint.length, newPath]);

  const [selectedRadioName, setSelectedRadioName] = useState(null);
  const [selectedRadioId, setSelectedRadioId] = useState("");
  // Event handlers
  const handleChange = (value, criteriaId, index) => {
    setSelectedRadioName(value);
    setSelectedRadioId(criteriaId);
  };

  useEffect(() => {
    setSelectedRadioId("");
    setSelectedRadioName(null);
  }, [defaultMain, defaultSub]);

  const scrollToTarget = (index) => {
    const target = document.getElementById(`target-element-${index}`);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const navbarHeight = 120;
      const positionToScroll = scrollTop + targetPosition - navbarHeight;
      window.scrollTo({ top: positionToScroll, behavior: "smooth" });
    }
  };
  return (
    <div
      ref={myElementRef}
      className="flex flex-col lg:bg-[#F7F9FC] lg:p-[20px] rounded-[10px] divide-y divide-slate-200 lg:divide-none gap-y-[20px]"
    >
      <div
        className="grid lg:grid-cols-2 justify-items-stretch lg:gap-x-[40px] gap-y-[15px] 
       rounded-[10px]"
      >
        {Object.keys(dropdownInfos).map((index) => {
          if (index === "2") {
            return null; // Skip this iteration
          }

          const serviceInfos = dropdownInfos[index].serviceInfos
            ? dropdownInfos[index].serviceInfos
            : "";

          const mainIndex = index;
          return (
            <div key={Number(index)}>
              <div className="flex flex-col gap-y-[10px] lg:gap-y-0 relative ">
                <div className="hidden lg:flex flex-row justify-between pb-[5px]">
                  <label
                    htmlFor="button"
                    className="font-semibold text-[12px] leading-[18px] text-black500"
                  >
                    {/* {messages["select-service"]} */}
                    {Number(index) === 0
                      ? "Baş xidməti seç"
                      : "Alt xidməti seç"}
                  </label>
                </div>

                <div ref={myElementRef}>
                  <label
                    htmlFor="button"
                    className={`lg:hidden absolute px-[5px] ml-[10px] mt-[-6px] z-10 bg-white 
        
           font-medium text-[12px] leading-[12px] text-cagiraz ${
             isOpen[index] ? "block" : "hidden"
           }`}
                  >
                    {serviceNames[index] || ""}
                  </label>
                  <div className="flex flex-row items-center gap-x-[10px]">
                    <button
                      className={`dropdown-button relative flex items-center justify-between w-full lg:min-w-[240px] lg:max-w-[300px] px-[15px] py-[5px] lg:py-[10px] text-[12px] lg:text-[12px] leading-[15px] lg:leading-[12px] font-medium lg:font-semibold
         text-gray900  bg-white rounded-[10px] lg:rounded-[50px] focus:outline-none focus:border-cagiraz
         border-[1px] focus:border-[2px] border-solid border-gray900`}
                      onClick={() => {
                        toggleDropdown(index);
                      }}
                    >
                      <p
                        className={`text-black500 ${
                          isOpen[index] ? "opacity-0" : "opacity-100"
                        } ${
                          serviceNames[mainIndex] === "Xidməti seçin"
                            ? "font-bold text-danger"
                            : ""
                        }`}
                      >
                        {Number(index) === 0 ? serviceNames[0] : subName}
                      </p>

                      <svg
                        className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${
                          isOpen[index] ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 16a1 1 0 01-.7-.3l-5-5a1 1 0 011.4-1.4L10 13.6l4.3-4.3a1 1 0 011.4 1.4l-5 5a1 1 0 01-.7.3z" />
                      </svg>
                    </button>
                    {findDescById(index) ? (
                      <button
                        onClick={() => {
                          scrollToTarget(index);
                        }}
                      >
                        <Image
                          src={info_btn}
                          alt="info_btn"
                          className="w-[22px] h-[22px] hidden lg:block"
                          unoptimized
                        />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  {isOpen[index] && (
                    <div
                      style={{ overflowY: "scroll" }}
                      className={`${
                        isOpen[index] ? "block" : "hidden"
                      } absolute z-10 w-full mt-[10px] rounded-[10px] border-[2px] border-solid border-cagiraz bg-white   
                    max-h-[200px] lg:max-h-[300px] overflow-y-scroll`}
                    >
                      {serviceInfos &&
                        serviceInfos.map((item, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              handleOptionClick(
                                mainIndex,
                                item.serviceNames[0].name
                              )
                            }
                            className="w-full hover:bg-blue-500 hover:bg-opacity-[15%]"
                          >
                            <button className="px-[15px] py-[5px] font-medium lg:font-semibold text-[12px] leading-[18px] text-black lg:text-black500">
                              {item.serviceNames[0].name}
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                {/* info part */}
                {findDescById(index) && Number(index) === 1 && (
                  <div className="flex lg:hidden flex-row gap-x-[10px]">
                    <Image
                      className="self-start w-[20px] h-[20px]"
                      src={info_btn}
                      alt="info_icon"
                      loading="lazy"
                      unoptimized
                    />

                    <div className=" font-medium  text-[#595959]">
                      <div
                        onClick={() => handleToggleDesc(index)}
                        className={`text-[12px] leading-[18px] truncate
                         w-full h-[16px] max-w-[150px] xs:max-w-[260px]
                         screen360:max-w-[295px] screen375:max-w-[310px] 
                         screen390:max-w-[320px] screen412:max-w-[350px] 
                         screen428:max-w-[380px] sm:max-w-[600px] md:max-w-[700px]  
                         whitespace-nowrap overflow-hidden overflow-x-hidden `}
                        dangerouslySetInnerHTML={{
                          __html: `${findDescById(index).replaceAll(
                            "<ul>",
                            '<ul class="list-disc list-inside pt-[3px] pb-[7px]">'
                          )}`,
                        }}
                      ></div>
                      <button
                        className="text-[12px] leading-[15px] font-semibold block text-cagiraz "
                        onClick={() => handleToggleDesc(index)}
                      >
                        Ətraflı oxu
                        {/* {descIsOpen[index] ? "Bağla" : "Ətraflı oxu"} */}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {Object.keys(dropdownInfos).map((index) => {
        if (index !== "2") {
          return null; // Skip this iteration
        }

        const serviceInfos = dropdownInfos[index].serviceInfos
          ? dropdownInfos[index].serviceInfos
          : "";

        const mainIndex = index;
        return (
          <div id="chooseService" key={Number(index)}>
            {isSub2ElementsExist && (
              <div className="flex flex-col gap-y-[10px] lg:gap-y-0 relative ">
                <div className="flex flex-row justify-between pt-[20px] pb-[10px] lg:pb-[15px]">
                  <label
                    htmlFor="button"
                    className={`font-semibold text-[16px] leading-[18px] text-[#F64242] ${
                      sub2ServiceName ? "" : "animate-slide"
                    }`}
                  >
                    {messages["select-service"]}
                  </label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-[20px]">
                  {serviceInfos &&
                    serviceInfos.map((item, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleOptionClick(
                            mainIndex,
                            item.serviceNames[0].name
                          )
                        }
                        className="flex flex-row items-center"
                      >
                        <div>
                          <RadioButton
                            {...{ serviceInfos, index, selectedRadioId }}
                            description={
                              dropdownInfos?.[2].serviceInfos[index]
                                .serviceNames[0].text
                            }
                            whichComponent="dropdown"
                            name={item.serviceNames[0].name}
                            handleChange={(value, criteriaId) =>
                              handleChange(item.serviceNames[0].name, index)
                            }
                            criteriaId={index}
                            checked={
                              selectedRadioName === item.serviceNames[0].name
                            }
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;