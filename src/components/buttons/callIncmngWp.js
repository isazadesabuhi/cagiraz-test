import Image from "next/image";
import Link from "next/link";
import call from "@/src/icons/call_incmng_wp/call.svg";
import whatsapp from "@/src/icons/call_incmng_wp/whatsapp.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { applyCreate } from "@/src/api";

function CallIncmngWp({ classNames, messages }) {
  const intl = useIntl();
  const chosenLang = intl.locale;
  const router = useRouter();
  const linkComponentPaths = [
    "/master",
    "/clean",
    "/climate",
    "/combi",
    "/plumber",
  ];

  const [applyTypeRequest, setApplyTypeRequest] = useState("");

  const onButtonClick = (applyType) => {
    applyCreate({
      applyType,
      onSuccess: (data) => setApplyTypeRequest(data),
    });
  };

  const isPathIncluded = () => {
    return linkComponentPaths.includes(router.pathname);
  };

  const [mainServices, setMainServices] = useState(null);
  const [mainServiceId, setMainServiceId] = useState(null);
  const [subServices, setSubServices] = useState(null);

  // Fetch Main Services
  useEffect(() => {
    if (
      window.innerWidth >= 1020 &&
      ["/", "/[mainService]"].includes(router.pathname)
    ) {
      axios
        .get(`https://api.cagir.az/api/service/getAllForFront`, {
          headers: { "Accept-Language": chosenLang },
        })
        .then((response) => {
          setMainServices(response.data.result);
        })
        .catch((error) => console.error(error));
    }
  }, [chosenLang]);

  // Set Main Service ID
  useEffect(() => {
    const mainServiceData = mainServices?.find(
      (obj) => obj.serviceNames[0]?.titleUrl === router.query.mainService
    );
    if (
      mainServiceData &&
      window.innerWidth >= 1020 &&
      router.pathname === "/[mainService]"
    ) {
      setMainServiceId(mainServiceData.id);
    }
  }, [mainServices, router.query.mainService]);

  // Fetch Sub Services
  useEffect(() => {
    if (mainServiceId && window.innerWidth >= 1020) {
      axios
        .get(
          `https://api.cagir.az/api/service/getSubServicesByParentId?parentId=${mainServiceId}`,
          {
            headers: { "Accept-Language": chosenLang },
          }
        )
        .then((response) => {
          setSubServices(response.data.result);
        })
        .catch((error) => console.error(error));
    }
  }, [chosenLang, mainServiceId]);

  const subService = subServices?.[0]?.serviceNames[0].titleUrl;

  const sifarisBtnObject = {
    [`/${router.query.mainService}`]: subService
      ? `/${router.query.mainService}/${subService}`
      : `/${router.query.mainService}`,
    "/clean": "/temizlik-xidmeti/ev-temizleme",
    "/climate": "/kondisioner-ustasi/kondisioner-temiri",
    "/combi": "/kombi-ustasi/kombi-temiri",
    "/master": "/usta/soyuducu-ustasi",
    "/plumber": "/santexnik-ustasi/kanalizasiya-ustasi",
  };
  return (
    <div className={classNames}>
      <div className="flex flex-row rounded-[30px] bg-[#202020] bg-opacity-30 p-[2px] gap-x-[2px]">
        <Link
          onClick={() => onButtonClick(8)}
          className="group flex relative items-center justify-center w-[58px] h-[58px] bg-[#202020] bg-opacity-5 hover:bg-opacity-30 rounded-full"
          href="tel:994703482606"
        >
          <span>
            <div className="relative group">
              <Image
                src={call}
                alt="call_icon"
                className="transition duration-300 ease-in-out"
                loading="lazy"
                unoptimized
              />
            </div>
          </span>
          <span
            className="bottom-[85px] rounded-[5px] py-[4px] px-[6px] font-medium
                    text-[12px] leading-[15px] bg-black500 text-white group-hover:opacity-100 transition-opacity absolute left-1/2
                    -translate-x-1/2 translate-y-full opacity-0"
          >
            Zəng
          </span>
        </Link>

        {isPathIncluded() ? (
          <a
            href={
              sifarisBtnObject[router.pathname] ||
              `/${messages["cleaning-service-url"]}/${messages["house-cleaning-url"]}`
            }
            className="font-extraBold text-[14px] lg:text-[18px] leading-[22px] lg:leading-[27px] group flex  items-center px-[20px] justify-center  bg-[#202020] text-white bg-opacity-5 hover:bg-opacity-30 rounded-full"
          >
            {/* {messages["order-create"]} */}
            Qiyməti öyrən
          </a>
        ) : (
          <Link
            href={
              sifarisBtnObject[router.asPath] ||
              `/${messages["cleaning-service-url"]}/${messages["house-cleaning-url"]}`
            }
            className="font-extraBold text-[14px] lg:text-[18px] leading-[22px] lg:leading-[27px] group flex  items-center px-[20px] justify-center  bg-[#202020] text-white bg-opacity-5 hover:bg-opacity-30 rounded-full"
          >
            {/* {messages["order-create"]} */}
            {messages["price"]}
          </Link>
        )}

        <Link
          onClick={() => onButtonClick(9)}
          className="group flex relative items-center justify-center w-[58px] h-[58px] bg-[#202020] bg-opacity-5 hover:bg-opacity-30 rounded-full"
          href="https://wa.me/994703482606"
        >
          <span>
            <div className="relative group">
              <Image
                src={whatsapp}
                alt="whatsapp_icon"
                className="transition duration-300 ease-in-out"
                loading="lazy"
                unoptimized
              />
            </div>
          </span>
          <span
            className="bottom-[85px] rounded-[5px] py-[4px] px-[6px] font-medium
                  text-[12px] leading-[15px] bg-black500 text-white group-hover:opacity-100 transition-opacity absolute left-1/2
                  -translate-x-1/2 translate-y-full opacity-0"
          >
            WhatsApp
          </span>
        </Link>
      </div>
    </div>
  );
}
export default CallIncmngWp;
