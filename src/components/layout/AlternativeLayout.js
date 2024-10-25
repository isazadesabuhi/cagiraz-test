import CallIncmngWp from "@/src/components/buttons/callIncmngWp";
import Footer from "@/src/components/main/footer";
import az from "@/src/data/az.json";
import dynamic from "next/dynamic";
import NavbarDesktop from "@/src/components/header/NavbarDesktop";
import NavbarMobile from "@/src/components/header/NavbarMobile";
import Head from "next/head";
import { useRouter } from "next/router";
import useWindowSize from "@/src/hooks/useWindowSize";
import SifarishBtn from "@/src/components/buttons/sifarishBtn";

const LiveChat = dynamic(() => import("@/src/components/others/livechat"), {
  loading: () => <></>,
  ssr: false,
});

export default function Layout({ children }) {
  const router = useRouter();
  const messages = az;

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
        className={`flex flex-col px-[10px] lg:px-[60px] mt-[40px] lg:mt-0 min-h-screen w-full`}
      >
        {children}
      </main>

      {/* Buttons */}
      <div className="flex justify-center">
        <SifarishBtn
          {...{ messages }}
          classNames="lg:hidden bottom-[62px] fixed"
        />
      </div>

      {/* Call Button */}
      {width > 1024 && (
        <div className="hidden lg:flex justify-center items-center">
          <CallIncmngWp classNames="bottom-[80px] fixed" {...{ messages }} />
        </div>
      )}

      <div>
        <LiveChat />
        <Footer {...{ messages }} />
      </div>
    </div>
  );
}
