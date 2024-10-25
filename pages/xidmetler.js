import React from "react";
import axios from "axios";
import Head from "next/head";
import { useIntl } from "react-intl";
import MainServiceCard from "@/src/components/cards/mainServiceCard";

function ButunXidmetler({ services }) {
  const { messages } = useIntl();

  return (
    <div>
      <Head>
        <title>Cagir.az - Bütün xidmətlər</title>
        <meta property="og:title" content="Cagir.az - Bütün xidmətlər" />
        <meta
          name="description"
          content="Cagir.az - Bütün xidmətlər haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu səhifəyə baş çəkib faydalana bilərsiniz."
        />
      </Head>
      <div className="flex flex-col sm:pt-[36px] md:pt-[42px] lg:pt-[48px] xl:pt-[54px] 2xl:pt-[60px] py-[60px] sm:py-[75px] md:py-[90px] lg:py-[105px] xl:py-[120px] 2xl:py-[135px]">
        <h1 className="my-h2 mb-[15px] lg:mb-[30px] text-center">
          {messages.services}
        </h1>
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] lg:gap-[60px] px-[10px] justify-between">
          {services.map(
            ({ id, imageUrl, nameUrl, serviceNames, isServiceTrend }) => {
              return [3, 4, 6, 281].includes(id) ? null : (
                <li key={id}>
                  <MainServiceCard
                    {...{
                      id,
                      imageUrl,
                      nameUrl,
                      serviceNames,
                      isServiceTrend,
                    }}
                  />
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  try {
    const response = await axios.get(
      "https://api.cagir.az/api/service/getAllForFront",
      {
        headers: {
          "Accept-Language": locale,
        },
      }
    );

    return {
      props: {
        services: response.data.result,
      },
      revalidate: 3600, // optional: set a revalidation time in seconds if you want to refresh the data periodically
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true, // This will return a 404 page if there's an error, but you can handle errors as you see fit.
    };
  }
}

export default ButunXidmetler;
