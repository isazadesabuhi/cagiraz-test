import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "@/src/public/logo.svg";
import phone from "@/src/icons/footer/phone.svg";
import email from "@/src/icons/footer/email.svg";
import copyright from "@/src/icons/footer/copyright.svg";
import SocialNetworks from "@/src/components/others/SocialNetworks";
import InputBtnTransition from "@/src/components/input/inputBtnTransition";

const Footer = ({ messages }) => {
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

  return (
    <>
      <footer>
        <div className="hidden sm:block lg:px-[60px] pt-[15px] lg:pt-[80px] pb-[115px] lg:pb-[90px] bg-white200 w-full">
          <div className="flex lg:hidden mb-[40px] lg:mb-[30px] justify-center lg:justify-start">
            <Link as="/" href="/">
              <Image
                src={logo}
                className="h-[27px] w-[106px]"
                alt="Cagir.az"
                title="Cagir.az"
                loading="lazy"
                unoptimized
                // priority={true}
              />
            </Link>
          </div>
          {/* first left */}
          <div className="grid grid-cols-2 lg:grid-cols-4 justify-between gap-y-[40px] lg:gap-y-0">
            {/* 1st column-Cagir.az */}
            <div className="justify-center col-span-2 lg:col-auto lg:justify-start order-4  lg:order-1 mx-auto lg:mx-0">
              {/* 4th column:title */}
              <Link as="/" href="/">
                <Image
                  src={logo}
                  alt="Cagir.az"
                  title="Cagir.az"
                  className="hidden lg:flex mb-[20px] lg:mb-[30px] justify-center lg:justify-start h-[27px] w-[106px]"
                  // priority={true}
                  loading="lazy"
                  unoptimized
                />
              </Link>

              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-center lg:items-start gap-y-[20px] lg:gap-y-[30px]">
                  <div className="flex flex-col gap-y-[8px]">
                    <div className="flex gap-x-[10px] justify-center lg:justify-start">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={phone}
                        alt="phone_icon"
                        loading="lazy"
                        unoptimized
                      />
                      <Link
                        className="font-semibold text-[14px] leading-[21px] text-gray900 hover:text-black transition duration-300"
                        href="tel:994703482606"
                      >
                        +994 70 348 26 06
                      </Link>
                    </div>
                    <div className="flex gap-x-[10px] justify-center lg:justify-start">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={phone}
                        alt="phone_icon"
                        loading="lazy"
                        unoptimized
                      />
                      <Link
                        className="font-semibold text-[14px] leading-[21px] text-gray900 hover:text-black transition duration-300"
                        href="tel:994773482606"
                      >
                        +994 77 348 26 06
                      </Link>
                    </div>
                    <div className="flex gap-x-[10px] justify-center lg:justify-start">
                      <Image
                        className="w-[20px] h-[20px]"
                        src={email}
                        alt="email_icon"
                        loading="lazy"
                        unoptimized
                      />
                      <Link
                        className="font-semibold text-[14px] leading-[21px] text-gray900 hover:text-black transition duration-300"
                        href="mailto:info@cagir.az"
                      >
                        info@cagir.az
                      </Link>
                    </div>
                  </div>

                  <SocialNetworks classNames="flex flex-row justify-center lg:justify-start space-x-[25px]" />
                  <div className="flex justify-center lg:hidden">
                    <Link
                      href="/haqqimizda/terms"
                      className="text-cagiraz font-extrabold lg:text-gray900 lg:font-semibold lg:hover:text-black transition duration-300 indivne-block min-w-max"
                    >
                      {messages["terms"]}
                    </Link>
                  </div>
                  <div className="flex justify-center lg:hidden gap-x-[10px]">
                    <Image
                      src={copyright}
                      alt="copyright_icon"
                      className="w-[20px] h-[20px]"
                      loading="lazy"
                      unoptimized
                    />

                    <p className="font-medium lg:font-semibold text-[12px] lg:text-[14px] leading-[18px] lg:leading-[21px] text-gray900">
                      2023 Cagir.az. Bütün hüquqlar qorunur
                    </p>
                  </div>
                </div>
                <div className="hidden lg:flex justify-center lg:justify-start items-end">
                  <div className="flex gap-x-[10px] lg:pt-[72px] xl:pt-[91px]">
                    <Image
                      src={copyright}
                      alt="copyright_icon"
                      className="w-[20px] h-[20px]"
                      loading="lazy"
                      unoptimized
                    />
                    <p className="font-medium lg:font-semibold text-[12px] lg:text-[14px] leading-[18px] lg:leading-[21px] text-gray900">
                      {/* 2023 Cagir.az. Bütün hüquqlar qorunur */}
                      {messages.copyright}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Faydali kecidler */}
            <div className="flex flex-col mx-auto justify-start order-2 space-y-[10px] lg:space-y-[15px] text-gray900">
              <h2 className="font-extrabold text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] text-black500 mb-[10px] lg:mb-[15px]">
                {messages["useful-links"]}
              </h2>
              <ul className="space-y-[10px] lg:space-y-[24px] font-semibold text-[14px] leading-[21px] min-w-max">
                {[
                  { href: "/haqqimizda", text: "about" },
                  { href: "/faq", text: "faq-short" },
                  { href: "/elaqe", text: "contact" },
                  { href: "/blog", text: "blog" },
                  { href: "/media", text: "media" },
                  { href: "/xidmet", text: "about-services" },
                ].map((link, index) => (
                  <li
                    key={index}
                    className="hover:text-black transition duration-300"
                  >
                    {isPathIncluded ? (
                      <a href={link.href}>
                        {messages[link.text] ? messages[link.text] : link.text}
                      </a>
                    ) : (
                      <Link href={link.href}>
                        {messages[link.text] ? messages[link.text] : link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3rd column-Xidmetler */}
            <div className="flex flex-col mx-auto justify-start order-1 lg:order-3 ">
              <h2 className="pb-[10px] lg:pb-[10px] mb-[10px] lg:mb-[15px] font-extrabold text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] text-black500 hover:text-black transition duration-300">
                {messages["services"]}
              </h2>
              <ul className="space-y-[10px] lg:space-y-[24px] font-semibold text-[14px] leading-[21px] min-w-max text-gray900">
                {[
                  {
                    href: `/${messages["cleaning-service-url"]}`,
                    text: "cleaning",
                  },
                  {
                    href: `/${messages["combi-master-url"]}`,
                    text: "usta-kombi",
                  },
                  {
                    href: `/${messages["master-plumber-url"]}`,
                    text: "usta-santexnik",
                  },
                  { href: "/xidmetler", text: "all-services" },
                  { href: "/pulqazan", text: "affilate" },
                  { href: "/is-axtariram", text: "work-with-us" },
                ].map((link) => (
                  <li
                    key={link.text}
                    className="hover:text-black transition duration-300"
                  >
                    {isPathIncluded ? (
                      <a href={link.href}>{messages[link.text]}</a>
                    ) : (
                      <Link href={link.href}>{messages[link.text]}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* 4th column-Yeniliklerden xeberdar ol */}
            <div className="flex flex-col col-span-2 lg:col-span-1 items-center lg:items-start lg:justify-start order-3 lg:order-4 lg:mx-0 justify-between">
              {/* 4th column:title */}
              <h2 className="lg:mb-[15px] font-extrabold text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] text-black500 text-left">
                {messages["stay-up-to-date"]}
              </h2>
              <div className="flex flex-col lg:justify-between lg:h-full">
                <InputBtnTransition
                  name={`${messages["enter-email"]}`}
                  placeholder={`${messages["enter-email"]}`}
                  classNames="hidden lg:block"
                />
                <div className="hidden lg:flex justify-center lg:justify-end items-end">
                  <Link
                    href="/haqqimizda/terms"
                    className="text-cagiraz font-extrabold lg:text-gray900 lg:font-semibold lg:hover:text-black transition duration-300 inline-block min-w-max"
                  >
                    {messages["terms"]}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-[15px] pb-[115px] bg-white200 sm:hidden">
          <SocialNetworks classNames="flex flex-row justify-center space-x-[25px]" />
        </div>
      </footer>
    </>
  );
};

export default Footer;
