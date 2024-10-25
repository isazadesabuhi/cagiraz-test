import React from "react";
import Invoice_Card from "@/src/components/cards/invoiceCard";
import PrimaryMdBtn from "@/src/components/buttons/primary_md_btn";
import PrimaryOutlineSmBtn from "@/src/components/buttons/primaryOutlineSmBtn";

function Receipt({ dataReceipt }) {
  return (
    <div className="flex flex-col md:mx-100 lg:mx-200 2xl:mx-250 pt-30 lg:pt-60 pb-60">
      <h2 className="my-h2 text-center pb-5 lg:pb-15">
        Ödənişin uğurla tamamlandı
      </h2>

      <p className="font-medium lg:font-semibold text-12 lg:text-18 leading-18 lg:leading-27 text-center pb-15 lg:pb-60">
        Təşəkkür edirik!
      </p>

      <div className="bg-white rounded-20 drop-shadow-card">
        <Invoice_Card dataReceipt={dataReceipt} />
      </div>

      {/* Button Section */}
      <div className="flex flex-col pt-20 lg:pt-35 space-y-15">
        <div className="flex lg:justify-end">
          <PrimaryMdBtn btnName="Qəbzi yüklə" classNames="w-full lg:w-auto" />
        </div>

        <PrimaryOutlineSmBtn
          btnName="Emailə göndər"
          classNames="block lg:hidden"
        />
      </div>
    </div>
  );
}

export default Receipt;
