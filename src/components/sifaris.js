import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import dynamic from "next/dynamic";
import SuccessPage from "@/src/components/others/SuccessPage";
import Criterias from "@/src/components/form/criterias";
import Loading from "@/src/components/Loading";
import TabBar from "@/src/components/mobile/TabBar";

import {
  PrimarySmBtn,
  PrimaryOutlineSmBtn,
  LinkSmBtn,
} from "@/src/components/buttons";
import { Download_image, PaymentMethod, Calendar } from "@/src/components/form";
const Toggle = dynamic(() => import("@/src/components/form/toggle"), {
  ssr: false,
});
const Qiymet = dynamic(() => import("@/src/components/form/qiymet"), {
  ssr: false,
});
const Dropdown = dynamic(() => import("@/src/components/form/dropdown"), {
  ssr: false,
});

const ModalStandart = dynamic(
  () => import("@/src/components/modal/ModalStand"),
  {
    ssr: false,
  }
);

const InputBtnNbTransition = dynamic(
  () => import("@/src/components/input/inputBtnNbTransition"),
  {
    ssr: false,
  }
);

/* -------------------------------------------------------------------------- */
/*                                   Sifaris                                  */
/* -------------------------------------------------------------------------- */
function Sifaris({
  getMainServices,
  getSubServices,
  defaultMain,
  defaultSub,
  mainInfoAfterEndPoint,
}) {
  const router = useRouter();
  const intl = useIntl();
  const chosenLang = intl.locale;
  const messages = intl.messages;

  /* ---------------------------------- mainServices and subServices functionality ---------------------------------- */
  // State initialization
  const [selectedMain, setSelectedMain] = useState(
    defaultMain.serviceNames?.[0]?.name
  );
  const [selectedSub, setSelectedSub] = useState("");

  useEffect(() => {
    setSelectedMain(selectedMain);
    setSelectedSub(getSubServices[0]?.serviceNames?.[0]?.name);
  }, [selectedMain, getSubServices, defaultSub]);

  /* ----------------------------------  sub2Services functionality ---------------------------------- */
  // State initialization
  const [selectedSub2, setSelectedSub2] = useState("");
  const [getSub2Services, setgetSub2Services] = useState([]);

  // Event handlers
  const handleSub2Select = (sub2Service) => {
    setSelectedSub2(sub2Service);
  };

  // Effects
  useEffect(() => {
    if (!defaultSub?.id) return;
    axios
      .get(
        `https://api.cagir.az/api/service/getSubServicesByParentId?parentId=${defaultSub?.id}`,
        {
          headers: {
            "Accept-Language": chosenLang,
          },
        }
      )
      .then((response) => {
        setgetSub2Services(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [defaultSub, chosenLang]);

  // Utility functions
  const findSub2InfoByName = (sub2Services, name) => {
    const sub2Service =
      sub2Services.find((obj) => obj.serviceNames?.[0]?.name === name) || {};
    return {
      id: sub2Service?.id || null,
      text: sub2Service?.serviceNames?.[0]?.text || null,
      name: sub2Service?.serviceNames?.[0]?.name || null,
    };
  };

  // Derived state
  const isSub2ElementsExist = getSub2Services.length > 0;
  const selectedSub2Service = findSub2InfoByName(getSub2Services, selectedSub2);
  /* ----------------------------------  Select criterias ---------------------------------- */
  const [serviceIdForCriteria, setServiceIdForCriteria] = useState(null);

  useEffect(() => {
    setServiceIdForCriteria(
      isSub2ElementsExist ? selectedSub2Service.id : defaultSub?.id
    );
  }, [isSub2ElementsExist, selectedSub2Service, defaultSub]);

  /* ---------------------------------- Calculating Price of the Service ---------------------------------- */
  // State initialization
  const [priceToSifaris, setPriceToSifaris] = useState(0);

  const handlePriceFromCriterias = (data) => {
    setPriceToSifaris(data);
  };

  const [orderDetailsToSifaris, setorderDetailsToSifaris] = useState(null);

  const handleDetailsFromCriterias = (data) => {
    setorderDetailsToSifaris(data);
  };
  // console.log(orderDetailsToSifaris)
  const [whichServiceCategory, setWhichServiceCategory] = useState(null);

  const handleCategoryLevelFromDropdown = (data) => {
    setWhichServiceCategory(data);
  };

  // Props preparation
  const toggleProps = {
    selectedMain,
    descMain: defaultMain.serviceNames?.[0].text,
    selectedSub: selectedSub,
    descSub: defaultSub?.serviceNames?.[0].text,
    selectedSub2,
    descSub2: selectedSub2Service.text,
    messages,
    chosenLang,
  };

  const dropdownProps = {
    onSelectMainService: setSelectedMain,
    getMainServices,
    onSelectSubService: setSelectedSub,
    getSubServices,
    onSelectSub2Service: handleSub2Select,
    getSub2Services,
    defaultMain,
    defaultSub,
    messages,
    chosenLang,
    mainInfoAfterEndPoint,
  };
  /* ---------------------------------- Creating order ---------------------------------- */

  // States Initialization
  const [childUploadImage, setChildUploadImage] = useState(null);
  const [addNumber, setAddNumber] = useState("");
  const [isOrderPassed, setIsOrderPassed] = useState(false);
  const [orderPassed, setOrderPassed] = useState(null);

  const handleChildImageUpload = (uploadImage) => {
    setChildUploadImage([
      { imageBase64: uploadImage?.[0]?.imageBase64 },
      { imageExtension: uploadImage?.[0]?.imageData?.name },
    ]);
  };

  const handleDataInputNumber = (data) => {
    setAddNumber(data);
  };

  const handleDataFromChildBtn = (data) => {
    setIsOrderPassed(data);
  };

  const [serviceDate, setserviceDate] = useState(new Date());
  const handleInputValueChange = (newValue) => {
    setserviceDate(newValue.replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1"));
  };

  const [additionalNotes, setadditionalNotes] = useState(null);

  const handleNotesDataFromCriterias = (data) => {
    setadditionalNotes(data);
  };
  const serviceName = `${defaultMain.serviceNames[0].name} -> ${
    defaultSub?.serviceNames[0].name
  }${selectedSub2Service.name ? " -> " + selectedSub2Service.name : ""}`;

  // Object Preparation
  const date = {
    amount: priceToSifaris,
    payType: 2,
    address: "",
    note: additionalNotes,
    phoneNumber: addNumber,
    startDate: serviceDate,
    orderDetails: orderDetailsToSifaris,
    orderImages: childUploadImage,
    serviceName: serviceName,
  };

  // Order Creation for desktop
  const [orderCreated, setOrderCreated] = useState(false);
  useEffect(() => {
    if (
      isOrderPassed &&
      !orderCreated &&
      date.phoneNumber.length === 10 &&
      selectedSub2?.length !== 0
    ) {
      axios
        .post("https://api.cagir.az/api/order/v3/create", date, {
          headers: {
            "Accept-Language": "az",
          },
        })
        .then((response) => {
          setOrderPassed(response.data.isSuccess);
          if (response.data.isSuccess) {
            setOrderCreated(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isOrderPassed, orderCreated, selectedSub2]);

  // Geri button
  const goBack = () => {
    router.back(); // Navigates back to the previous page
  };

  const sifirla = () => {
    router.reload();
    window.scrollTo(0, 0);
  };

  const [succesPage, setSuccesPage] = useState(false);

  useEffect(() => {
    if (isOrderPassed) {
      setTimeout(() => {
        window.scrollTo(0, 0);
        setSuccesPage(true);
      }, 500);
    }
  }, [isOrderPassed]);

  // criteria desc from Criterias
  const [criteriaDesc, setcriteriaDesc] = useState(null);

  const handleDataFromCriterias = (data) => {
    setcriteriaDesc(data);
  };

  const isH1Exists = defaultSub?.serviceNames?.[0]?.name;

  // scroll to Criterias section
  useEffect(() => {
    if (priceToSifaris === 0) null;
    const target = document.getElementById("criteriasSection");
    if (target && priceToSifaris > 0 && window.innerWidth < 1020) {
      const targetPosition = target.getBoundingClientRect().top;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const navbarHeight = 20;
      const calculatedScroll = scrollTop + targetPosition - navbarHeight;
      window.scrollTo({ top: calculatedScroll, behavior: "smooth" });
    }
  }, [priceToSifaris]);

  return (
    <div>
      {!isH1Exists && <Loading />}
      <div className={`${isH1Exists ? "" : "hidden"}`}>
        {!isOrderPassed && (
          <div
            className={`flex flex-col justify-center 
          lg:flex-row lg:gap-x-[30px] xl:gap-x-[40px] 2xl:gap-x-[60px]
      pb-[20px] w-full lg:px-[30px] xl:px-[100px]  ${succesPage ? "" : ""}`}
          >
            {/* Right side of first part in Sifaris */}
            <div className="w-full z-[10] lg:z-auto pt-[20px] lg:pt-0">
              {!isH1Exists ? (
                <Loading />
              ) : (
                <div>
                  <h1 className="my-h2 mt-[20px] lg:mt-[60px] mb-0 lg:mb-[15px] text-center pb-[15px] lg:pb-[15px]">
                    {defaultSub?.serviceNames?.[0].name}
                  </h1>
                </div>
              )}
              <div className="sticky top-[45px] lg:hidden z-50 pb-[20px]">
                <TabBar {...{ messages }} />
              </div>

              {/* Dropdowns for services */}
              <div
                className={isH1Exists ? "flex flex-row gap-x-[20px]" : "hidden"}
              >
                <div className="flex flex-col w-full lg:w-[800px]">
                  <Dropdown
                    subName={defaultSub?.serviceNames?.[0].name}
                    {...dropdownProps}
                    onDataCallback={handleCategoryLevelFromDropdown}
                  />

                  <Criterias
                    sendPriceToSifaris={handlePriceFromCriterias}
                    sendDetailsToSifaris={handleDetailsFromCriterias}
                    {...{
                      serviceIdForCriteria,
                      selectedMain,
                      selectedSub,
                      selectedSub2,
                    }}
                    sendCriteriaDescToSifaris={handleDataFromCriterias}
                    sendAdditionalNote={handleNotesDataFromCriterias}
                  />
                  <div className="flex flex-col lg:flex-row  lg:justify-between">
                    <div
                      className="hidden lg:flex flex-col justify-between w-full
              lg:bg-[#F7F9FC] lg:p-[20px] rounded-[10px]
              "
                    >
                      <h4
                        className="font-semibold lg:font-bold text-[16px] lg:text-[20px] leading-[14px] lg:leading-[30px] 
        text-black500 pb-[20px] lg:pb-[30px]"
                      >
                        Sorğunu tamamla
                      </h4>
                      <div className="flex flex-row gap-y-[15px] xl:gap-y-[20px] lg:justify-between w-full">
                        <div>
                          <p className="hidden lg:block font-semibold text-[12px] leading-[18px] pb-[5px] text-black">
                            {messages["select-date"]}
                          </p>
                          <Calendar
                            onInputValueChange={handleInputValueChange}
                          />
                        </div>

                        <Download_image
                          onImageUpload={handleChildImageUpload}
                          {...{ messages }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:justify-between w-full pt-[30px]">
                    <div className="hidden lg:block lg:bg-[#F7F9FC] lg:p-[20px] rounded-[10px]">
                      <PaymentMethod {...{ messages }} />
                    </div>
                    <div className="flex flex-row gap-x-[20px] w-full justify-end pt-[60px] lg:pt-[20px]">
                      <LinkSmBtn
                        onClick={goBack}
                        btnName={messages["btn-back"]}
                        classNames="hidden lg:block"
                      />

                      <PrimaryOutlineSmBtn
                        onClick={sifirla}
                        btnName={messages.reset}
                        classNames="hidden lg:block"
                      />

                      <PrimarySmBtn
                        onClick={() => window.my_modal_10.showModal()}
                        btnName="Sorğu göndər"
                        classNames="hidden lg:block w-full"
                      />
                      <PrimarySmBtn
                        onClick={() => window.my_modal_10.showModal()}
                        btnName="Qiyməti öyrən"
                        classNames="block lg:hidden w-full"
                      />

                      <ModalStandart
                        dialogId="my_modal_10"
                        content={
                          <div>
                            <div className="">
                              {priceToSifaris > 0 ? (
                                <InputBtnNbTransition
                                  name="Sürətli sifariş"
                                  id="inputBtn"
                                  numberToParent={handleDataInputNumber}
                                  sendDataToParent={handleDataFromChildBtn}
                                  {...{ messages }}
                                />
                              ) : (
                                <div className="flex items-center justify-center ">
                                  <h2 className="my-h3 pt-[15px] text-black">
                                    {serviceIdForCriteria
                                      ? "Zəhmət olmasa minimum bir meyar seçin."
                                      : "Zəhmət olmasa xidməti seçin."}
                                  </h2>
                                </div>
                              )}
                            </div>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="w-[300px] z-20 sticky top-[200px] h-[300px]  bg-white 
                shadow-dropblack25 lg:shadow-none rounded-[10px]
              hidden lg:block"
                >
                  <Qiymet
                    priceBeforePromo={priceToSifaris}
                    {...{ messages, criteriaDesc }}
                  />
                </div>
              </div>
              {/* service description part */}
              {defaultMain.serviceNames?.[0].text && isH1Exists && (
                <div className="pt-[60px]">
                  <Toggle {...toggleProps} {...{ whichServiceCategory }} />
                </div>
              )}
            </div>
          </div>
        )}
        {succesPage && <SuccessPage />}
      </div>
    </div>
  );
}

export default Sifaris;
