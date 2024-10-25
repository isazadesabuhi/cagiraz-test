import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import InputCustomized from "@/src/components/input/input";
import InputNumber from "@/src/components/input/inputNumber";
import InputPassword from "@/src/components/input/inputPassword";
import PrimaryMdBtn from "@/src/components/buttons/primaryMdBtn";
import placeholder from "@/src/public/placeholder.webp";

function Profil_settings() {
  const intl = useIntl();
  const messages = intl.messages;
  const router = useRouter();

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  /* --------------------------------- PROFILE DATA API -------------------------------- */
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (token.length > 0) {
      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
        "Accept-Language": "az",
      };

      axios
        .get("https://api.cagir.az/api/user/getCurrentUser", { headers })
        .then((response) => {
          setUserData(response.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  function handleSignOut() {
    // Remove the token (or other authentication info) from storage
    localStorage.removeItem("token");

    // Redirect to a public page or the login page
    window.location.href = "/";
  }

  return (
    <div className={token === "" ? "hidden" : ""}>
      <Head>
        <title>Cagir.az - Daxil ol</title>
        <meta property="og:title" content="Cagir.az - Daxil ol" />
        <meta
          name="description"
          content="Cagir.az - Daxil ol haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu səhifəyə baş çəkib faydalana bilərsiniz."
        />
      </Head>
      <div className="flex flex-col items-center pt-[30px] pb-[60px] lg:pb-[70px] xl:pb-[80px] 2xl:pb-[90px]">
        <h1 className="my-h2 text-center pb-[15px] lg:pb-[90px]">
          Profil ayarları
        </h1>
        {/* Profil ayarlari */}
        <div className="flex flex-col lg:flex-row justify-between w-full lg:3/4 xl:w-2/3 2xl:w-1/2">
          <div className="flex flex-col items-center w-full lg:w-2/5">
            <Image
              loading="lazy"
              width={120}
              height={120}
              src={placeholder}
              alt={userData.firstName + " " + userData.lastName}
              className="rounded-full object-cover object-center w-[80px] h-[80px] lg:w-[120px] lg:h-[120px]"
              unoptimized
            />
            <h5 className="my-h5 pt-[5px] pb-[15px] lg:pt-[5px] lg:pb-[20px]">
              {userData.firstName + " " + userData.lastName}
            </h5>
            <div className="hidden lg:flex flex-col gap-y-[30px] lg:pb-[30px]">
              <div className="inline-flex flex-col w-full"></div>
              <button
                onClick={() => {
                  handleSignOut();
                }}
                className="w-auto bg-white border-2 border-[#F64242] rounded-[30px] py-[10px] px-[26px]
                      font-extrabold text-[#F64242] text-[14px] leading-[21px] transition duration-400 transform hover:-translate-y-[5px]
                      "
              >
                Profildən çıx
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-y-[20px] lg:gap-y-[15px] justify-between lg:w-3/5">
            <InputCustomized label="Ad və soyad" />

            <InputNumber label="Nömrə" />
            <InputPassword label={messages.password} />
            <div className="flex lg:justify-end py-[30px]">
              <PrimaryMdBtn
                btnName={messages["btn-save"]}
                classNames="w-full lg:w-auto"
              />
            </div>
          </div>
        </div>
        {/* for mobile Profilden cix, profili sil buttons */}
        <div className="block lg:hidden pt-[30px] space-y-[30px] w-full border-t border-[#EAEAEA]">
          {/* Profilden cix button */}
          <button
            onClick={() => {
              handleSignOut();
            }}
            className="w-full lg:w-auto bg-white border-2 border-[#F64242] rounded-[30px] py-[10px] px-[26px]
                      font-extrabold text-[#F64242] text-[14px] leading-[21px] transition duration-400 transform hover:-translate-y-[5px]
                      "
          >
            Profildən çıx
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profil_settings;
