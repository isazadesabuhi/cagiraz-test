import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import ExecutiveCard from "@/src/components/cards/executiveCard"

const responsive = {
  0: { items: 2 },
  580: { items: 3 },
  1300: { items: 4 },
};

function Executers({ messages, executersData }) {
  const data = executersData || [];

  if (data.length === 0) return null;

  const childDataArray = data.map((child) => (
    <ExecutiveCard 
      key={child.name}
      name={child.name}
      title={child.title}
      image={child.imageUrl}
      description={child.description}/>
  ));

  return (
    <div id="target-element-1">
      <h2 className="my-h2 mb-0 lg:mb-[15px] text-center">
        {messages.executives}
      </h2>

      <div className="flex flex-row justify-center gap-x-[10px] sm:gap-x-[40px]">
        {data.length < 3 ? (
          childDataArray
        ) : (
          <AliceCarousel
            controlsStrategy="default"
            infinite
            mouseTracking
            responsive={responsive}
            items={childDataArray}
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

export default Executers;
