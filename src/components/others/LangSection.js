import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import axios from "axios";
import icon_az from "@/src/icons/icon_az.svg";
import icon_en from "@/src/icons/icon_en.svg";
import icon_ru from "@/src/icons/icon_ru.svg";
import Link from "next/link";

const createOptionForLang = (lang, value, icon, altText) => ({
  lang,
  value,
  label: <Image src={icon} alt={altText} unoptimized />,
});

const options = [
  createOptionForLang("az", 0, icon_az, "Azerbaijan flag"),
  createOptionForLang("en", 1, icon_en, "United Kingdom flag"),
  createOptionForLang("ru", 2, icon_ru, "Russia flag"),
];

const getTitleUrl = (lang, data) =>
  data?.find((obj) => obj.language === lang)?.titleUrl ?? "";

const LangSection = () => {
  const router = useRouter();
  const { mainService, subService } = router.query;

  const intl = useIntl();
  const chosenLang = intl.locale;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((opt) => opt.lang === chosenLang) || options[0]
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // setSelectedOption(option, () => setIsDropdownOpen(false));
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setSelectedOption(options.find((opt) => opt.lang === chosenLang));
  }, [chosenLang]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function isPathMatch(routerAsPath, linkComponentPaths) {
    return linkComponentPaths.some((path) =>
      new RegExp(`^${path}(\\?.*)?$`).test(routerAsPath)
    );
  }

  const titleUrlObject = {
    "/clean": "temizlik-xidmeti",
    "/climate": "kondisioner-ustasi",
    "/combi": "kombi-ustasi",
    "/master": "usta",
    "/plumber": "santexnik-ustasi",
  };

  const linkComponentPaths = Object.keys(titleUrlObject);

  const isPathIncluded = isPathMatch(router.asPath, linkComponentPaths);

  //////////////////////////////////////////
  const [findServiceNameForLangMain, setFindServiceNameForLangMain] =
    useState(null);
  const [findServiceNameForLangSub, setFindServiceNameForLangSub] =
    useState(null);

  useEffect(() => {
    // if (
    //   router.pathname.includes(
    //     "/[mainService]",
    //     "/[mainService]/[subService]"
    //   ) ||
    //   isPathIncluded
    // ) {
    axios
      .post(
        "https://api.cagir.az/api/service/getServiceTitleUrls",
        {
          mainService: titleUrlObject[router.pathname] ?? mainService,
          subService: subService,
        },
        {
          headers: {
            "Accept-Language": "az",
          },
        }
      )
      .then((response) => {
        setFindServiceNameForLangMain(response.data.result.mainService);
        setFindServiceNameForLangSub(response.data.result.subService);
      })
      .catch((error) => {
        console.error(error);
      });
    // } else null;
  }, [chosenLang, mainService]);

  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    //function to get the titleUrls respect to the language
    const newTitleUrl = `/${getTitleUrl(
      selectedOption.lang,
      findServiceNameForLangMain
    )}`;

    // const newTitleUrl = `/${getTitleUrl(
    //   selectedOption.lang,
    //   findServiceNameForLangMain
    // )}/${getTitleUrl(selectedOption.lang, findServiceNameForLangSub)}`;

    // Check if the current pathname matches any of the excluded paths
    const shouldExclude = router.pathname in titleUrlObject;
    // If not excluded, then push the new locale to the router
    if (
      !isInitialRender &&
      !shouldExclude &&
      !router.pathname.includes("/[mainService]", "/[mainService]/[subService]")
    ) {
      router.push(router.pathname, router.asPath, {
        locale: selectedOption.lang,
      });
    } else if (
      !isInitialRender &&
      (shouldExclude ||
        router.pathname.includes(
          "/[mainService]",
          "/[mainService]/[subService]"
        ))
    ) {
      router.push(`/${newTitleUrl}`, `/${newTitleUrl}`, {
        locale: selectedOption.lang,
      });
    }
    // After the first render, set isInitialRender to false
    if (isInitialRender) {
      setIsInitialRender(false);
    }
  }, [selectedOption.lang]);

  const calculateLanguageUrl = (lang) => {
    //function to get the titleUrls respect to the language

    const newTitleUrl = `/${getTitleUrl(lang, findServiceNameForLangMain)}`;

    // Check if the current pathname matches any of the excluded paths
    const shouldExclude = router.pathname in titleUrlObject;
    // If not excluded, then push the new locale to the router
    if (
      !shouldExclude &&
      !router.pathname.includes("/[mainService]", "/[mainService]/[subService]")
    ) {
      return router.pathname;
    } else if (
      shouldExclude ||
      router.pathname.includes("/[mainService]", "/[mainService]/[subService]")
    ) {
      return newTitleUrl;
    } else return router.pathname;
  };

  return (
    <div>
      <div
        className={`absolute  rounded-full bg-gray900 bg-opacity-30 right-[50.2px] lg:right-[-1.3px] w-[25px] lg:w-[28px] h-[83px] lg:h-[98px] ${
          isDropdownOpen || isHovered ? "" : "hidden"
        }`}
      ></div>
      <div className="dropdown inline-block item-center">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="inline-flex items-center pt-[10px] w-[20px] lg:w-[25px] h-[20px] lg:h-[25px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>{selectedOption.label}</span>
        </button>
        <ul
          className={`dropdown-menu absolute mt-[-6px] ml-[-2px] ${
            isDropdownOpen ? "block" : "hidden"
          }`}
        >
          {options
            .filter((option) => option.value !== selectedOption.value)
            .map((option, index) => (
              <li
                key={index}
                className="bg-transparent rounded-full
                      mt-[5px]  hover:bg-[#B5B5B5] ml-[1px] lg:ml-0 w-[22px] h-[22px] lg:w-[27px] lg:h-[27px]"
              >
                {/* <button
                  onClick={() => handleOptionClick(option)}
                  className="ml-[1px] mt-[0.9px] w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]"
                >
                  {option.label}
                </button> */}
                <Link
                  href={`${calculateLanguageUrl(option.lang)}`}
                  locale={option.lang}
                  // onClick={() => handleOptionClick(option)}
                  className="ml-[1px] mt-[0.9px] w-[20px] h-[20px] lg:w-[25px] lg:h-[25px] block"
                >
                  {option.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LangSection;
