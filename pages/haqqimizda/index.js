import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useIntl } from "react-intl";
import video from "@/src/public/video_about.jpg";
import TeamCard from "@/src/components/cards/teamCard";
import Contact_Part from "@/src/components/others/ContactPart";
import arrow from "@/src/icons/arrow.svg";

const teamInfos = [
  {
    name: "Turqut Zeynalov",
    position: "Həmtəsisçi,İcraçı Direktor",
    image: "",
  },
  {
    name: "Orxan Abdulhəsənli",
    position: "Həmtəsisçi, İcraçı Direktor Müavini",
    image: "",
  },
  {
    name: "Ramin Nəbiyev",
    position: "Həmtəsisçi, Əməliyyatlar üzrə Direktor",
    image: "",
  },
  {
    name: "Tağı Əsədullazadə",
    position: "Baş Texniki Direktor",
    image: "",
  },
  {
    name: "Əfsanə Əmmayeva",
    position: "Böyümə üzrə Koordinator",
    image: "",
  },
  {
    name: "Təbriz Zeynalov ",
    position: "Əməliyyatlar üzrə Koordinator",
    image: "",
  },
  {
    name: "Xanım Verdiyeva",
    position: "Əməliyyatlar üzrə baş Mütəxəssis",
    image: "",
  },
  {
    name: "Səbuhi İsazadə",
    position: "FrontEnd Developer",
    image: "",
  },
  {
    name: "Kənan Abdulhəsənli",
    position: "BackEnd Developer",
    image: "",
  },
];

const containerClasses =
  "flex flex-col gap-y-[60px] sm:gap-y-[75px] md:gap-y-[90px] lg:gap-y-[105px] xl:gap-y-[120px] 2xl:gap-y-[135px] pt-[30px] sm:pt-[36px] md:pt-[42px] lg:pt-[48px] xl:pt-[54px] 2xl:pt-[60px] pb-[60px] sm:pb-[75px] md:pb-[90px] lg:pb-[105px] xl:pb-[120px] 2xl:pb-[135px]";
const listClasses =
  "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[35px] xl:gap-y-[51px] 2xl:gap-[60px]";
const linkClasses =
  "flex items-center justify-between w-full aspect-[15/3] sm:aspect-[302/91] rounded-[20px] drop-shadow-cardAlt lg:drop-shadow-none lg:hover:drop-shadow-cardAlt transition duration-300 bg-white px-[15px] sm:px-[30px] py-[9.5px] sm:py-[15px] group";

