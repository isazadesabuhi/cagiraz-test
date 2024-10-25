import Carousel1 from "@/src/components/main/CarouselSection";
import LazyLoadReels from "@/src/components/main/LazyLoadReels";
import TabBar from "@/src/components/mobile/TabBar";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useIntl } from "react-intl";
import MainServiceCard from "@/src/components/cards/mainServiceCard";
import BlogCard from "@/src/components/cards/blogCard";
import FaqComponent from "@/src/components/main/faqComponent";

const Providers = dynamic(() => import("@/src/components/main/providers"), {
  ssr: false,
});
const Executers = dynamic(() => import("@/src/components/main/executers"), {
  ssr: false,
});
const Deyerler = dynamic(() => import("@/src/components/main/deyerler"), {
  ssr: false,
});

const Musteriler = dynamic(() => import("@/src/components/main/musteriler"), {
  ssr: false,
});

export default function Home({
  getAllForFront,
  carouselPhotos,
  providersData,
  executersData,
  faqMainPage,
  deyerlerMainPage,
  lastPostedBlogs,
}) {
  const intl = useIntl();
  const chosenLang = intl.locale;
  const messages = intl.messages;
  function insertLineBreakAtComma(text) {
    return text.split(",").map((part, index) =>
      index === 0 ? (
        part + ","
      ) : (
        <>
          <br />
          {part}
        </>
      )
    );
  }

  const faqDataNeeded = Object.values(faqMainPage).map(
    (child) => child.faqNames[0]
  );

  return (
    <div>
      <Head>
        <title>Cagir.az</title>
        <meta
          name="description"
          content="Cagir.az - temizlik xidmeti, usta xidmeti"
        />
        <meta property="og:title" content="Cagir.az" />
      </Head>

      <div className="mt-[30px] lg:mt-[0px]">
        {/*  */}
        <h1 className="flex flex-col my-h1 text-black500 mx-0 lg:w-full text-center lg:text-left lg:hidden">
          {/* {messages["slider-part-2"]} */}
          {insertLineBreakAtComma(messages["slider-part-2"])}
        </h1>
        <div className="sticky top-[35px] lg:hidden z-50 py-[10px]">
          <TabBar {...{ messages }} />
        </div>
        {/*  */}
        <div
          className={`flex flex-col gap-y-[60px] sm:gap-y-[75px] md:gap-y-[90px]
      lg:gap-y-[105px] xl:gap-y-[120px] 2xl:gap-y-[135px]
      sm:pt-[36px] md:pt-[42px] lg:pt-[48px] xl:pt-[54px] 2xl:pt-[60px] 
      pb-[40px] sm:pb-[55px] md:pb-[70px] lg:pb-[r85px] xl:pb-[100px] 2xl:pb-[115px]`}
        >
          <Carousel1 {...{ carouselPhotos, messages }} />
          <div>
            <h1 className="my-h2 mb-[15px] lg:mb-[30px] text-center">
              {messages.services}
            </h1>
            {/* Main Services */}
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] lg:gap-[60px] px-[10px] justify-between">
              {getAllForFront
                .slice(0, 6)
                .map(
                  ({ id, imageUrl, nameUrl, serviceNames, isServiceTrend }) => {
                    return (
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

          <Providers
            providersData={providersData}
            {...{ chosenLang, messages, providersData }}
            parentId={1}
          />
          <Executers {...{ messages, executersData }} parentId={1} />
          <LazyLoadReels />

          <Musteriler {...{ messages }} />
          <div className="hidden lg:block">
            <h2 className="my-h2 mb-[15px] lg:mb-[30px] text-center">
              {messages["faq-short"]}
            </h2>
            <div className="space-y-[15px] lg:space-y-[17px]">
              {faqDataNeeded.map(
                ({ question, answer, isActive, faqId, id }) => (
                  <FaqComponent
                    key={id}
                    {...{ question, answer, isActive, faqId, id }}
                  />
                )
              )}
            </div>
          </div>
          <div className="hidden lg:block">
            <Deyerler {...{ chosenLang, messages, deyerlerMainPage }} />
          </div>
          {/* Last Posted Blogs */}
          <div>
            <h2 className="my-h2 mb-[15px] lg:mb-[30px] text-center">
              {messages["blog"]}
            </h2>
            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-[10px] lg:gap-[60px] px-[10px] justify-between">
              {lastPostedBlogs
                ?.slice()
                .reverse()
                .map(
                  ({
                    id,
                    imageUrl,
                    shortDescription,
                    title,
                    titleUrl,
                    viewCount,
                    insertDate,
                    categoryName,
                  }) => (
                    <li key={id}>
                      <BlogCard
                        {...{
                          id,
                          imageUrl,
                          shortDescription,
                          title,
                          titleUrl,
                          viewCount,
                          insertDate,
                          categoryName,
                        }}
                      />
                    </li>
                  )
                )}
            </ul>
          </div>
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

  const [
    getAllForFront,
    carouselPhotos,
    providersData,
    executersData,
    faqMainPage,
    deyerlerMainPage,
    lastPostedBlogs,
  ] = await Promise.all([
    fetchData("https://api.cagir.az/api/service/getAllForFront"),
    fetchData(
      "https://api.cagir.az/api/adminDictionary/getAll?dictionaryType=6"
    ),
    fetchData(
      "https://api.cagir.az/api/providerFeed/getAllByServiceId?serviceId=1"
    ),
    fetchData("https://api.cagir.az/api/executer/getAllForAdmin"),
    fetchData("https://api.cagir.az/api/faq/getAllByCategory?faqCategoryId=1"),
    fetchData(
      "https://api.cagir.az/api/adminDictionary/getAll?dictionaryType=2"
    ),
    fetchData("https://api.cagir.az/api/post/getRecently"),
  ]);

  return {
    props: {
      getAllForFront,
      carouselPhotos,
      providersData,
      executersData,
      faqMainPage,
      deyerlerMainPage,
      lastPostedBlogs,
    },
  };
}
