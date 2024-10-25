import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
const AliceCarousel = dynamic(() => import("react-alice-carousel"), {
  ssr: false,
});
import Image from "next/image";
import Link from "next/link";

const responsive = {
  0: { items: 2 },
  400: { items: 3 },
  1024: { items: 4 },
};

function Musteriler() {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.cagir.az/api/adminDictionary/getAll?dictionaryType=4", {
        headers: {
          "Accept-Language": "az",
        },
      })
      .then((response) => {
        // Handle the response data
        setResponseData(response.data.result);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2 className="my-h2 mb-0 lg:mb-[15px] text-center">
        {/* {messages["customers"]} */}
        Korporativ müştərilər
      </h2>
      <AliceCarousel
        animationDuration={1300}
        animationType="fadeout"
        controlsStrategy="responsive"
        infinite
        mouseTracking
        items={responseData?.map(({ id, imageUrl, title, url }) =>
          imageUrl === null ? null : (
            <div key={id} className="">
              <Link
                href={url || "/"}
                target="_blank"
                className="max-w-[300px] max-h-[150px]"
              >
                <Image
                  // fill
                  alt={title}
                  title={title}
                  src={`https://api.cagir.az${imageUrl}`}
                  width={300}
                  height={150}
                  className="px-[5px] md:px-[15px] drop-shadow-cardAlt py-[10px]"
                  loading="lazy"
                  unoptimized
                />
              </Link>
            </div>
          )
        )}
        responsive={responsive}
        animationEasingFunction="ease"
        disableButtonsControls
        paddingLeft={0}
        paddingRight={0}
        keyboardNavigation
        touchTracking={true}
        touchMoveDefaultEvents={false}
      />
    </div>
  );
}

export default Musteriler;
