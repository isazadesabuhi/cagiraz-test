// pages/_app.js
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Loading from "@/src/components/Loading";
import AlternativeLayout from "@/src/components/layout/AlternativeLayout"; // Import your alternative layout component
import Layout from "@/src/components/layout/layout";
import az from "@/src/data/az.json";
import en from "@/src/data/en.json";
import ru from "@/src/data/ru.json";
import "@/src/styles/globals.css";
import "react-alice-carousel/lib/alice-carousel.css";
import { IntlProvider } from "react-intl";

import { Poppins } from "next/font/google";
import ScrollTop from "@/src/components/others/scrollTop";

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-poppins",
});

const messages = {
  az,
  en,
  ru,
};

const useRouterEvents = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (router.pathname !== "/[mainService]/[subService]") {
        console.log("onRouteChangeStart Triggered");
        setLoading(true);
      }
    };

    const handleRouteChangeComplete = () => {
      console.log("onRouteChangeComplete Triggered");
      setLoading(false);
    };

    const handleRouteChangeError = () => {
      console.log("onRouteChangeError Triggered");
      setLoading(false);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.pathname]); // Depend on router.pathname to re-run the effect when the pathname changes

  return loading;
};

// Define the paths of pages where you want to exclude the layout
const excludeLayoutForPages = [
  "en/master",
  "en/plumber",
  "en/combi",
  "en/climate",
  "en/clean",
]; // Add the paths of pages where you want to exclude the layout
const useAlternativeLayoutForPages = [
  "/master",
  "/plumber",
  "/combi",
  "/climate",
  "/clean",
]; // Add the paths of pages where you want to use the alternative layout

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { locale } = useRouter();
  const loading = useRouterEvents();

  return (
    <div className={`${poppins.variable} font-poppins`}>
      {loading ? (
        <div className="z-200">
          <Loading />
        </div>
      ) : (
        <IntlProvider locale={locale} messages={messages[locale]}>
          <>
            {excludeLayoutForPages.includes(router.route) ? (
              <Component {...pageProps} />
            ) : useAlternativeLayoutForPages.includes(router.route) ? (
              <AlternativeLayout>
                <Component {...pageProps} />
              </AlternativeLayout>
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
            <ScrollTop />
          </>
        </IntlProvider>
      )}
    </div>
  );
}
