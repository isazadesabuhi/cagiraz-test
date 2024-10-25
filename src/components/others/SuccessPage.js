import React from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

import PrimaryMdBtn from "@/src/components/buttons/primaryMdBtn";
import LinkSmBtn from "@/src/components/buttons/linkSmBtn";
import PrimaryOutlineSmBtn from "@/src/components/buttons/primaryOutlineSmBtn";

function Success_Page() {
  const intl = useIntl();
  const messages = intl.messages;

  const router = useRouter();
  const goBack = () => {
    router.back(); // Navigates back to the previous page
  };

  const btnIsClicked = () => {
    router.replace("/temizlik-xidmeti/ev-temizleme");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center min-h-screen lg:justify-center pt-[200px] lg:pt-0">
      <h2 className="my-h2 text-center pb-[15px] lg:pb-[30px]">
        Müraciətiniz qəbul olundu
      </h2>

      <div className="flex flex-col justify-between w-full gap-y-[20px] lg:w-[460px] ">
        <div className="h-full flex flex-col gap-y-[15px] lg:gap-y-0 lg:justify-between font-normal lg:font-medium text-[12px] lg:text-[16px] leading-[22px] lg:leading-[34px]  text-gray900 text-center">
          <p>
            Əməkdaşlarımız tezliklə sizinlə əlaqəyə keçəcək. Sifariş üçün
            təşəkkür edirik!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between items-center justify-center gap-y-[15px] lg:gap-y-0">
          <div className="order-1 lg:order-2">
            <PrimaryMdBtn
              //   btnName={messages["do-confirm"]}
              btnName="Yeni sifariş yarat"
              onClick={btnIsClicked}
              classNames="w-full lg:w-1/3 lg:w-auto px-[80px] lg:px-[50px]"
            />
          </div>
          <div className="order-2 lg:order-1 ">
            <LinkSmBtn
              onClick={goBack}
              btnName={messages["btn-back"]}
              classNames="w-full block lg:hidden"
            />
            <PrimaryOutlineSmBtn
              onClick={goBack}
              btnName={messages["btn-back"]}
              classNames="w-full hidden lg:block px-[50px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success_Page;
