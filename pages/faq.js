import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import { useIntl } from "react-intl";
import icraciSvg from "@/src/icons/faq/icraci.svg";
import icraciSvg_clicked from "@/src/icons/faq/icraci_clicked.svg";
import musteriSvg from "@/src/icons/faq/musteri.svg";
import musteriSvg_clicked from "@/src/icons/faq/musteri_clicked.svg";
import sifarisSvg from "@/src/icons/faq/sifaris.svg";
import sifarisSvg_clicked from "@/src/icons/faq/sifaris_clicked.svg";
import FaqComponent from "@/src/components/main/faqComponent";

function Faq() {
  const intl = useIntl();
  const chosenLang = intl.locale;
  const messages = intl.messages;

  const [categoryId, setCategoryId] = useState(0); // Initial categoryId is 0
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.cagir.az/api/faq/getAllByCategory?faqCategoryId=${categoryId}`,
        {
          headers: {
            "Accept-Language": chosenLang,
          },
        }
      )
      .then((response) => {
        // Handle the response data
        setResponseData(
          response.data.result
        );
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, [categoryId, chosenLang]);

  const faqDataNeeded = Object.values(responseData).map(
    (child) => child.faqNames[0]
  );

  // Event handler for when an element is clicked
  const handleClick = (clickedCategoryId) => {
    setCategoryId(clickedCategoryId);
  };

  useEffect(() => {
    handleClick(3); // Call handleClick with 0 as the default value
  }, []); // Run only once when the component mounts

  return (
    <div>
      <Head>
        <title>Cagir.az - Suallar</title>
        <meta property="og:title" content="Cagir.az - Suallar" />
        <meta
          name="description"
          content="Cagir.az - Suallar haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu səhifəyə baş çəkib faydalana bilərsiniz."
        />
      </Head>

      <div className="my-[30px] lg:mt-[90px]">
        <div className="flex flex-col lg:flex-row justify-center items-center mb-[15px] lg:mb-[90px] ">
          <button
            className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full sm:aspect-[300/82]"
            onClick={() => handleClick(2)}
          >
            <Image
              loading="lazy"
              // priority={true}
              src={categoryId === 2 ? icraciSvg_clicked : icraciSvg}
              alt="İcraçılar üçün"
              title="İcraçılar üçün"
              className="w-full h-full"
              unoptimized
            />
          </button>

          <button
            className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full sm:aspect-[300/82]"
            onClick={() => handleClick(3)}
          >
            <Image
              loading="lazy"
              // priority={true}
              src={categoryId === 3 ? musteriSvg_clicked : musteriSvg}
              alt="Müştəri üçün"
              title="Müştəri üçün"
              className="w-full h-full"
              unoptimized
            />
          </button>

          <button
            className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full sm:aspect-[300/82]"
            onClick={() => handleClick(1)}
          >
            <Image
              loading="lazy"
              // priority={true}
              src={categoryId === 1 ? sifarisSvg_clicked : sifarisSvg}
              alt="Sifariş haqda"
              title="Sifariş haqda"
              className="w-full h-full"
              unoptimized
            />
          </button>
        </div>
        <h1 className="my-h2 mb-[15px] lg:mb-[30px] text-center">
          {messages["faq"]}
        </h1>
        <div className="space-y-[15px] lg:space-y-[17px]">
          {faqDataNeeded.map(({ question, answer, isActive, faqId, id }) => (
            <FaqComponent
              key={id}
              {...{ question, answer, isActive, faqId, id }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
