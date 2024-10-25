import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "@/src/public/logo.svg";
import search from "@/src/icons/header/search.svg";
import search1 from "@/src/icons/header/search1.svg";
import profile from "@/src/icons/header/profile.svg";
import profile1 from "@/src/icons/header/profile1.svg";
import wallet from "@/src/icons/header/wallet.svg";
import wallet1 from "@/src/icons/header/wallet1.svg";
import LangSection from "@/src/components/others/LangSection";
import PrimarySmBtn from "@/src/components/buttons/primarySmBtn";
import placeholder from "@/src/public/placeholder.webp";

export default function NavbarDesktop({ messages }) {
  const router = useRouter();

  function isPathMatch(routerAsPath, linkComponentPaths) {
    return linkComponentPaths.some((path) =>
      new RegExp(`^${path}(\\?.*)?$`).test(routerAsPath)
    );
  }

  const linkComponentPaths = [
    "/master",
    "/clean",
    "/climate",
    "/combi",
    "/plumber",
  ];

  const isPathIncluded = isPathMatch(router.asPath, linkComponentPaths);

  const linkInfos = [
    {
      href: `/${messages["cleaning-service-url"]}`,
      text: messages["cleaning"],
    },
    { href: `/${messages["combi-master-url"]}`, text: messages["usta-kombi"] },
    {
      href: `/${messages["master-plumber-url"]}`,
      text: messages["usta-santexnik"],
    },
    {
      href: `/${messages["air-conditioner-master-url"]}`,
      text: messages["usta-kondisioner"],
    },
    {
      href: `/${messages["handyman-services-url"]}`,
      text: messages["usta-services"],
    },

    { href: "/xidmetler", text: messages["all-services"] },
    {
      href: `korporativ`,
      text: messages["corporate-cooperation"]
    },
  ];

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [token]);

  const PushToMainPageAz = (e) => {
    e.preventDefault(); // Prevent default link behavior
    // Change locale
    router.push("/", "/", { locale: "az" });
  };

  const PushToAxtarisAz = (e) => {
    e.preventDefault(); // Prevent default link behavior
    // Change locale
    router.push("/axtaris", "/axtaris", { locale: "az" });
  };

  const PushToOdenisAz = (e) => {
    e.preventDefault(); // Prevent default link behavior
    // Change locale
    router.push("/payment", "/payment", { locale: "az" });
  };

  const PushToGirisAz = (e) => {
    e.preventDefault(); // Prevent default link behavior
    // Change locale
    router.push("/giris", "/giris", { locale: "az" });
  };

  const PushToQeydiyyatAz = (e) => {
    e.preventDefault(); // Prevent default link behavior
    // Change locale
    router.push("/giris", "/giris", { locale: "az" });
  };

  // const isPathIncluded = () => {
  //   return (linkComponentPaths.some((path) => router.asPath.startsWith(path)) ||
  //   ["/master-plumber","/combi-master","/air-conditioner-master"].includes(router.asPath))
  //     };

  // console.log(isPathIncluded())
  return (
    <>
      <header className="hidden lg:block border-b-[1px] border-[#EAEAEA]">
        <nav className="relative w-full bg-white top-0 left-0 right-0 px-[10px] lg:px-[60px] ">
          {/* 1st navbar */}
          <div className="py-[12px] justify-between mx-auto items-center flex relative ">
            {/* 1st navbar-left side-LOGO */}

            <Link
              href="/"
              onClick={isPathIncluded ? PushToMainPageAz : null}
              className=""
            >
              <Image
                // loading="lazy"
                priority={true}
                src={logo}
                alt="Cagir.az"
                title="Cagir.az"
                className="w-[140px] h-[38px]"
                unoptimized
              />
            </Link>

            {/* 1st navbar-right side */}
            <ul className="flex flex-row justify-center items-center space-x-[30px] h-full z-10">
              {/* search icon */}
              <li key={0} className="">
                <Link
                  href="/axtaris"
                  className="group flex relative"
                  onClick={isPathIncluded ? PushToAxtarisAz : null}
                >
                  <button aria-label="search">
                    <div className="relative group ">
                      <Image
                        loading="lazy"
                        src={search}
                        alt="search_alt"
                        className="transition duration-300 ease-in-out group-hover:opacity-0 w-[25px] h-[25px]"
                        unoptimized
                      />
                      <Image
                        loading="lazy"
                        src={search1}
                        alt="search_alt_1"
                        className="absolute top-0 left-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 w-[25px] h-[25px]"
                        unoptimized
                      />
                    </div>
                  </button>
                  <span
                    className="mt-[12px] rounded-[5px] py-[4px] px-[6px] font-medium
                  text-[12px] leading-[15px] bg-black500 text-white group-hover:opacity-100 transition-opacity absolute left-1/2
                  -translate-x-1/2 translate-y-full opacity-0"
                  >
                    {messages.search}
                  </span>
                </Link>
              </li>

              {/* wallet icon */}
              <li key={1}>
                <Link
                  onClick={isPathIncluded ? PushToOdenisAz : null}
                  className="group flex relative"
                  href="/payment"
                >
                  <span>
                    <div className="relative group">
                      <Image
                        loading="lazy"
                        src={wallet}
                        alt="wallet_alt"
                        className="transition duration-300 ease-in-out group-hover:opacity-0 w-[25px] h-[25px]"
                        unoptimized
                      />
                      <Image
                        loading="lazy"
                        src={wallet1}
                        alt="wallet_alt_1"
                        className="absolute top-0 left-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 w-[25px] h-[25px]"
                        unoptimized
                      />
                    </div>
                  </span>
                  <span
                    className="mt-[12px] rounded-[5px] py-[4px] px-[6px] font-medium
                  text-[12px] leading-[15px] bg-black500 text-white group-hover:opacity-100 transition-opacity absolute left-1/2
                  -translate-x-1/2 translate-y-full opacity-0"
                  >
                    {messages.payment}
                  </span>
                </Link>
              </li>
              {/* Profile if not logged in */}
              <li key={2}>
                <Link
                  onClick={isPathIncluded ? PushToGirisAz : null}
                  className={
                    token.length === 0 ? "group flex relative" : "hidden"
                  }
                  href="/giris"
                >
                  <span>
                    <div className="relative group">
                      <Image
                        loading="lazy"
                        src={profile}
                        alt="profile_alt"
                        className="transition duration-300 ease-in-out group-hover:opacity-0 w-[25px] h-[25px]"
                        unoptimized
                      />
                      <Image
                        loading="lazy"
                        src={profile1}
                        alt="profile_alt_1"
                        className="absolute top-0 left-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 w-[25px] h-[25px]"
                        unoptimized
                      />
                    </div>
                  </span>
                  <span
                    className="mt-[12px] rounded-[5px] py-[4px] px-[6px] font-medium
                  text-[12px] leading-[15px] bg-black500 text-white group-hover:opacity-100 transition-opacity absolute left-1/2
                  -translate-x-1/2 translate-y-full opacity-0 whitespace-nowrap"
                  >
                    {messages.login}
                  </span>
                </Link>

                <Link
                  href="/profile"
                  className={token.length === 0 ? "hidden" : ""}
                >
                  <Image
                    loading="lazy"
                    src={placeholder}
                    alt="profile_pic"
                    className="w-[25px] h-[25px] rounded-full"
                    unoptimized
                  />
                </Link>
              </li>
              {/* Language choice section */}
              <li key={3}>
                <LangSection />
              </li>
            </ul>
          </div>

          {/* 2nd navbar */}
          <div className="flex justify-between relative z-0">
            {/* 2nd navbar-1st part */}
            <ul
              className=" flex flex-row  
           items-center font-semibold text-[12px] xl:text-[12px] 2xl:text-[14px] leading-[21px] text-black space-x-[35px] lg:space-x-[35px] xl:space-x-[55px] 2xl:space-x-[65px]"
            >
              {linkInfos.map(({ href, text }, index) => (
                <li key={index}>
                  {isPathIncluded ? (
                    <a href={href}>
                      <p className="transition duration-300 hover:text-[#959595]">
                        {text}
                      </p>
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="transition duration-300 hover:text-[#959595]"
                    >
                      {text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            {/* 2nd navbar-2nd part- Qeydiyyat button */}
            <Link
              href={token.length > 0 ? "is-axtariram" : "/qeydiyyat"}
              className="py-[7px]"
            >
              <PrimarySmBtn
                btnName={
                  token.length > 0
                    ? messages["work-with-us"]
                    : messages.register
                }
              />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