export async function getStaticProps(context) {
  const chosenLang = context.locale || "az";
  let responseData = [];

  try {
    const response = await axios.get(
      "https://api.cagir.az/api/service/getSubServicesByParentId?parentId=2",
      {
        headers: {
          "Accept-Language": chosenLang,
        },
      }
    );

    responseData = response.data.result;
  } catch (error) {
    console.error(error);
  }

  //
  let musteriData = [];
  try {
    const response = await axios.get(
      "https://api.cagir.az/api/adminDictionary/getAll?dictionaryType=4",
      {
        headers: {
          "Accept-Language": chosenLang,
        },
      }
    );

    musteriData = response.data.result;
  } catch (error) {
    console.error(error);
  }
  //

  return {
    props: {
      responseData,
      musteriData,
    },
  };
}
export default function Haqqimizda(props) {
  const intl = useIntl();
  const messages = intl.messages;
  const { responseData, musteriData } = props;
  return (
    <div>
      <Head>
        <title>Cagir.az - Haqqımızda</title>
        <meta property="og:title" content="Cagir.az - Haqqımızda" />
        <meta
          name="description"
          content="Cagir.az - Haqqımızda haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu səhifəyə baş çəkib faydalana bilərsiniz."
        />
      </Head>
      <div className="flex flex-col  pb-[50px] pt-[30px] md:pb-[60px] lg:pb-[70px] xl:pb-[80px] 2xl:pb-[90px]">
        <h1 className="text-center my-h2 pb-[30px] lg:pb-[60px]">Haqqımızda</h1>
        <div className="flex flex-col  pb-[50px] pt-[30px] md:pb-[60px] lg:pb-[70px] xl:pb-[80px] 2xl:pb-[90px]">
          <div className="flex flex-col items-center font-semibold  gap-y-[15px] pb-[30px] lg:pb-[90px] text-[#595959]">
            <p className="text-[12px] lg:text-[18px] leading-[22px] lg:leading-[34px] w-full lg:w-2/3 text-center">
              Cagir.az 2020-ci ildən fəaliyyətə başlamış və illik artan
              tendensiyada olan uğurlu sifarişləri icra etmişdir. Əsas
              fəaliyyətimiz hüquqi və fiziki şəxsləri əhatələndirərək bütün
              məişət xidmətlərinin istənilən ünvana təyini və alış-verişini
              həyata keçirtməkdən ibarətdir. Xidmətlərimizin əlçatan olması üçün
              hər büdcəyə uyğun qiymətlər təklif edirik. Göstərdiyimiz xidmətin
              müştəri məmnuniyyətini artırılması üçün xidmət sahələrimizi
              genişləndirməyə davam edirik.
            </p>
          </div>
          <Image
            priority={true}
            src={video}
            alt="video_img"
            className="w-full aspect-[300/164] lg:aspect-[1392/669] pb-[20px] lg:pb-[30px]"
            unoptimized
          />

          {/* Movcud esas xidmetler */}

          {/*  */}
          <div>
            <h4 className="my-h2 py-[30px] lg:py-[60px] text-center">
              Mövcud əsas xidmət sahələrimiz
            </h4>
            <div className="flex flex-row gap-x-[15px] items justify-between">
              <Link
                href={messages["cleaning-service-url"]}
                className="py-[15px] w-full bg-green-400 rounded-[15px] text-center font-semibold lg:font-bold text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] text-white"
              >
                Təmizlik xidmətləri
              </Link>
              <Link
                href={messages["handyman-services-url"]}
                className="py-[15px] w-full bg-cagiraz rounded-[15px] text-center font-semibold lg:font-bold text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] text-white"
              >
                Usta xidmətləri
              </Link>
            </div>
            <div className={containerClasses}>
              <ul className={listClasses}>
                {responseData.map(({ serviceNames, price }, index) => (
                  <div key={index}>
                    <Link
                      className={linkClasses}
                      href={`/${messages["handyman-services-url"]}/${serviceNames[0].titleUrl}`}
                    >
                      <div>
                        <h5 className="relative font-semibold lg:font-bold text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] text-black500">
                          {serviceNames[0].name}
                        </h5>
                        <p className="font-medium sm:font-semibold text-[12px] leading-[18px] text-[#595959] mt-0 sm:mt-[2px]">
                          {price}
                        </p>
                      </div>
                      <div className="hidden group-hover:block transition duration-300">
                        <Image
                          src={arrow}
                          alt="arrow_icon"
                          className="hidden lg:block"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          {/*  */}

          <Contact_Part />
          <div className="flex justify-center">
            <div className="flex items-center justify-center font-semibold gap-y-[15px] py-[30px] lg:py-[90px] text-[#595959] w-full lg:w-2/3 text-center">
              <p className="text-[12px] lg:text-[18px] leading-[22px] lg:leading-[34px] text-center">
                <span className="block">
                  Hər il artan müştəri bazamız və komandamızla daim yenilənir,
                  sizə daha yaxşı xidmət göstərmək üçün çalışırıq!
                </span>
                <span className="block">
                  Cagir.az - Peşəkar xidmət, sərfəli qiymət!{" "}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-y-[60px] ">
            {/* <Deyerler {...{ messages, chosenLang }} /> */}
            {/* lg:gap-x-[10px] 2xl:gap-x-[60px] */}
            {/* <div className="max-w-[300px] screen360:max-w-[340px] screen375:max-w-[355px] screen390:max-w-[370px] screen412:max-w-[392px] screen428:max-w-[408px] sm:max-w-[620px] md:max-w-[748px] lg:max-w-[964px] xl:max-w-[1220px] ">
            <Musteriler {...{ messages }} />
          </div> */}
            {/* musteri part */}
            <div>
              <h2 className="my-h2 mb-[15px] lg:mb-[60px] text-center">
                {/* {messages["customers"]} */}
                Korporativ müştərilər
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {musteriData?.map(({ id, imageUrl, title, url }) => (
                  <div key={id} className={`${!url ? "hidden" : ""}`}>
                    {url && (
                      <Link href={url} target="_blank" className="">
                        <Image
                          alt={title}
                          src={`https://api.cagir.az${imageUrl}`}
                          width={300}
                          height={150}
                          className="px-[5px] md:px-[15px] drop-shadow-cardAlt py-[10px]"
                          loading="lazy"
                          unoptimized
                        />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/*  */}

            <div>
              <h4 className="my-h2 text-center pb-[30px] lg:pb-[60px]">
                Komandamız
              </h4>
              <div className="grid gap-x-[20px] gap-y-[20px] screen360:gap-x-[30px] screen428:gap-x-[40px] sm:gap-x-[20px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {teamInfos.map(({ name, position }, index) => {
                  return (
                    <div key={index} className="">
                      <TeamCard {...{ name, position }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
