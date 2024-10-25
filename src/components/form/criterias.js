import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useIntl } from "react-intl";
import info_btn from "@/src/icons/form/info_btn.svg";
import open from "@/src/icons/open.svg";
import close from "@/src/icons/close.svg";
import open_red from "@/src/icons/open_red.svg";
import close_red from "@/src/icons/close_red.svg";

import {
  CustomInput,
  Textarea,
  InputCustomized,
  InputPlusMinus,
} from "@/src/components/input";
import RadioButtonCriteria from "@/src/components/buttons/radioButtonCriteria";

const Criterias = ({
  serviceIdForCriteria,
  selectedMain,
  selectedSub,
  selectedSub2,
  sendPriceToSifaris,
  sendDetailsToSifaris,
  sendCriteriaDescToSifaris,
  sendAdditionalNote,
}) => {
  const intl = useIntl();
  const chosenLang = intl.locale;
  const messages = intl.messages;

  const [getServiceCriterias, setgetServiceCriterias] = useState([]);
  // Effects
  useEffect(() => {
    if (!serviceIdForCriteria) return;
    axios
      .post(
        "https://api.cagir.az/api/serviceCriteria/getAllWithParent",
        [serviceIdForCriteria],
        {
          headers: {
            "Accept-Language": chosenLang,
          },
        }
      )
      .then((response) => setgetServiceCriterias(response.data.result))
      .catch((error) => console.error(error));
  }, [serviceIdForCriteria, chosenLang]);

  /* ----------------------------------  infoBtnFor Meyars ---------------------------------- */
  const [infoBtn, setInfoBtn] = useState({});
  const toggleDropdown = (index) => {
    setInfoBtn((prevState) => ({
      ...Object.fromEntries(
        Object.entries(prevState).map(([key]) => [key, false])
      ),
      [index]: !prevState[index], // Toggle the dropdown's state
    }));
  };

  /* ----------------------------------  Multinumber input functionality-FilterType=5 ---------------------------------- */

  // multiNumberArray takes all the information of multi number input for pricing
  // State initialization
  const [multiNumberValue, setMultiNumberValue] = useState(0);
  const [multiNumberId, setMultiNumberId] = useState("");
  const [multiNumberName, setMultiNumberName] = useState("");
  const [multiNumberArray, setMultiNumberArray] = useState([]);

  // Effects
  useEffect(() => {
    if (!multiNumberId) return;

    const existingObjectIndex = multiNumberArray.findIndex(
      (obj) => obj.serviceCriteriaId === multiNumberId
    );

    if (existingObjectIndex !== -1) {
      setMultiNumberArray((prevArr) =>
        prevArr.map((obj, index) =>
          index === existingObjectIndex
            ? { ...obj, name: multiNumberName, count: multiNumberValue }
            : obj
        )
      );
    } else {
      setMultiNumberArray((prevArr) => [
        ...prevArr,
        {
          serviceCriteriaId: multiNumberId,
          name: multiNumberName,
          count: multiNumberValue,
        },
      ]);
    }
  }, [multiNumberName, multiNumberId, multiNumberValue]);

  /* ----------------------------------  Plus-Minus input functionality-FilterType=1 ---------------------------------- */
  // State initialization
  const [plusMinusValue, setPlusMinusValue] = useState(0);
  const [plusMinusId, setPlusMinusId] = useState("");
  const [plusMinusArray, setPlusMinusArray] = useState([]);

  // Effects
  useEffect(() => {
    if (!plusMinusId) return;

    const existingObjectIndex = plusMinusArray.findIndex(
      (obj) => obj.serviceCriteriaId === plusMinusId
    );

    if (existingObjectIndex !== -1) {
      setPlusMinusArray((prevArr) =>
        prevArr.map((obj, index) =>
          index === existingObjectIndex
            ? { ...obj, count: plusMinusValue }
            : obj
        )
      );
    } else {
      setPlusMinusArray((prevArr) => [
        ...prevArr,
        { serviceCriteriaId: plusMinusId, count: plusMinusValue },
      ]);
    }
  }, [plusMinusId, plusMinusValue]);

  /* ---------------------------------- Text input functionality-FilterType=2 ---------------------------------- */
  // State initialization
  const [inputTextValue, setInputTextValue] = useState(0);
  const [inputTextId, setInputTextId] = useState("");
  const [inputTextObject, setInputTextObject] = useState({});

  // Event handlers
  const handleDataUpdateForInputText = (criteriaId, value) => {
    setInputTextId(criteriaId);
    setInputTextValue(value);
  };

  // Effects
  useEffect(() => {
    if (!inputTextId) return;

    setInputTextObject({
      serviceCriteriaId: inputTextId,
      count: Number(inputTextValue),
    });
  }, [inputTextId, inputTextValue]);

  /* ---------------------------------- Radio button functionality-FilterType=4 ---------------------------------- */
  // State initialization
  const [selectedRadioName, setSelectedRadioName] = useState(null);
  const [selectedRadioId, setSelectedRadioId] = useState("");
  const [radioBtnObject, setRadioBtnObject] = useState({});

  // Event handlers
  const handleChange = (value, criteriaId) => {
    setSelectedRadioName(value);
    setSelectedRadioId(criteriaId);
  };
  const handleChange2 = (value, criteriaId) => {
    setSelectedRadioName(value);
    setSelectedRadioId(criteriaId);
  };

  // Effects
  useEffect(() => {
    if (!selectedRadioId) return
    setRadioBtnObject(
      {
            name: selectedRadioName,
            serviceCriteriaId: selectedRadioId,
            count: 1,
          }
    );
  }, [selectedRadioName, selectedRadioId]);
  /* ---------------------------------- Checkbox functionality-FilterType=4 ---------------------------------- */
  // State initialization
  const [checkboxId, setCheckboxId] = useState(null);
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [checkedCheckboxName, setCheckedCheckboxName] = useState("");
  const [checkedCheckboxArray, setCheckedCheckboxArray] = useState([]);

  // Event handlers
  //   const handleDataFromChild = (name, criteriaId, isChecked) => {
  //     setCheckboxId(criteriaId);
  //     setCheckboxIsChecked(isChecked);
  //     setCheckedCheckboxName(name);
  //   };

  // Effects
  useEffect(() => {
    if (checkboxIsChecked && checkboxId) {
      const newObj = {
        name: checkedCheckboxName,
        serviceCriteriaId: checkboxId,
        count: 1,
      };
      setCheckedCheckboxArray((prevArray) => [...prevArray, newObj]);
    } else {
      setCheckedCheckboxArray((prevArray) =>
        prevArray.filter((obj) => obj.serviceCriteriaId !== checkboxId)
      );
    }
  }, [checkedCheckboxName, checkboxIsChecked, checkboxId]);

  /* ---------------------------------- Calculating Price of the Service ---------------------------------- */
  // State initialization
  const [priceBeforePromo, setPriceBeforePromo] = useState(0);

  const filteredCalculatePrice = [
    radioBtnObject,
    ...checkedCheckboxArray,
    ...multiNumberArray,
    ...plusMinusArray,
    inputTextObject,
  ].filter((item) => Object.keys(item).length !== 0);

  // Effects
  useEffect(() => {

    if (getServiceCriterias.length > 0) {
      axios
        .post(
          "https://api.cagir.az/api/serviceCriteria/calculate",
          [...filteredCalculatePrice],
          { headers: { "Accept-Language": "" } }
        )
        .then((response) => {
          setPriceBeforePromo(response.data.result.amount);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [getServiceCriterias,filteredCalculatePrice]);
  useEffect(() => {
    setgetServiceCriterias([]);
    setCheckedCheckboxArray([]);
    setMultiNumberArray([]);
    setRadioBtnObject([]);
    setSelectedRadioId(null);
    setSelectedRadioName(null);
    setPlusMinusArray([]);
    setInputTextObject({});
    setPriceBeforePromo(0);
    setSelectedRadioName(null);
    setInfoBtn({});
  }, [selectedMain, selectedSub, selectedSub2]);

  useEffect(() => {
    sendPriceToSifaris(priceBeforePromo);
  }, [priceBeforePromo]);

  useEffect(() => {
    sendDetailsToSifaris(filteredCalculatePrice)
  },[radioBtnObject,checkedCheckboxArray,
    multiNumberArray,plusMinusArray,inputTextObject])

  /* ---------------------------------- Textarea functionality ---------------------------------- */
  // State Initialization
  const [showTextarea, setshowTextarea] = useState(false);
  const [receivedMessage, setReceivedMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Effects
  useEffect(() => {
    setshowTextarea(getServiceCriterias.length > 0);
  }, [getServiceCriterias]);

  // Callbacks & Handlers
  const handleMessage = (message) => {
    setReceivedMessage(message);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    sendCriteriaDescToSifaris(
      getServiceCriterias?.[0]?.serviceCriteria?.serviceCriteriaNames?.[0].text
    );
  }, [getServiceCriterias]);

  useEffect(() => {
    sendAdditionalNote(receivedMessage);
  }, [receivedMessage]);

  // useEffect(() => {
  //   sendFilteredPrice(
  //     filteredCalculatePrice
  //   );
  // }, [filteredCalculatePrice]);

  // Define an array of the names to match for additional request criteria
  const additionalRequestNames = [
    "Əlavə istək",
    "Additional request",
    "Дополнительный запрос",
  ];

  // Find the additional request criteria
  const additionalRequestCriteria = getServiceCriterias.find((criteria) =>
    additionalRequestNames.includes(
      criteria.serviceCriteria.serviceCriteriaNames[0].name
    )
  );

  // Filter out the additional request criteria from the main array
  const sortedCriterias = getServiceCriterias.filter(
    (criteria) =>
      !additionalRequestNames.includes(
        criteria.serviceCriteria.serviceCriteriaNames[0].name
      )
  );

  // If the additional request criteria is found, append it to the end of the sorted array
  if (additionalRequestCriteria) {
    sortedCriterias.push(additionalRequestCriteria);
  }

  const [showAdditional, setshowAdditional] = useState(false);

  const toggleAdditionalVisibility = () => {
    setshowAdditional(true);
  };

  const toggleAdditionalUnvisibility = () => {
    setshowAdditional(false);
  };

  const filterType2 = getServiceCriterias.filter((obj) => {
    return typeof obj.serviceCriteria.filterType !== "undefined"
      ? obj.serviceCriteria.filterType === 2
      : "" in obj.children;
  });

  useEffect(() => {
    setshowAdditional(false);
  }, [selectedSub, selectedSub2]);


  return (
    <div id="criteriasSection">
      <div className="flex flex-col pt-[30px] gap-y-[30px]">
        {/* only for filterType2 */}
        <div
          className={
            filterType2.length > 1
              ? " lg:bg-[#F7F9FC] lg:p-[20px] rounded-[10px] gap-y-[20px]"
              : "hidden"
          }
        >
          <div className="flex flex-col ">
            <h5
              className={`font-semibold text-[16px] leading-[18px] text-[#F64242] pb-[10px] lg:pb-[5px] 
            ${priceBeforePromo > 0 ? "" : "animate-slide"}`}
            >
              Meyarları seçin
            </h5>
            <div
              className={`grid gap-y-[20px] lg:grid-cols-${
                filterType2.length === 2 ? "2" : "4"
              }`}
            >
              {Object.values(filterType2).map(
                ({ serviceCriteria, serviceCriteries }, index) => (
                  <div key={index} className="flex flex-col gap-y-[5px]">
                    <RadioButtonCriteria
                      whichComponent="criterias"
                      {...{ selectedRadioId }}
                      name={serviceCriteria.serviceCriteriaNames[0].name}
                      checked={
                        selectedRadioName ===
                        serviceCriteria.serviceCriteriaNames[0].name
                      }
                      handleChange={(value, criteriaId) =>
                        handleChange2(
                          serviceCriteria.serviceCriteriaNames[0].name,
                          0
                        )
                      }
                      criteriaId={serviceCriteria.id}
                      index={index}
                    />
                    <div
                      className={`
                  xs:w-[220px]
                        screen360:w-[255px]
                        screen375:w-[275px]
                        screen390:w-[290px]
                        screen412:w-[310px]
                        screen428:w-[330px]
                        sm:w-[450px]
                        md:w-[590px]
                        lg:w-[160px]
                  ${
                    serviceCriteria.serviceCriteriaNames[0].name ===
                    selectedRadioName
                      ? ""
                      : "hidden"
                  }`}
                    >
                      <InputCustomized
                        label="Kv.m"
                        type="number"
                        inputTextId={serviceCriteria.id}
                        updateInputText={handleDataUpdateForInputText}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {Object.values(
          showAdditional && sortedCriterias
            ? getServiceCriterias
            : !showAdditional && getServiceCriterias.length === 1
            ? sortedCriterias
            : sortedCriterias.slice(0, -1)
        ).map(({ serviceCriteria, serviceCriteries }, index) => (
          <div
            key={index}
            className={
              filterType2.length > 1 && serviceCriteria.filterType === 2
                ? "hidden"
                : "lg:bg-[#F7F9FC] lg:p-[20px] rounded-[10px] gap-y-[20px]"
            }
          >
            {index === 0 ? (
              <p
                className={`text-[16px] font-bold text-danger pb-[10px] lg:pb-[15px] ${
                  priceBeforePromo > 0 ? "" : "animate-slide"
                }`}
              >
                Meyarları seçin
              </p>
            ) : (
              ""
            )}
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-x-[10px] pb-[10px] lg:pb-[5px]">
                <h5
                  className={`"font-semibold text-[16px] leading-[18px]" ${
                    additionalRequestNames.includes(
                      serviceCriteria.serviceCriteriaNames[0].name
                    )
                      ? "font-semibold text-[#F64242] lg:text-black500"
                      : "text-black500"
                  }`}
                >
                  {serviceCriteria.serviceCriteriaNames[0].name}
                </h5>
                {additionalRequestNames.includes(
                  serviceCriteria.serviceCriteriaNames[0].name
                ) ? (
                  <button className="" onClick={toggleAdditionalUnvisibility}>
                    <Image
                      src={close_red}
                      alt="close_red_svg"
                      className="lg:hidden"
                      width={22}
                      height={22}
                      unoptimized
                    />
                    <Image
                      src={close}
                      alt="close_svg"
                      className="hidden lg:block"
                      width={22}
                      height={22}
                      unoptimized
                    />
                  </button>
                ) : (
                  ""
                )}
              </div>

              <div className="flex flex-row gap-x-[5px] lg:hidden">
                {serviceCriteria.serviceCriteriaNames[0]?.text?.length > 0 ? (
                  <Image
                    src={info_btn}
                    alt="infobtn"
                    className="w-[20px] h-[20px]"
                    loading="lazy"
                    unoptimized
                  />
                ) : (
                  ""
                )}
                {serviceCriteria.serviceCriteriaNames[0]?.text?.length > 0 ? (
                  <div className="flex flex-row items-center gap-x-[5px] pb-[10px]">
                    <div
                      onClick={() => {
                        toggleDropdown(index);
                      }}
                      className="text-black"
                      dangerouslySetInnerHTML={{
                        __html: `${
                          infoBtn[index]
                            ? serviceCriteria.serviceCriteriaNames[0].text
                            : serviceCriteria.serviceCriteriaNames[0].text?.slice(
                                0,
                                35
                              )
                        }`
                          ?.replaceAll(
                            "<ul>",
                            '<ul class="text-[12px] list-disc list-inside py-[3px] mt-[3px] mb-[7px] ">'
                          )
                          .replaceAll(
                            "<p",
                            '<p class="text-[12px] leading-[22px] "'
                          ),
                      }}
                    />

                    <p
                      onClick={() => {
                        toggleDropdown(index);
                      }}
                      className={`text-cagiraz ${
                        infoBtn[index]
                          ? "hidden"
                          : "text-[12px] leading-[15px] font-semibold block text-cagiraz "
                      }`}
                    >
                      ...{messages.more}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* flex flex-wrap gap-[15px] py-0 lg:py-[5px] lg:order-1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[10px]">
              {serviceCriteries.length === 0 &&
              serviceCriteria.filterType === 1 ? (
                <InputPlusMinus
                  updateCriteriaValue={setPlusMinusValue}
                  updateCriteriaId={setPlusMinusId}
                  criteriaId={serviceCriteria.id}
                />
              ) : serviceCriteries.length === 0 &&
                serviceCriteria.filterType === 2 ? (
                <div className={filterType2.length === 1 ? "" : "hidden"}>
                  <InputCustomized
                    label="Kv.m"
                    type="number"
                    inputTextId={serviceCriteria.id}
                    updateInputText={handleDataUpdateForInputText}
                  />
                </div>
              ) : (
                ""
              )}

              {serviceCriteries.map(
                ({ serviceCriteriaNames, filterType, id }, index) => (
                  <div key={index}>
                    {/* {serviceCriteriaNames[0].text} */}
                    {filterType === 3 || filterType === 0 ? (
                      // <checkbox
                      //   name={serviceCriteriaNames[0].name}
                      //   criteriaId={id}
                      //   sendDataToParent={handleDataFromChild}
                      // />
                      <CustomInput
                        {...{ index }}
                        desc={serviceCriteriaNames[0].text}
                        name={serviceCriteriaNames[0].name}
                        updateCriteriaValue={setMultiNumberValue}
                        updateCriteriaId={setMultiNumberId}
                        criteriaId={id}
                        updateMultiNumberName={setMultiNumberName}
                      />
                    ) : filterType === 4 ? (
                      <RadioButtonCriteria
                        desc={serviceCriteriaNames[0].text}
                        {...{ serviceCriteries }}
                        {...{ selectedRadioId, index }}
                        whichComponent="criterias"
                        name={serviceCriteriaNames[0].name}
                        checked={
                          selectedRadioName === serviceCriteriaNames[0].name
                        }
                        handleChange={(value, criteriaId) =>
                          handleChange(serviceCriteriaNames[0].name, id)
                        }
                        criteriaId={id}
                        index={index}
                      />
                    ) : filterType === 5 ? (
                      <CustomInput
                        name={serviceCriteriaNames[0].name}
                        updateCriteriaValue={setMultiNumberValue}
                        updateCriteriaId={setMultiNumberId}
                        criteriaId={id}
                        updateMultiNumberName={setMultiNumberName}
                      />
                    ) : (
                      serviceCriteriaNames[0].name
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
        {/*  */}
        <div
          className={`${
            !showAdditional && getServiceCriterias.length > 1
              ? "flex flex-row gap-x-[10px] items-center lg:pt-[20px] lg:pl-[20px]"
              : "hidden"
          }`}
        >
          <h5 className="animate-slide font-semibold text-[16px] leading-[18px] text-[#F64242] lg:text-black500">
            Əlavə istək
          </h5>
          <button className="" onClick={toggleAdditionalVisibility}>
            <Image
              src={open_red}
              alt="open_red_svg"
              className="lg:hidden"
              width={22}
              height={22}
              unoptimized
            />
            <Image
              src={open}
              alt="open_svg"
              className="hidden lg:block"
              width={22}
              height={22}
              unoptimized
            />
          </button>
        </div>

        {/*  */}
        <div
          className={`${showTextarea ? "flex flex-col lg:flex-row" : "hidden"}`}
        >
          {isOpen && <Textarea sendMessage={handleMessage} />}
          <button
            className={`pl-[10px] mx-auto lg:m-0 font-medium lg:font-extrabold text-[12px] lg:text-[14px] 
            leading-[18px] lg:leading-[21px] text-cagiraz ${
              isOpen ? "hidden" : ""
            }`}
            onClick={handleToggle}
          >
            {isOpen ? "" : messages["additional-notes"]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Criterias;