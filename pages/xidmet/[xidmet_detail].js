import React, { useEffect, useState } from "react";
import axios from "axios";
import { useIntl } from "react-intl";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Reyler from "@/src/components/main/providers";
import Musteriler from "@/src/components/main/musteriler";
import TabBar from "@/src/components/mobile/TabBar";

function XidmetDetail({ xidmetData, reylerData }) {
  const intl = useIntl();
  const messages = intl.messages;

  const {
    imageUrl,
    insertDate,
    serviceInfoNames,
    serviceInfoTags,
    titleUrl,
    viewCount,
    metaDescription,
    metaTitle,
    id,
  } = xidmetData;
  const { description = "" } = serviceInfoNames?.[0] || {};
  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
      </Head>
      <div className="sticky top-[35px] lg:hidden z-50 pb-[20px] pt-[10px]">
        <TabBar {...{ messages }} />
      </div>
      <div className="flex flex-col items-center py-[15px] lg:py-[30px]">
        <div className="flex flex-col w-full  gap-y-[30px] lg:gap-y-[60px]">
          <div className="flex flex-col pb-[30px] lg:pb-0 drop-shadow-card lg:drop-shadow-none lg:hover:drop-shadow-card transition duration-300">
            <Image
              loading="lazy"
              width={1545}
              height={1392}
              src={`https://api.cagir.az${imageUrl}`}
              alt={serviceInfoNames?.[0].title}
              className="rounded-[20px]"
              unoptimized
            />
            <div className="flex flex-row justify-between pt-[5px] lg:pt-[30px] pb-[15px] lg:pb-[30px]">
              <p className="font-medium lg:font-semibold text-[12px] lg:text-[14px] leading-[12px] lg:leading-[21px] text-[#595959]">
                {insertDate ? insertDate.slice(0, 10) : ""}
              </p>
              <p className="font-semibold text-[12px] lg:text-[18px] leading-[15px] lg:leading-[27px] text-cagiraz">
                Sifariş sayı: {viewCount}
              </p>
            </div>
            <h1 className="my-h2 pt-[5px] lg:pt-[10px] pb-[5px] lg:pb-[20px]">
              {serviceInfoNames?.[0].title}
            </h1>

            <div
              className="text-black"
              dangerouslySetInnerHTML={{
                __html: description
                  .replaceAll(
                    "<ul",
                    '<ul class="list-disc list-inside pt-[3px] pb-[7px]'
                  )
                  .replaceAll("<a", '<a class="font-semibold text-cagiraz"')
                  .replaceAll("<span", '<span class="text-black"'),
              }}
            />
          </div>
          {serviceInfoTags?.length > 0 && (
            <div>
              <h4 className="font-semibold lg:font-bold text-[16px] lg:text-[20px] lg:leading-[30px] leading-[24px] pb-[15px] pt-[30px] lg:pt-0 text-center lg:text-start border-t border-[#EAEAEA] lg:border-none">
                Təqlər
              </h4>
              <div className="flex flex-row flex-wrap gap-[10px] lg:gap-[15px]">
                {serviceInfoTags.map(({ name }, index) => (
                  <div key={index}>
                    <Link href={`/xidmet/tag/${name.replace(/#/g, "")}`}>
                      <p className="font-medium lg:font-semibold text-[12px] lg:text-[12px] leading-[15px] lg:leading-[16px] border border-cagiraz rounded-[5px] py-[2px] lg:py-[4px] px-[8px] lg:px-[10px] text-cagiraz">
                        {name.replace(/#/g, "")}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Reyler
            {...{ reylerData }}
            {...{ messages: intl.messages }}
            parentId={id}
          />
          <Musteriler {...{ messages: intl.messages }} />
        </div>
      </div>
    </div>
  );
}

async function fetchReyler(parentId, chosenLang) {
  try {
    const response = await axios.get(
      `https://api.cagir.az/api/serviceProviderFeed/getAllByServiceId?serviceInfoId=${parentId}`,
      {
        headers: {
          "Accept-Language": chosenLang,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getServerSideProps(context) {
  const chosenLang = context.locale || "az";
  const xidmetDetail = context.query["xidmet_detail"];

  let xidmetData = null;

  try {
    const response = await axios.post(
      `https://api.cagir.az/api/serviceInfo/detail`,
      { titleUrl: xidmetDetail },
      {
        headers: { "Accept-Language": chosenLang },
      }
    );
    xidmetData = response.data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const reylerData = await fetchReyler(xidmetData.id, chosenLang);

  // Check if xidmetData.length is undefined,
  if (xidmetData === null) {
    return {
      redirect: {
        destination: "/", // Redirect to the 'page not found' route
        permanent: false, // This is a temporary redirect
      },
    };
  }

  return {
    props: {
      xidmetData,
      reylerData,
    },
  };
}

export default XidmetDetail;
