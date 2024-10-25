import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useIntl } from "react-intl";
import Contact_Part from "@/src/components/others/ContactPart";

const containerClasses =
  "flex flex-col gap-y-[60px] sm:gap-y-[75px] md:gap-y-[90px] lg:gap-y-[105px] xl:gap-y-[120px] 2xl:gap-y-[135px] pt-[30px] sm:pt-[36px] md:pt-[42px] lg:pt-[48px] xl:pt-[54px] 2xl:pt-[60px] pb-[60px] sm:pb-[75px] md:pb-[90px] lg:pb-[105px] xl:pb-[120px] 2xl:pb-[135px]";
const listClasses =
  "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[35px] xl:gap-y-[51px] 2xl:gap-[60px]";
const linkClasses =
  "flex items-center justify-between w-full aspect-[15/3] sm:aspect-[302/91] rounded-[20px] drop-shadow-cardAlt lg:drop-shadow-none lg:hover:drop-shadow-cardAlt transition duration-300 bg-white px-[15px] sm:px-[30px] py-[9.5px] sm:py-[15px] group";

export default function Haqqimizda(props) {
  const { responseData, musteriData } = props;

  const intl = useIntl();
  const messages = intl.messages;

  return (
    <div>
      <Head>
        <title>Cagir.az - Korporativ</title>
        <meta property="og:title" content="Cagir.az - Korporativ" />
        <meta
          name="description"
          content="Cagir.az - Korporativ haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu səhifəyə baş çəkib faydalana bilərsiniz."
        />
      </Head>
      <div className="flex flex-col  pb-[50px] pt-[30px] md:pb-[60px] lg:pb-[70px] xl:pb-[80px] 2xl:pb-[90px]">
        <h1 className="text-center my-h2 pb-[30px] lg:pb-[60px]">
          Korporativ Əməkdaşlıq
        </h1>
        <div className="flex flex-col items-center font-semibold  gap-y-[15px] pb-[30px] lg:pb-[50px] text-[#595959]">
          <p className="text-[12px] lg:text-[18px] leading-[22px] lg:leading-[34px] w-full lg:w-2/3 text-center">
            Cagir.az şirkəti sizi korporativ əməkdaşlığa dəvət edir! İstənilən
            növ usta xidmətində nasazlığı aşkarlamaq üçün ofis və ya obyektlərə
            mütəmadi baxış keçirilməsi mümkündür. Eyni zamanda əməkdaşlıq
            çərçivəsində aylıq və ya gündəlik xadimə xidməti göstərilir.
            Xidmətlərimiz barədə daha ətraflı məlumat əldə etmək üçün “Bütün
            xidmətlər” bölməsinə nəzər yetirə bilərsiniz.
          </p>
        </div>

        <div className="flex flex-col gap-y-[30px]">
          <div className="flex flex-row gap-x-[15px] items justify-center">
            <Link
              href="/xidmetler"
              className="py-[15px] w-full md:w-[700px] bg-cagiraz rounded-[15px] text-center font-semibold lg:font-bold text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] text-white"
            >
              Bütün xidmətlər
            </Link>
          </div>
          <div>
            <h2 className="my-h2 mb-[15px] lg:mb-[60px] text-center">
              {/* {messages["customers"]} */}
              Korporativ müştərilər
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {musteriData?.map(({ id, imageUrl, title, url }) => (
                <div key={id}>
                  <Link href={url ?? "/"} target="_blank" className="">
                    <Image
                      loading="lazy"
                      alt={title}
                      src={`https://api.cagir.az${imageUrl}`}
                      width={300}
                      height={150}
                      className="px-[5px] md:px-[15px] drop-shadow-cardAlt py-[10px]"
                      unoptimized
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <h2 className="my-h2 mb-[15px] lg:mb-[30px] text-center">
            Naliyyətlərimiz
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px] lg:gap-[60px] px-[10px] justify-between">
            {responseData
              .slice(0, 3)
              .map(({ imageUrl, insertDate, mediaNames, id }, index) => (
                <div key={index}>
                  <div className="drop-shadow-card lg:drop-shadow-none hover:drop-shadow-card transition duration-300 bg-white p-[15px] sm:p-[18px] md:p-[21px] lg:p-[24px] lx:p-[27px] 2xl:p-[30px] rounded-[20px] 2xl:rounded-[25px]">
                    <Link href={`/media/media-detail/${id}`}>
                      <Image
                        priority={true}
                        width={360}
                        height={257}
                        src={`https://api.cagir.az${imageUrl}`}
                        alt={mediaNames[0].title}
                        className="rounded-[10px] lg:rounded-[20px] w-full aspect-[360/257]"
                        unoptimized
                      />
                    </Link>
                    <div className="flex justify-between mt-[10px] lg:mt-[15px] items-center">
                      <p
                        className="font-semibold text-[12px] lg:text-[14px] leading-[15px] 
              lg:leading-[21px] text-[#595959]"
                      >
                        {insertDate.slice(0, 10)}
                      </p>
                    </div>
                    <Link href={`/media/media-detail/${id}`}>
                      <h5 className="my-h5 mt-[5px] lg:mt-[15px] text-black">
                        {mediaNames[0].title}
                      </h5>
                    </Link>
                    <p
                      className="font-semibold text-[12px] lg:text-[14px] leading-[15px] 
            lg:leading-[21px] text-gray900 mt-[5px] "
                    >
                      {mediaNames[0].shortDescription}
                    </p>
                    <div className="flex justify-between mt-[5px] lg:mt-[15px] text-cagiraz">
                      <div className="ml-auto">
                        <Link
                          className="font-extrabold text-[14px] leading-[21px]"
                          href={`/media/media-detail/${id}`}
                        >
                          Ətrafli oxu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <Contact_Part />
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

  const [responseData, musteriData] = await Promise.all([
    fetchData("https://api.cagir.az/api/media/getAll"),
    fetchData(
      "https://api.cagir.az/api/adminDictionary/getAll?dictionaryType=4"
    ),
  ]);

  return {
    props: {
      responseData,
      musteriData,
    },
    revalidate: 120,
  };
}
