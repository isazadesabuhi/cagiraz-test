import React from "react";
import Image from "next/image";
import logo2 from "@/src/public/logo2_cagiraz.png";
import signature from "@/src/public/signature.jpg";

function Invoice_Card({ dataReceipt }) {
  return (
    <div className="flex flex-col  ">
      <div
        className="flex flex-col p-[15px] lg:py-[20px] lg:px-[30px] xl:py-[25px] xl:px-[40px] 2xl:py-[30px] 2xl:px-[50px] 
       "
      >
        {/* logo,qebz */}
        <div className="flex flex-row justify-between shadow-[0_4px_16px_rgba(32, 32, 32, 15%)]">
          <div className="">
            <Image
              src={logo2}
              alt="logo2"
              className="w-[56px] h-[40px]"
              loading="lazy"
              unoptimized
            />
          </div>

          <div className="flex flex-col">
            <h2 className="my-h2">Qəbz #25484512</h2>
            <p className="font-semibold text-[12px] lg:text-[14px] leading-[18px] lg:leading-[21px]">
              {/* Tarix: 03.08.2023 */}
              Tarix: {dataReceipt ? dataReceipt.startDate.slice(0, 10) : ""}
            </p>
          </div>
        </div>

        <div className="text-[12px] leading-[18px]">
          <div className="pt-[30px] lg:pt-0  pb-[30px] lg:pb-[60px]">
            <p className="font-normal">
              <span className="font-extrabold">Ünvan: </span>
              {dataReceipt ? dataReceipt.address : ""}
            </p>
          </div>

          {/* xidmet yolu ve bir xidmet sayi qiymeti */}
          <div className="flex flex-col lg:flex-row lg:justify-between border-b border-[#EAEAEA] pb-[10px] lg:pb-[15px]">
            <p className="font-normal ">
              <span className="font-extrabold">Xidmət: </span>
              {dataReceipt ? dataReceipt.selectedNamesArray[0] : ""} &gt;
              {dataReceipt ? dataReceipt.selectedNamesArray[1] : ""}
              {dataReceipt && dataReceipt.selectedNamesArray[2] ? ">" : ""}
              {dataReceipt ? dataReceipt.selectedNamesArray[2] : ""}
            </p>

            <p className="font-normal">
              1 xidmət sayı məbləği:{" "}
              <span className="font-extrabold">15 AZN</span>
            </p>
          </div>
          {/* say secimi */}
          <div className="border-b border-[#EAEAEA] py-[10px] lg:py-[15px]">
            <p className="font-normal"></p>
            {dataReceipt && dataReceipt.criterias
              ? dataReceipt.criterias.map((item, index) => (
                  <div key={index}>
                    <span className="font-extrabold">Say seçimi: </span>
                    {item.count} {item.name}
                  </div>
                ))
              : ""}
          </div>
          {/* odeme usulu */}
          <div className="border-b border-[#EAEAEA] py-[10px] lg:py-[15px]">
            <p className="font-normal">
              <span className="font-extrabold">Ödəmə üsulu: </span>
              Kart vasitəsilə
            </p>
          </div>
        </div>
        {/* imza, yekun mebleg */}
        <div className="flex flex-row justify-between pt-[10px] lg:pt-[60px] pb-[15px]">
          <Image src={signature} alt="signature" loading="lazy" unoptimized />
          <div className="flex flex-col justify-between">
            <p className="font-semibold text-[14px] leading-[21px]">
              YEKUN MƏBLƏĞ
            </p>
            <p className="font-bold text-[28px] leading-[42px]">
              {dataReceipt ? dataReceipt.amount : 0} AZN
            </p>
          </div>
        </div>
        {/* ad ve email */}
        <div className="flex flex-col">
          <p className="font-semibold text-[12px] leading-[18px]">
            Tağı Əsədullazadə
          </p>
          <p className="font-medium text-[12px] text-cagiraz leading-[15px] ">
            tagi.asadullazadeh@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Invoice_Card;
