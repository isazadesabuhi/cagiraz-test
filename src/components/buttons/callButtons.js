import CallIncmngWp from "@/src/components/buttons/callIncmngWp";
import SifarishBtn from "@/src/components/buttons/sifarishBtn";
import useMainServices from "@/src/hooks/useMainServices";
import { useRouter } from "next/router";
import useWindowSize from "@/src/hooks/useWindowSize";

function CallButtons({ messages, isAlternative, isElementVisible }) {
  const router = useRouter();
  // Fetch Main Services
  const mainServices = useMainServices();

  const { width } = useWindowSize();

  return (
    <>
      {isAlternative && (
        <>
          {/* Buttons */}
          <div className="flex justify-center">
            <SifarishBtn
              {...{ messages, mainServices }}
              classNames="lg:hidden bottom-[62px] fixed"
            />
          </div>

          {/* Call Button */}
          {width > 1024 && (
            <div className="hidden lg:flex justify-center items-center">
              <CallIncmngWp
                classNames="bottom-[80px] fixed"
                {...{ messages, mainServices }}
              />
            </div>
          )}
        </>
      )}
      {!isAlternative && (
        <>
          {/* Buttons */}
          <div className={isElementVisible ? "flex justify-center" : "hidden"}>
            <SifarishBtn
              {...{ messages, mainServices }}
              classNames="lg:hidden bottom-[35px] fixed"
            />
          </div>

          {/* Call Button */}
          {router.pathname === "/[mainService]/[subService]" ||
            (width > 1024 && (
              <div className="hidden lg:flex justify-center items-center">
                <CallIncmngWp
                  classNames="bottom-[80px] fixed"
                  {...{ messages, mainServices }}
                />
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default CallButtons;
