import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "../api";

const useMainServices = () => {
  const intl = useIntl();
  const chosenLang = intl.locale;
  const router = useRouter();
  const [mainServices, setMainServices] = useState(null);

  useEffect(() => {
    if (["/", "/[mainService]"].includes(router.pathname)) {
      axios
        .get(`${BASE_URL}/service/getAllForFront`, {
          headers: { "Accept-Language": chosenLang },
        })
        .then((response) => {
          setMainServices(response.data.result);
        })
        .catch((error) => console.error(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenLang, router.pathname]);

  return mainServices;
};

export default useMainServices;
