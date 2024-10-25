import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Sifaris = dynamic(() => import("@/src/components/sifaris"), {
  ssr: false,
});

async function fetchSubServices(parentId, chosenLang) {
  try {
    const response = await axios.get(
      `https://api.cagir.az/api/service/getSubServicesByParentId?parentId=${parentId}`,
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

async function fetchMainServices(chosenLang) {
  try {
    const response = await axios.get(
      "https://api.cagir.az/api/service/getAllForFront",
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

async function endPoint(url, chosenLang) {
  try {
    const response = await axios.get(
      `https://api.cagir.az/api/search/getParentIdByServiceId?titleUrl=${url}`,
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

function Sub2Service({ dataMain, defaultMainNew, getSubServices, chosenLang }) {
  const router = useRouter();
  const { mainService: mainServiceUrl, subService: subServiceUrl } =
    router.query;
  const [enpointToFixBug, setEnpointToFixBug] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.cagir.az/api/search/getParentIdByServiceId?titleUrl=${mainServiceUrl}`,
        {
          headers: {
            "Accept-Language": "az",
          },
        }
      )
      .then((response) => {
        setEnpointToFixBug(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [mainServiceUrl]);

  const findMainById = (mainServices, id) =>
    mainServices.find((obj) => obj.id === enpointToFixBug.id) || {};
  const mainInfoAfterEndPoint = findMainById(dataMain, enpointToFixBug.id);

  const findSubInfoByNameUrl = (subServices, nameUrl) =>
    subServices.find((obj) => obj.serviceNames[0].titleUrl === subServiceUrl);
  const defaultSub = findSubInfoByNameUrl(getSubServices, subServiceUrl);
  return (
    <div>
      <Head>
        <title>{defaultSub?.serviceNames?.[0].metaTitle}</title>
        <meta
          name="description"
          content={defaultSub?.serviceNames?.[0].metaDescription}
        />
        <meta
          property="og:title"
          content={defaultSub?.serviceNames?.[0].metaTitle}
        />
      </Head>
      <div>
        <Sifaris
          getMainServices={dataMain}
          {...{ getSubServices, defaultSub, mainInfoAfterEndPoint }}
          defaultMain={defaultMainNew}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { mainService, subService } = context.params;
  const chosenLang = context.locale || "az";
  const getEndPoint = await endPoint(mainService, chosenLang);
  const dataMain = await fetchMainServices(chosenLang);

  const findMainInfoByNameUrlNew = (mainServices, nameUrl) =>
    mainServices.find((obj) => obj.serviceNames[0].titleUrl === mainService) ||
    {};
  const defaultMainNew = findMainInfoByNameUrlNew(dataMain, mainService);

  const findMainInfoById = (mainServices, nameUrl) =>
    mainServices.find((obj) => obj.id === getEndPoint.id) || {};
  const defaultMainNewById = findMainInfoById(dataMain, getEndPoint.id);

  const getSubServices = await fetchSubServices(defaultMainNew?.id, chosenLang);

  if (getEndPoint.id !== 0) {
    return {
      redirect: {
        destination: `/${defaultMainNewById.nameUrl}/${mainService}`, // Redirect to the 'page not found' route
        permanent: false, // This is a temporary redirect
      },
    };
  } else if (!defaultMainNew?.id && getEndPoint.id === 0) {
    return {
      redirect: {
        destination: "/", // Redirect to the 'page not found' route
        permanent: false, // This is a temporary redirect
      },
    };
  }

  return {
    props: {
      dataMain,
      chosenLang,
      defaultMainNew,
      getSubServices,
      getEndPoint,
      defaultMainNewById,
    },
  };
}

export default Sub2Service;
