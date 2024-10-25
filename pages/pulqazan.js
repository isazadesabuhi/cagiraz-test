import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";
import InputCustomized from "@/src/components/input/input";
import PrimarySmBtn from "@/src/components/buttons/primarySmBtn";

function PulQazan() {
  const [valueFromInput, setValueFromInput] = useState("");
  const [labelFromInput, setLabelFromInput] = useState("");
  const [inputPairs, setInputPairs] = useState({});

  const handleInputChange = (value, label) => {
    setValueFromInput(value);
    setLabelFromInput(label);

    setInputPairs((prevInputPairs) => ({
      ...prevInputPairs,
      [label]: value,
    }));
  };

  const objectEarnMoney = {
    senderName: inputPairs["Göndərən şəxsin adı"],
    senderEmail: inputPairs["Göndərən şəxsin emaili"],
    senderPhoneNumber: inputPairs["Göndərən şəxsin nömrəsi"],
    receiverName: inputPairs["Alan şəxsin adı"],
    receiverEmail: inputPairs["Alan şəxsin emaili"],
    receiverPhoneNumber: inputPairs["Alan şəxsin nömrəsi"],
  };

  /* --------------------- Creating affiliate --------------------- */
  const [createAffiliate, setCreateAffiliate] = useState([]);
  const [isSucess, setIsSucess] = useState(false);
  const handleClick = () => {
    axios
      .post(
        "https://api.cagir.az/api/affilate/create",
        { ...objectEarnMoney },
        {
          headers: {
            "Accept-Language": "az",
          },
        }
      )
      .then((response) => {
        // setIsSucess(true)
        // Handle the response data
        setIsSucess(response.data.isSuccess);
        setCreateAffiliate(response.data.result);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div>
      <Head>
        <title>Cagir.az - PulQazan</title>
        <meta property="og:title" content="Cagir.az - PulQazan" />
        <meta
          name="description"
          content="Cagir.az - PulQazan haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu səhifəyə baş çəkib faydalana bilərsiniz."
        />
      </Head>
      <div className="flex flex-col pt-[30px] pb-[60px]">
        <div className="flex flex-col lg:flex-row ">
          <h1 className="my-h2 block lg:hidden font-semibold text-[16px] leading-[24px] text-center pb-[15px] text-black">
            PulQazan
          </h1>

          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-[#EAEAEA] w-full">
            <div className="lg:w-2/5 lg:pr-[40px] xl:pr-[80px] 2xl:pr-[120px] pb-[15px] lg:pb-0">
              <p className="font-semibold lg:font-bold text-[12px] lg:text-[20px] leading-[18px] lg:leading-[30px] text-black500 pb-[5px] lg:pb-[30px]">
                Gün ərzində 100 AZN qazanmaq şansı!
              </p>

              <div className="h-full flex flex-col gap-y-[15px] lg:gap-y-0 lg:justify-between font-normal lg:font-medium text-[12px] lg:text-[16px] leading-[22px] lg:leading-[34px]  text-gray900">
                <div className="">
                  <p>
                    Oturduğunuz yerdə pul qazanmaq istəyirsiniz? Bu əla fürsəti
                    sizə cagir.az verir. Bunun üçün:
                  </p>
                </div>

                <div>
                  <p className="flex flex-col">
                    <span>1. Məlumatları doldurursunuz</span>
                    <span>
                      2. Dostunuzun email qutusuna xidmətlərdən istifadə üçün
                      keçid göndərilir
                    </span>
                    <span>
                      3. Dostunuzun hər hansı cagir.az xidmətinə ehtiyacı
                      olduqda bu keçid vasitəsilə sifarişverir və siz hər
                      verilən sifarişə görə 10 AZN qazanırsınız
                    </span>
                    <span className="">
                      4. Sifariş tamamlandıqdan sonra cagir.az tərəfindən email
                      alır və mükafatınızı əldə edirsiniz
                    </span>
                  </p>
                </div>

                <div>
                  <p>
                    Qeyd: Bu əməliyyatı istənilən sayda müxtəlif dostlarınıza
                    göndərə bilərsiniz.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:w-3/5 lg:pl-[20px] xl:pl-[70px] 2xl:pl-[120px] pt-[20px] lg:pt-0">
              <h4 className="hidden lg:block font-bold text-[28px] leading-[42px] text-start pb-[30px]">
                PulQazan!
              </h4>
              <div className="flex flex-col gap-y-[15px] justify-between">
                <InputCustomized
                  label="Göndərən şəxsin adı"
                  type="text"
                  onInputChange={handleInputChange}
                />
                <InputCustomized
                  label="Göndərən şəxsin emaili"
                  type="email"
                  onInputChange={handleInputChange}
                />
                <InputCustomized
                  label="Göndərən şəxsin nömrəsi"
                  type="number"
                  onInputChange={handleInputChange}
                />
                <InputCustomized
                  label="Alan şəxsin emaili"
                  type="email"
                  onInputChange={handleInputChange}
                />
                <InputCustomized
                  label="Alan şəxsin adı"
                  type="text"
                  onInputChange={handleInputChange}
                />
                <InputCustomized
                  label="Alan şəxsin nömrəsi"
                  type="number"
                  onInputChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full lg:justify-end pt-[20px] xl:pt-[25px] 2xl:pt-[30px]">
          <PrimarySmBtn
            btnName="Təsdiq et"
            classNames="w-full"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default PulQazan;
