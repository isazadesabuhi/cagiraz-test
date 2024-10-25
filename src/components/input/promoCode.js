import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import useOutsideClick from "@/src/components/others/UseOutsideClick";
import validation from "@/src/icons/form/validation.svg";

const Promocode = ({
  serviceId,
  priceBeforePromo,
  onPromoPriceChange,
  messages,
}) => {
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeRequest, setPromoCodeRequest] = useState({});

  const prevPromoCodeRef = useRef("");
  const containerRef = useRef(null);

  useEffect(() => {
    setPromoCodeRequest({});
    if (promoCode.length === 8) checkIfPromoIsValid();
  }, [serviceId, priceBeforePromo, promoCode]);

  useEffect(() => {
    onPromoPriceChange(promoCodeRequest.amount);
  }, [onPromoPriceChange, promoCodeRequest.amount]);

  useOutsideClick(containerRef, () => setIsInputClicked(false));

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value.toUpperCase().slice(0, 8));
  };

  const handleInputClick = () => {
    const currentPromoCode = isInputClicked
      ? prevPromoCodeRef.current
      : promoCode;
    prevPromoCodeRef.current = promoCode;
    setPromoCode(currentPromoCode);
    setIsInputClicked(!isInputClicked);
  };

  const checkIfPromoIsValid = () => {
    const payload = { serviceId, amount: priceBeforePromo, promoCode };
    const headers = { "Accept-Language": "az" };

    axios
      .post("https://api.cagir.az/api/promo/calculate", payload, { headers })
      .then((response) => setPromoCodeRequest(response.data.result))
      .catch(console.error);
  };

  const isPromoCodeValid =
    promoCode.length === 8 && priceBeforePromo !== promoCodeRequest.amount;
  const inputBorderClass = isInputClicked
    ? "border-cagiraz"
    : "border-gray-300";

  return (
    <div className="flex flex-col gap-y-[5px]" ref={containerRef}>
      <p className="hidden lg:block font-semibold text-[12px] leading-[18px] text-black500">
        {messages["promo-code"]}
      </p>
      <div className="inline-flex flex-col w-full">
        <div
          className={`flex flex-row items-center px-[15px] py-[15px] lg:px-[15px] lg:py-[12.5px] border rounded-[10px] lg:rounded-full ${inputBorderClass}`}
        >
          {isInputClicked && (
            <label
              htmlFor="promo_code"
              className="block lg:hidden absolute mt-[-45px] px-[10px] z-10 bg-white font-medium text-[8px] leading-[12px] text-cagiraz"
            >
              {messages["promo-code"]}
            </label>
          )}
          <input
            type="text"
            id="promo_code"
            name="promo_code"
            className="block w-full font-semibold text-[12px] leading-[15px] text-black500 focus:outline-none focus:ring focus:ring-white border-none p-0 bg-white"
            placeholder={isInputClicked ? "" : messages["promo-code"]}
            value={promoCode}
            onChange={handlePromoCodeChange}
            onClick={handleInputClick}
          />
          {isPromoCodeValid && (
            <Image
              src={validation}
              alt="validation_icon"
              loading="lazy"
              unoptimized
            />
          )}
        </div>
        {!isPromoCodeValid && promoCode.length === 8 && (
          <p className="ml-auto font-semibold text-[12px] leading-[15px] text-danger">
            {messages["promo-code-incorrect"]}
          </p>
        )}
      </div>
    </div>
  );
};

export default Promocode;
