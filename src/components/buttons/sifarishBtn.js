import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

function SifarishBtn({ classNames, messages }) {
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

  const btnClasses = `
    w-[150px] lg:w-[250px] font-extraBold text-[14px] lg:text-[18px] leading-[22px] lg:leading-[27px]
    px-[26px] py-[10px] lg:px-[56px] lg:py-[16px] transition duration-300 
    rounded-[30px] transform hover:-translate-y-[5px] shadow-btnShdw 
    bg-cagiraz text-white focus:outline-none
  `;

  const isPathIncluded = () => {
    return linkComponentPaths.includes(router.pathname);
  };

  const [mainServices, setMainServices] = useState(null);
  const [mainServiceId, setMainServiceId] = useState(null);
  const [subServices, setSubServices] = useState(null);
  // Fetch Main Services
  useEffect(() => {
    if (["/", "/[mainService]"].includes(router.pathname)) {
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
    if (mainServiceData) {
      setMainServiceId(mainServiceData.id);
    }
  }, [mainServices, router.query.mainService]);

  // Fetch Sub Services
  useEffect(() => {
    if (mainServiceId) {
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
    [`/${router.query.mainService}`]: `/${router.query.mainService}/${subService}`,
    "/clean": "/temizlik-xidmeti/ev-temizleme",
    "/climate": "/kondisioner-ustasi/kondisioner-temiri",
    "/combi": "/kombi-ustasi/kombi-temiri",
    "/master": "/usta/soyuducu-ustasi",
    "/plumber": "/santexnik-ustasi/kanalizasiya-ustasi",
  };

  return (
    <div className={classNames}>
      {isPathIncluded() ? (
        <div
          onClick={() =>
            (window.location.href =
              sifarisBtnObject[router.pathname] ||
              `/${messages["cleaning-service-url"]}/${messages["house-cleaning-url"]}`)
          }
        >
          <button className={btnClasses}>{messages["price"]}</button>
        </div>
      ) : (
        <Link
          href={
            sifarisBtnObject[router.asPath] ||
            `/${messages["cleaning-service-url"]}/${messages["house-cleaning-url"]}`
          }
        >
          <button className={btnClasses}>{messages["price"]}</button>
        </Link>
      )}
    </div>
  );
}

export default SifarishBtn;
