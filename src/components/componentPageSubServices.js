import { useEffect, useState } from "react";
import TabBar from "@/src/components/mobile/TabBar";
import SubServicesforReklam from "@/src/components/services/subServicesforReklam";
import SubServices from "@/src/components/services/subServices";
import axios from "axios";
import Head from "next/head";
// import LazyLoadReels from "@/src/components/main/LazyLoadReels";
import Badge from "@/src/components/others/badge";
import dynamic from "next/dynamic";
import az from "@/src/data/az.json";
import ru from "@/src/data/ru.json";
import en from "@/src/data/en.json";
import { useRouter } from "next/router";

const Providers = dynamic(() => import("@/src/components/main/providers"), {
  ssr: false,
});

const Executers = dynamic(() => import("@/src/components/main/executers"), {
  ssr: false,
});

const LazyLoadReels = dynamic(() => import("@/src/components/main/LazyLoadReels"), {
  ssr: false,
});


const ServicePage = ({ mainServiceUrl, parentId, chosenLang }) => {
  const router = useRouter();
  const [mainServiceData, setMainServiceData] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const [providersData, setProvidersData] = useState([]);
  const [executersData, setExecutersData] = useState([]);
  // const chosenLang = "az";
  const messages = chosenLang === "az" ? az : chosenLang === "ru" ? ru : en;

  // Fetching data using useEffect
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const mainData = await fetchMainServiceData(chosenLang, mainServiceUrl);
        setMainServiceData(mainData);
        const subServicesData = await fetchSubServices(parentId, chosenLang);
        setSubServices(subServicesData);
        const providers = await fetchProvider(parentId, chosenLang);
        setProvidersData(providers);
        const executers = await fetchExecuter(parentId, chosenLang);
        setExecutersData(executers);
      } catch (error) {
        console.error("Failed to fetch service data:", error);
      }
    };

    fetchServiceData();
  }, [mainServiceUrl, parentId, chosenLang]); // Dependencies to re-fetch if mainServiceUrl or parentId changes

  // Early return if the data hasn't loaded yet
  if (!mainServiceData) {
    return <div>Loading...</div>;
  }

  const serviceName = mainServiceData?.serviceNames?.[0]?.name || "";
  const {
    metaTitle,
    metaDescription,
    text: textService,
  } = mainServiceData?.serviceNames?.[0] || {};

  const containerClass = `
    flex flex-col gap-y-[60px] sm:gap-y-[75px] md:gap-y-[90px]
    lg:gap-y-[105px] xl:gap-y-[120px] 2xl:gap-y-[135px]
    pt-[30px] sm:pt-[36px] md:pt-[42px] lg:pt-[48px] xl:pt-[54px] 2xl:pt-[60px]
    pb-[60px] sm:pb-[75px] md:pb-[90px] lg:pb-[105px] xl:pb-[120px] 2xl:pb-[135px]
  `;

  const advertiseRoutes = [
    "/master",
    "/plumber",
    "/combi",
    "/climate",
    "/clean",
  ];

  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
      </Head>
      <Badge {...{ chosenLang, messages }} />
      <h1 className="my-h2 mt-[35px] lg:mt-[60px] mb-0 lg:mb-[15px] text-center pb-[10px] lg:pt-0 lg:hidden">
        {serviceName}
      </h1>
      <div className="sticky top-[35px] lg:hidden z-50 py-[10px]">
        <TabBar {...{ messages }} />
      </div>
      {advertiseRoutes.includes(router.route) ? (
        <SubServicesforReklam
          {...{ mainServiceData, subServices, chosenLang, messages }}
        />
      ) : (
        <SubServices
          {...{ mainServiceData, subServices, chosenLang, messages }}
        />
      )}

      <div className={containerClass}>
        <Providers {...{ parentId, chosenLang, messages, providersData }} />
        <Executers {...{ parentId, chosenLang, messages, executersData }} />
        <LazyLoadReels />
        <div>
          <h2 className="my-h2 mb-[15px] text-center ">
            {messages.description}
          </h2>
          <div
            className="text-[12px] lg:text-[16px] leading-[18px] lg:leading-[34px] font-normal lg:font-medium text-[#959595]"
            dangerouslySetInnerHTML={{
              __html: (textService || "")
                .replaceAll(
                  "<ul>",
                  '<ul class="list-disc pt-[3px] pb-[7px] ml-[17px]">'
                )
                .replaceAll("<p", '<p class="text-[#595959]"')
                .replaceAll("<span", "<span class='text-[#595959]'"),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;

// Fetch Functions

async function fetchData(
  url,
  method = "GET",
  data = null,
  chosenLang = "az",
  parentId = ""
) {
  try {
    const response = await axios({
      method,
      url,
      data,
      parentId,
      headers: {
        "Accept-Language": chosenLang,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error(error);
    return method === "POST" ? {} : [];
  }
}

async function fetchMainServiceData(chosenLang, mainServiceUrl) {
  return fetchData(
    `https://api.cagir.az/api/service/service-name`, // Static API endpoint for fetching main service data
    "POST",
    { titleUrl: mainServiceUrl }, // Dynamically passed service URL (e.g., "santexnik-ustasi")
    chosenLang
  );
}

async function fetchSubServices(parentId, chosenLang) {
  return fetchData(
    `https://api.cagir.az/api/service/getSubServicesByParentId?parentId=${parentId}`,
    "GET",
    null,
    chosenLang
  );
}

async function fetchProvider(parentId, chosenLang) {
  return fetchData(
    `https://api.cagir.az/api/providerFeed/getAllByServiceId?serviceId=${parentId}`,
    "GET",
    null,
    chosenLang
  );
}

async function fetchExecuter(parentId, chosenLang) {
  return fetchData(
    `https://api.cagir.az/api/executer/getAll?serviceId=${parentId}`,
    "GET",
    null,
    chosenLang
  );
}
