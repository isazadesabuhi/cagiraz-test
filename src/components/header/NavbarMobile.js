import Image from "next/image";
import Link from "next/link";
import logo from "@/src/public/logo.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import burger_menu from "@/src/icons/header/burger_menu.svg";
import close from "@/src/icons/header/close.svg";
import LangSection from "@/src/components/others/LangSection";
import search1 from "@/src/icons/header/search1.svg";
import axios from "axios";

export default function NavbarMobile({ messages }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const linkInfos = [
    {
      href: `/${messages["cleaning-service-url"]}`,
      text: messages["cleaning"],
      className: "",
      index: 0,
    },
    {
      href: `/${messages["combi-master-url"]}`,
      text: messages["usta-kombi"],
      className: "",
      index: 1,
    },
    {
      href: `/${messages["master-plumber-url"]}`,
      text: messages["usta-santexnik"],
      className: "",
      index: 2,
    },
    {
      href: `/${messages["air-conditioner-master-url"]}`,
      text: messages["usta-kondisioner"],
      className: "",
      index: 3,
    },
    {
      href: `/${messages["handyman-services-url"]}`,
      text: messages["usta-services"],
      className: "",
      index: 4,
    },
    {
      href: "/xidmetler",
      text: messages["all-services"],
      className: "",
      index: 5,
    },
    {
      href: "/",
      text: messages[""],
      className: "border-b-2 border-opacity-10 border-[#959595] my-[-15px]",
      index: 6,
    },
    {
      href: `/xidmet`,
      text: messages["about-services"],
      className: "",
      index: 7,
    },
    {
      href: `/korporativ`,
      text: messages["corporate-cooperation"],
      className: "",
      index: 8,
    },
    {
      href: "/is-axtariram",
      text: messages["work-with-us"],
      className: "",
      index: 9,
    },

    { href: "/blog", text: messages["blog"], className: "", index: 10 },
    { href: "/haqqimizda", text: messages["about"], className: "", index: 11 },
    { href: "/elaqe", text: messages["contact"], className: "", index: 12 },
    { href: "/payment", text: messages["payment"], className: "", index: 13 },
    {
      href: "/giris",
      text: messages["login"],
      className: `${token ? "hidden" : ""}`,
      index: 14,
    },
    {
      href: "/qeydiyyat",
      text: messages["register"],
      className: `${token ? "hidden" : ""}`,
      index: 15,
    },
    {
      href: "/profile",
      text: messages["profile"],
      className: ` ${token ? "" : "hidden"}`,
      index: 16,
    },
    {
      href: "/",
      text: messages["logout"],
      className: `text-danger ${token ? "" : "hidden"}`,
      index: 17,
    },
  ];

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

  const [navbar, setNavbar] = useState(false);
  const handleClick = () => {
    setNavbar(!navbar);
  };

  //when logout button is clicked
  function logout(index) {
    if (index === 17) {
      // Remove the token (or other authentication info) from storage
      localStorage.removeItem("token");
      // Redirect to a public page or the login page
      window.location.href = "/";
    }
  }

  //
  const [applyType, setApplyType] = useState("");
  const [isClicked, setisClicked] = useState(false);

  const callClicked = () => {
    setApplyType(4);
    setisClicked(true);
  };

  const [applyTypeRequest, setApplyTypeRequest] = useState("");
  useEffect(() => {
    if (isClicked) {
      axios
        .post(
          "https://api.cagir.az/api/apply/create",
          {
            applyType: applyType,
          },

          { headers: { "Accept-Language": "az" } }
        )
        .then((response) => {
          setApplyTypeRequest(response.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [applyType, isClicked]);

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

  return (
    <>
      <header className="block lg:hidden">
        <nav className="w-full bg-white fixed top-0 left-0 right-0 px-[10px] lg:px-[60px] drop-shadow-[0_2px_4px_rgba(32,32,32,0.10)]">
          {/* 1st navbar */}
          <div className="flex items-center justify-between lg:block h-[40px] mx-auto ">
            {/* LOGO */}
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
                className="w-[120px] h-auto"
                unoptimized
              />
            </Link>
            {/* number */}
            <Link
              onClick={callClicked}
              href="tel:+994703482606"
              className=" lg:hidden border border-cagiraz rounded-[20px] px-[2px] screen360:px-[4px] py-[1px] screen360:py-[2px] items-center justify-center text-[10px] screen360:text-[14px]
            font-semibold text-black"
            >
              070 348 26 06
            </Link>
            {/* HAMBURGER BUTTON FOR MOBILE */}
            <div className="flex flex-row items-center">
              {/* search button */}
              <Link
                onClick={isPathIncluded ? PushToAxtarisAz : null}
                href="/axtaris"
              >
                <Image
                  loading="lazy"
                  src={search1}
                  alt="search_alt_1"
                  className="w-[20px] h-[20px]"
                  unoptimized
                />
              </Link>
              {/* language section */}
              <div className="pl-[15px]">
                <LangSection />
              </div>
              <button
                className="px-[6.25px] py-8.75px text-gray-700 outline-none pl-[20px]"
                onClick={() => setNavbar(!navbar)}
              >
                <Image
                  loading="lazy"
                  src={navbar ? close : burger_menu}
                  width={13.75}
                  height={11.25}
                  alt="logo"
                  className={`w-[16.5px] h-[13.5px] ${
                    navbar
                      ? ""
                      : "focus:border-none active:border-none object-cover object-center"
                  }`}
                  unoptimized
                />
              </button>
            </div>
          </div>

          {/* 2nd navbar */}
          <div
            className={` ${
              navbar ? "h-screen flex flex-col pb-[120px]" : "hidden"
            }`}
          >
            <ul
              className="flex flex-col justify-between font-medium h-screen  text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] leading-[18px] xs:leading-[21px]
            sm:leading-[24px] md:leading-[27px] text-[#959595] text-center"
            >
              {linkInfos.map(({ href, text, className }, index) => (
                <li key={index} className={className}>
                  {isPathIncluded ? (
                    <a
                      passHref
                      href={href}
                      onClick={() => {
                        handleClick();
                        logout(index);
                      }}
                    >
                      <p className="transition duration-300 hover:text-black">
                        {text}
                      </p>
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="transition duration-300 hover:text-black"
                      onClick={() => {
                        handleClick();
                        logout(index);
                      }}
                    >
                      {text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
