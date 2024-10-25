import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import InputCustomized from "@/src/components/input/input";
import InputPassword from "@/src/components/input/inputPassword";
import PrimaryMdBtn from "@/src/components/buttons/primaryMdBtn";

import { LinkSmBtn } from "@/src/components/buttons";

function SignIn() {
  const [email, setEmail] = useState("");
  const [mainPagePassword, setMainPagePassword] = useState("");

  const handleEmailUpdate = (criteriaId, value) => {
    setEmail(value);
  };

  const handlePasswordChange = (password) => {
    setMainPagePassword(password);
  };

  const router = useRouter();

  const goBack = () => {
    router.back(); // Navigates back to the previous page
  };

  /* ----------------------------------- Sign Api ---------------------------------- */
  const [signin, setSignIn] = useState("");

  const btnIsClicked = () => {
    axios
      .post(
        "https://api.cagir.az/api/user/login",
        {
          username: email,
          password: mainPagePassword,
        }, // Make sure you define `objectDetails` before using it
        {
          headers: {
            "Accept-Language": "az",
          },
        }
      )
      .then((response) => {
        // Handle the response data
        setSignIn(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  useEffect(() => {
    // const token = signin.result?.token;

    if (signin.result?.token) {
      // Store the token in localStorage
      localStorage.setItem("token", signin.result?.token);
      window.location.href = "/";
      // Then, replace the page
      //   setTimeout(() => {
      //   router.replace("/")
      // }, 100); // 200ms delay
    }
  }, [signin, router]);

  const { locales } = useRouter();
  const intl = useIntl();
  const messages = intl.messages;

  return (
    <div>
      <Head>
        <title>Cagir.az - Daxil ol</title>
        <meta property="og:title" content="Cagir.az - Daxil ol" />
        <meta
          name="description"
          content="Cagir.az - Daxil ol haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu səhifəyə baş çəkib faydalana bilərsiniz."
        />
      </Head>

      <div className="flex flex-col items-center min-h-screen lg:justify-center pt-[200px] lg:pt-0">
        <h1 className="my-h2 text-center pb-[15px] lg:pb-[30px]">
          {messages.login}
        </h1>
        <div className="flex flex-col justify-between w-full gap-y-[20px] lg:w-2/5 ">
          <InputCustomized
            label={messages.email}
            type="email"
            updateInputText={handleEmailUpdate}
          />
          <InputPassword
            changePswrdClasses="hidden"
            onPasswordChange={handlePasswordChange}
            label={messages.password}
          />
          <p className="hidden lg:block font-semibold text-[12px] leading-[15px] pl-[15px] text-black">
            Hələ də qeydiyyatdan keçməmisən?
            <span className="font-medium text-[12px] leading-[18px] text-cagiraz pl-[5px]">
              <Link href="/qeydiyyat">{messages.register}</Link>
            </span>
          </p>

          <div className="flex flex-col justify-center lg:justify-end place-items-end	">
            <PrimaryMdBtn
              btnName={messages["do-confirm"]}
              onClick={btnIsClicked}
              classNames="w-full lg:w-1/3 lg:w-auto"
            />
            <LinkSmBtn
              onClick={goBack}
              btnName={messages["btn-back"]}
              classNames="lg:hidden w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
