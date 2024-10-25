import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useIntl } from "react-intl";
import NavbarDesktop from "@/src/components/header/NavbarDesktop";
import NavbarMobile from "@/src/components/header/NavbarMobile";
import Footer from "@/src/components/main/footer";
import SifarishBtn from "@/src/components/buttons/sifarishBtn";
import CallIncmngWp from "@/src/components/buttons/callIncmngWp";
import az from "@/src/data/az.json";
import dynamic from "next/dynamic";
import useWindowSize from "@/src/hooks/useWindowSize";

const LiveChat = dynamic(() => import("@/src/components/others/livechat"), {
  loading: () => <></>,
  ssr: false,
});

export default function Layout({ children }) {
  const router = useRouter();

  const intl = useIntl();
  const { locale: defaultLocale, messages: defaultMessages } = intl;
  const messages = useMemo(() => {
    return ["/master", "/plumber", "/combi", "/climate", "/clean"].includes(
      router.asPath
    )
      ? az
      : defaultMessages;
  }, [router.asPath, defaultMessages]);

  const [isElementVisible, setElementVisible] = useState(false);

  useEffect(() => {
    const visiblePages = [
      "/",
      "/blog",
      "/media",
      "/xidmet",
      "/haqqimizda",
      "/elaqe",
    ];

    const hasMainService = !router.query.subService && router.query.mainService;
    const isInVisiblePages = visiblePages.includes(router.asPath);
    const hasKeywordsInPath = ["/xidmet", "/blog", "/media"].some((keyword) =>
      router.asPath.includes(keyword)
    );

    setElementVisible(hasMainService || isInVisiblePages || hasKeywordsInPath);
  }, [router.query.subService, router.query.mainService, router.asPath]);

  const { width } = useWindowSize();

  return (
    <div className="screen1700:max-w-[1512px] bg-white">
      <Head>
        <link rel="canonical" href={`https://cagir.az${router.asPath}`} />
        <meta property="og:url" content={`https://cagir.az${router.asPath}`} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1 user-scalable=no"
        />
        <link
          rel="icon"
          href="https://api.cagir.az/Uploads/Logo/logo-cagir.png"
          sizes="any"
        />
      </Head>

      {/* Navigation */}
      <div className="sticky top-0 z-[999]">
        {width > 1024 ? (
          <NavbarDesktop {...{ messages }} />
        ) : (
          <NavbarMobile {...{ messages }} />
        )}
      </div>

      {/* Main Content */}
      <main
        className={`overflow-y-clip flex flex-col px-[10px] lg:px-[60px] mt-[40px] lg:mt-0 min-h-screen w-full`}
      >
        {children}
      </main>

      {/* Buttons */}
      <div className={isElementVisible ? "flex justify-center" : "hidden"}>
        <SifarishBtn
          {...{ messages }}
          classNames="lg:hidden bottom-[35px] fixed"
        />
      </div>

      {/* Call Button */}
      {router.pathname === "/[mainService]/[subService]" ||
        (width > 1024 && (
          <div className="hidden lg:flex justify-center items-center">
            <CallIncmngWp classNames="bottom-[80px] fixed" {...{ messages }} />
          </div>
        ))}

      <div>
        <LiveChat />
        <Footer {...{ messages }} />
      </div>
    </div>
  );
}
