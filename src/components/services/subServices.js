import React from "react";
import Link from "next/link";
import Image from "next/image";
import arrow from "@/src/icons/arrow.svg";
import arrow_right from "@/src/icons/arrow_right.svg";
import TabBar from "@/src/components/mobile/TabBar";

const SubServices = ({ mainServiceData, subServices, messages }) => {
  const serviceName = mainServiceData?.serviceNames?.[0]?.name;

  const isServiceTrends = subServices.some((service) => service.isServiceTrend);

  const cardClasses =
    "drop-shadow-cardAlt lg:drop-shadow-none lg:hover:drop-shadow-cardAlt transition duration-300 rounded-[10px] bg-white";
  const titleClasses =
    "relative text-center font-semibold lg:font-bold text-[12px] sm:text-[15px] md:text-[18px] lg:text-[21px] xl:text-[24px] 2xl:text-[28px] leading-[18px] sm:leading-[22px] md:leading-[27px] lg:leading-[32px] xl:leading-[37px] 2xl:leading-[42px] mb-[15px] lg:mb-[30px] text-[#595959]";
  const containerClasses =
    "flex flex-col gap-y-[60px] sm:gap-y-[75px] md:gap-y-[90px] lg:gap-y-[105px] xl:gap-y-[120px] 2xl:gap-y-[135px] pt-[30px] sm:pt-[36px] md:pt-[42px] lg:pt-[48px] xl:pt-[54px] 2xl:pt-[60px] pb-[60px] sm:pb-[75px] md:pb-[90px] lg:pb-[105px] xl:pb-[120px] 2xl:pb-[135px]";
  const listClasses =
    "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[35px] xl:gap-y-[51px] 2xl:gap-[60px]";
  const linkClasses =
    "flex items-center justify-between w-full aspect-[15/3] sm:aspect-[302/91] rounded-[20px] drop-shadow-cardAlt lg:hover:drop-shadow-cardAlt transition duration-300 bg-white px-[15px] sm:px-[30px] py-[9.5px] sm:py-[15px] group";
  return (
    <div>
      <h1 className="hidden lg:block my-h2 mt-[35px] lg:mt-[60px] mb-0 lg:mb-[15px] text-center pb-[10px] lg:pt-0">
        {serviceName}
      </h1>
      {/* {isServiceTrends && (
      <div className="sticky top-[50px] z-50 pt-[0px]">
              <div className="lg:hidden "><TabBar /></div>
            </div>)} */}
      {mainServiceData && (
        <div>
          {isServiceTrends && (
            <div className="sticky top-[50px] z-50 pt-[0px]">
              <h2 className={`${titleClasses} hidden lg:block`}>
                {messages["most-wanted-services"]}
              </h2>
            </div>
          )}
          {isServiceTrends && (
            <div className="flex flex-col gapr-y-[60px] sm:gap-y-[75px] md:gap-y-[90px] lg:gap-y-[105px] xl:gap-y-[120px] 2xl:gap-y-[135px] pt-[20px] sm:pt-[36px] md:pt-[42px] lg:pt-[48px] xl:pt-[54px] 2xl:pt-[60px] pb-[60px] sm:pb-[75px] md:pb-[90px] lg:pb-[105px] xl:pb-[120px] 2xl:pb-[135px]">
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[35px] xl:gap-y-[51px] 2xl:gap-[60px]">
                {subServices.map(
                  ({ id, imageUrl, nameUrl, serviceNames, isServiceTrend }) => {
                    if (!isServiceTrend) return null;

                    return (
                      <li className={cardClasses} key={id}>
                        <Link
                          href={`/${mainServiceData.serviceNames[0].titleUrl}/${serviceNames[0].titleUrl}`}
                          className="flex flex-row sm:flex-col rounded-[10px] sm:rounded-[25px] p-[10px] sm:p-[15px] space-x-[15px] sm:space-x-0 group"
                        >
                          {imageUrl ? (
                            <Image
                              priority={true}
                              width={272}
                              height={205}
                              unoptimized
                              src={`https://api.cagir.az${imageUrl}`}
                              alt={`${serviceNames[0]?.name} img`}
                              className="w-[70px] h-[60px] screen390:w-[85px] screen390:h-[75px] sm:w-full sm:h-auto sm:aspect-[272/205] rounded-[5px] sm:rounded-[20px] object-cover object-center"
                            />
                          ) : (
                            <div className="w-[70px] h-[60px] screen390:w-[85px] screen390:h-[75px] sm:w-full sm:h-auto sm:aspect-[272/205] rounded-[5px] sm:rounded-[20px] object-cover object-center"></div>
                          )}

                          {serviceNames.map(({ id, name }) => (
                            <div className="w-full" key={id}>
                              <div className="flex items-center justify-between w-full pt-[5px] sm:pt-[10px] lg:pt-[15px]">
                                <h3 className="font-bold text-[14px] lg:text-[20px] leading-[21px] lg:leading-[30px] text-black500">
                                  {name}
                                </h3>
                                <div className="lg:hidden group-hover:block transition duration-300">
                                  <Image
                                    src={arrow}
                                    alt="arrow_right_icon"
                                    className="w-[28px] hidden lg:block"
                                    loading="lazy"
                                    unoptimized
                                  />
                                  <Image
                                    src={arrow_right}
                                    alt="arrow_right_icon"
                                    className="w-[28px] lg:hidden"
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
          )}
        </div>
      )}
      <div>
        {isServiceTrends ? (
          <h2 className="my-h2 mb-0 lg:mb-[15px] text-center">
            Digər{" "}
            {`${mainServiceData.serviceNames[0].name
              .split(" ")[0]
              .toLowerCase()}`}{" "}
            xidmətləri
          </h2>
        ) : (
          <div className="sticky top-[50px] z-50 pt-[0px]">
            <div className="lg:hidden ">
              <TabBar {...{ messages }} />
            </div>
          </div>
        )}

        {mainServiceData && (
          <div className={containerClasses}>
            <ul className={listClasses}>
              {subServices.map(
                ({
                  id,
                  imageUrl,
                  nameUrl,
                  price,
                  serviceNames,
                  isServiceTrend,
                }) => {
                  if (!isServiceTrend) {
                    return (
                      <li key={id}>
                        <Link
                          className={linkClasses}
                          href={`/${mainServiceData.serviceNames[0].titleUrl}/${serviceNames[0].titleUrl}`}
                        >
                          <div>
                            <h3 className="relative font-semibold lg:font-bold text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] text-black500">
                              {serviceNames[0].name}
                            </h3>
                            <p className="font-medium sm:font-semibold text-[12px] leading-[18px] text-[#595959] mt-0 sm:mt-[2px]">
                              {price}
                            </p>
                          </div>
                          <div className="transition duration-300">
                            <Image
                              src={arrow}
                              alt="arrow_icon"
                              className="hidden lg:block"
                              loading="lazy"
                              unoptimized
                            />
                          </div>
                          <div className="lg:hidden">
                            <Image
                              src={arrow_right}
                              alt="arrow_right"
                              className="w-[28px]"
                              loading="lazy"
                              unoptimized
                            />
                          </div>
                        </Link>
                      </li>
                    );
                  }
                  return null;
                }
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubServices;
