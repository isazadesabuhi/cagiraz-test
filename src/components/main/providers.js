import React from "react";
import ReviewCard from "@/src/components/cards/reviewCard";
import starSvg from "@/src/icons/deyerler/Star.svg"
import dynamic from "next/dynamic";
const AliceCarousel = dynamic(() => import("react-alice-carousel"), {
  ssr: false,
});

const responsive = {
  0: { items: 2 },
  640: { items: 3 },
  1300: { items: 4 },
};

function Providers({ messages, providersData }) {
  return (
    <div id="target-element-0">
      <h2 className="my-h2 mb-0 lg:mb-[15px] text-center">
        {messages["customer-comments"]}
      </h2>
      <div className="flex flex-row gap-x-[30px]">
        {providersData?.length < 3 ? (
          providersData.map(({ description, id, imageUrl, providerName }) => (
            <div key={id} className="flex flex-row gap-x-[5px]">
              <ReviewCard
                {...{ description, id, imageUrl, providerName, star }}
              />
            </div>
          ))
        ) : (
          <AliceCarousel
            animationDuration={1300}
            animationType="fadeout"
            autoPlayStrategy="action"
            controlsStrategy="responsive"
            infinite
            mouseTracking
            items={providersData?.map(
              ({ description, id, imageUrl, providerName, star }) => (
                <div key={id}>
                  <ReviewCard
                    {...{ description, id, imageUrl, providerName, star }}
                  />
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
        )}
      </div>
    </div>
  );
}

export default Providers;
