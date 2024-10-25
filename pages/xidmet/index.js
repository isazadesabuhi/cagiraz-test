import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useIntl } from "react-intl";
import SearchInputMd from "@/src/components/input/inputSearchMd";
import TabBar from "@/src/components/mobile/TabBar";

function Xidmet(props) {
  const { responseData } = props;

  // ekranda gorunen updatedXidmetList.It updates in each search
  const [updatedXidmetList, setUpdatedXidmetList] = useState(responseData);
  // the value that will search elements
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    const filteredArray = responseData.filter((obj) => {
      const keys = Object.keys(obj);
      return (
        obj.titleUrl.toLowerCase().includes(searchVal.toLowerCase()) ||
        obj.serviceInfoNames[0].title
          .toLowerCase()
          .includes(searchVal.toLowerCase())
      );
    });

    if (searchVal.length > 0) {
      setUpdatedXidmetList(filteredArray);
    } else {
      setUpdatedXidmetList(responseData);
    }
  }, [searchVal, responseData]); // Only run this effect when searchVal changes

  function handleInputChange(event) {
    const inputValue = event.target.value;
    setSearchVal(inputValue);
  }

  const intl = useIntl();
  const chosenLang = intl.locale;
  const messages = intl.messages;
  return (
    <div>
      <Head>
        <title>Cagir.az - Xidmət</title>
        <meta property="og:title" content="Cagir.az - Xidmət" />
        <meta
          name="description"
          content="Cagir.az - Xidmət haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu səhifəyə baş çəkib faydalana bilərsiniz."
        />
      </Head>
      <div className="py-[15px] lg:py-[30px]">
        <h1 className="my-h2 mb-[15px] text-center lg:mb-[30px]">
          Xidmətlər haqqında
        </h1>
        <div className="flex flex-col items-center pb-[20px] lg:pb-[50px]">
          <SearchInputMd
            onChange={handleInputChange}
            value={searchVal}
            {...{ messages, chosenLang }}
            // sendDataToParent={receiveDataFromChild}
          />
        </div>
        <div className="sticky top-[45px] lg:hidden z-50 pb-[20px]">
          <TabBar {...{ messages }} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px] lg:gap-[60px] px-[10px] justify-between">
          {updatedXidmetList.map(
            ({
              index,
              imageUrl,
              insertDate,
              serviceInfoNames,
              id,
              viewCount,
              titleUrl,
            }) => (
              <div key={id}>
                <div className="drop-shadow-card lg:drop-shadow-none hover:drop-shadow-card transition duration-300 bg-white p-[15px] sm:p-[18px] md:p-[21px] lg:p-[24px] lx:p-[27px] 2xl:p-[30px] rounded-[20px] 2xl:rounded-[25px]">
                  <Link href={`/xidmet/${titleUrl}`}>
                    {imageUrl ? (
                      <Image
                        loading="lazy"
                        // priority={true}
                        width={360}
                        height={257}
                        src={`https://api.cagir.az${imageUrl}`}
                        alt={titleUrl}
                        className="rounded-[10px] lg:rounded-[20px] w-full aspect-[360/257]"
                        unoptimized
                      />
                    ) : (
                      <div className="rounded-[10px] lg:rounded-[20px] w-full aspect-[360/257]"></div>
                    )}
                  </Link>
                  <div className="flex justify-between mt-[10px] lg:mt-[15px] items-center">
                    <p
                      className="font-semibold text-[12px] lg:text-[14px] leading-[15px] 
              lg:leading-[21px] text-[#595959]"
                    >
                      {insertDate.slice(0, 10)}
                    </p>
                    <div className="ml-auto border border-cagiraz rounded-lg">
                      {/* <Link href={`/media/media-detail/${id}`}>
                    <p className="font-semibold	text-[10px] leading-[15px] text-cagiraz px-[10px] py-[4px] ">
                      categoryName
                    </p>
                  </Link> */}
                    </div>
                  </div>
                  <Link href={`/xidmet/${titleUrl}`}>
                    <h2 className="my-h5 mt-[5px] lg:mt-[15px] text-black">
                      {serviceInfoNames[0].title}
                    </h2>
                  </Link>
                  <p
                    className="font-semibold text-[12px] lg:text-[14px] leading-[15px] 
            lg:leading-[21px] text-[#595959] mt-[5px] "
                  >
                    {serviceInfoNames[0].shortDescription}
                  </p>
                  <div className="flex justify-between mt-[5px] lg:mt-[15px] text-cagiraz">
                    <div className="flex flew-row justify-center items-center space-x-[5px]">
                      <div>
                        <p className="font-semibold text-[16px]	lg:text-[18px] leading-[24px] lg:leading-[27px]">
                          Sifariş sayı: {Math.round(viewCount / 2)}
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Link
                        className="font-extrabold text-[14px] leading-[21px]"
                        href={`/xidmet/${titleUrl}`}
                      >
                        Ətrafli oxu
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Xidmet;

export async function getStaticProps() {
  try {
    const response = await axios.get(
      `https://api.cagir.az/api/serviceInfo/getAll`,
      {
        headers: {
          "Accept-Language": "az",
        },
      }
    );
    return {
      props: {
        responseData: response.data.result,
      },
      revalidate: 120,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        responseData: [], // You can return an empty array or handle it however you'd like.
      },
    };
  }
}
