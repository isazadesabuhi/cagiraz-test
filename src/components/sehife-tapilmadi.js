// pages/404.js
import Link from "next/link";
import Head from "next/head";
import PrimaryMdBtn from "@/src/components/buttons/primaryMdBtn";

export default function SehifeTapilmadi() {
  return (
    <>
      <Head>
        <title>Səhifə Tapılmadı</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="flex flex-col gap-y-[10px] text-center">
          <h1 className="my-h2">Səhifə Tapılmadı</h1>
          <Link href="/">
            <PrimaryMdBtn
              btnName="Əsas Səhifə"
              classNames="w-[180px] px-[15px]"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
