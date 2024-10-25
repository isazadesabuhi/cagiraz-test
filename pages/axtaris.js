import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import SearchInputMd from "@/src/components/input/inputSearchMd";
import arrow_right from "@/src/icons/arrow_right.svg";
import close from "@/src/icons/header/close.svg";
import Head from "next/head";
function SearchService({ mainServices, trendServices }) {
  const router = useRouter();
  /* ----------------- mainServices ----------------- */
  const intl = useIntl();
  const chosenLang = intl.locale;
  const messages = intl.messages;

  // getting all mainService ids in an array.
  const mainServiceIds = mainServices.map((child) => child.id);

  // mainServiceId-key,mainServiceNameUrl-value
  const mainServiceNameUrls = mainServices.map(
    (child) => child.serviceNames[0].titleUrl
  );
  const mainServiceIdNameUrls = {};
  for (let i = 0; i < mainServiceIds.length; i++) {
    const id = mainServiceIds[i];
    const nameUrl = mainServiceNameUrls[i];
    mainServiceIdNameUrls[id] = nameUrl;
  }

  /* ----------------- subServices ----------------- */
  const [subServices, setSubServices] = useState([]);

  useEffect(() => {
    const fetchSubServices = async () => {
      try {
        const subServicePromises = mainServiceIds.map((id) =>
          axios.get(
            `https://api.cagir.az/api/service/getSubServicesByParentId?parentId=${id}`,
            {
              headers: {
                "Accept-Language": chosenLang,
              },
            }
          )
        );

        const subServiceResponses = await Promise.all(subServicePromises);
        const subServiceData = subServiceResponses
          .map((response) => response.data.result)
          .flat();

        setSubServices(subServiceData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubServices();
  }, [mainServices, chosenLang]);

  /* ----------------- search functionality ----------------- */
  // ekranda gorunen updatedSubServiceObject.It updates in each search
  const updatedSubServiceObject = subServices;
  const [searchVal, setSearchVal] = useState("");

  function handleInputChange(event) {
    setSearchVal(event.target.value);
  }

  useEffect(() => {
    if (searchVal > 2) {
      setSearchVal(event.target.value);
    }
  }, [setSearchVal, searchVal]);

  const exitBtn = () => {
    router.back();
  };

  const [searchServices, setsearchServices] = useState(null);
  useEffect(() => {
    if (searchVal.length > 2) {
      axios
        .get(
          `https://api.cagir.az/api/search/getServiceBySearch?searchString=${searchVal}`,
          {
            headers: {
              "Accept-Language": chosenLang,
            },
          }
        )
        .then((response) => {
          // Handle the response data
          setsearchServices(response.data.result);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  }, [searchVal, chosenLang]);

  return (
      <div>
        <Head>
          <title>Axtarış</title>
        </Head>
    <div className="py-[15px] lg:py-[30px]">
      <div className="relative flex flex-row justify-between sm:justify-center mb-[15px] lg:mb-[30px]">
        <h1 className="my-h2 text-center">
          {messages["which-service-looking"]}
        </h1>
        <button
          onClick={() => {
            exitBtn();
          }}
        >
          <Image
            src={close}
            alt="close_icon"
            className="w-[20px] h-[20px] sm:absolute sm:top-0 sm:right-0"
            loading="lazy"
            unoptimized
          />
        </button>
      </div>

      <div className="flex flex-col gap-y-[5px] items-center justify-center mt-[15px] mb-[15px]">
        <SearchInputMd
          {...{ messages, chosenLang, searchServices }}
          onChange={handleInputChange}
          value={searchVal}
          whichPage="search"
        />
        {searchServices && searchServices?.length > 0 ? (
          <div
            className={`${
              searchServices
                ? "flex flex-col justify-start border border-gray900 rounded-[20px] px-[10px] py-[5px]"
                : "hidden"
            }`}
          >
            {searchServices?.map(
              ({ name, parentTitleUrl, titleUrl }, index) => {
                return (
                  <div
                    className="w-full hover:bg-blue-500 hover:bg-opacity-[15%] rouned-[20px]"
                    key={index}
                  >
                    <Link href={`/${parentTitleUrl}/${titleUrl}`}>{name}</Link>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      {searchServices === null ? (
        <div className="flex flex-row justify-center gap-x-[5px] lg:gap-x-[15px]">
          {trendServices.map((item, index) => (
            <div key={index}>
              <div className="border border-cagiraz rounded-lg">
                <a className="" href={`/${chosenLang}/${item.nameUrl}`}>
                  <p className="font-semibold text-[12px] leading-[15px] text-cagiraz px-[10px] py-[4px]">
                    {item.serviceNames[0].name}
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      {/* all services */}
      <div
        className="flex flex-col gap-y-[60px] sm:gap-y-[75px] md:gap-y-[90px]
        lg:gap-y-[105px] xl:gap-y-[120px] 2xl:gap-y-[135px]
         pt-[30px] sm:pt-[36px] md:pt-[42px] lg:pt-[48px] xl:pt-[54px] 2xl:pt-[60px] 
         pb-[60px] sm:pb-[75px] md:pb-[90px] lg:pb-[105px] xl:pb-[120px] 2xl:pb-[135px]"
      >
        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[35px]
          xl:gap-y-[51px] 2xl:gap-[60px] "
        >
          {updatedSubServiceObject.map(
            ({ parentId, imageUrl, nameUrl, serviceNames }, index) => {
              return !imageUrl ? null : (
                <li
                  className="drop-shadow-cardAlt lg:drop-shadow-none lg:hover:drop-shadow-cardAlt transition duration-300 rounded-[10px] bg-white"
                  key={index}
                >
                  <Link
                    as={`/${mainServiceIdNameUrls[parentId]}/${serviceNames[0].titleUrl}`}
                    href={`/${mainServiceIdNameUrls[parentId]}/${serviceNames[0].titleUrl}`}
                    className=" 
                            flex flex-row sm:flex-col rounded-[10px] sm:rounded-[25px]
                          p-[10px] sm:p-[15px] space-x-[15px] sm:space-x-0"
                  >
                    <Image
                      priority={true}
                      width={272}
                      height={205}
                      src={`https://api.cagir.az${imageUrl}`}
                      alt={`${serviceNames[0].name} img`}
                      className="w-[70px] sm:w-full rounded-[5px] sm:rounded-[20px] object-cover object-center"
                      unoptimized
                    />

                    {serviceNames.map(({ id, name, text }, index) => (
                      <div className="w-full" key={index}>
                        <div className="flex items-center justify-between w-full pt-[5px] sm:pt-[10px] lg:pt-[15px]">
                          <h2 className="font-bold text-[14px] lg:text-[20px] leading-[21px] lg:leading-[30px] text-black500">
                            {name}
                          </h2>
                          <div className="transition duration-300 group-hover:block">
                            <Image
                              src={arrow_right}
                              alt="arrow_right_icon"
                              className="w-[28px]"
                              loading="lazy"
                              unoptimized
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
      </div>
  );
}

export async function getStaticProps(context) {
  const chosenLang = context.locale || "az";

  const fetchData = async (url) => {
    try {
      const { data } = await axios.get(url, {
        headers: { "Accept-Language": chosenLang },
      });
      return data.result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const [mainServices, trendServices] = await Promise.all([
    fetchData("https://api.cagir.az/api/service/getAllForFront"),
    fetchData("https://api.cagir.az/api/service/getShortCutServicesNew"),
  ]);

  return {
    props: {
      mainServices,
      trendServices,
    },
  };
}

export default SearchService;
