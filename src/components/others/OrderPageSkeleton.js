export default function OrderPageSkeleton() {
    return (
      <div className="animate-pulse flex flex-col items-center gap-y-[20px] mt-[20px] lg:mt-[45px] mx-[10px]">
        <div className="w-[200px] lg:w-[300px] h-[25px] lg:h-[40px] bg-gray-300"></div>
        <div className="hidden lg:flex flex-row lg:gap-x-[30px]">
          <div className="flex flex-col w-[1/2] lg:w-[700px] h-[200px] bg-gray-300 rounded-[20px] px-[50px] pt-[20px]">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-y-[5px]">
                <div className="w-[50px] h-[7px] bg-gray-100"></div>
                <div className="flex flex-row gap-x-[5px] items-center">
                  <div className="w-[200px] h-[30px] bg-gray-100 rounded-full"></div>
                  <div className="w-[20px] h-[20px] rounded-full bg-gray-100"></div>
                </div>
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <div className="w-[50px] h-[7px] bg-gray-100"></div>
                <div className="flex flex-row gap-x-[5px] items-center">
                  <div className="w-[200px] h-[30px] bg-gray-100 rounded-full"></div>
                  <div className="w-[20px] h-[20px] rounded-full bg-gray-100"></div>
                </div>
              </div>
            </div>
  
            {/* Alt xidmeti sec */}
            <div className="flex flex-col gap-y-[5px] pt-[40px]">
              <div className="w-[50px] h-[7px] bg-gray-100"></div>
              <div className="flex flex-row gap-x-[20px] ">
                <div className="w-[100px] h-[30px] bg-gray-100 rounded-full"></div>
                <div className="w-[100px] h-[30px] bg-gray-100 rounded-full"></div>
                <div className="w-[100px] h-[30px] bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>
  
          <div className="hidden lg:block w-[300px] h-[85px] bg-gray-300 rounded-[20px]"></div>
        </div>
        <div className="flex flex-col gap-y-[20px] lg:hidden">
          <div className="flex flex-col gap-[5px]">
            <div className="w-[300px] screen360:w-[350px] screen375:w-[365px] screen390:w-[380px] screen412:w-[390px] sm:w-[620px] md:w-[745px] h-[35px] bg-gray-300 rounded-[10px]"></div>
            <div className="flex flex-row gap-x-[5px]">
              <div className="w-[20px] h-[20px] rounded-full bg-gray-300"></div>
              <div className="w-[250px] sm:w-[500px] h-[20px] rounded-full bg-gray-300"></div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="w-[300px] screen360:w-[350px] screen375:w-[365px] screen390:w-[380px] screen412:w-[390px] sm:w-[620px] md:w-[745px] h-[35px] bg-gray-300 rounded-[10px]"></div>
            <div className="flex flex-row gap-x-[5px]">
              <div className="w-[20px] h-[20px] rounded-full bg-gray-300"></div>
              <div className="w-[250px] sm:w-[500px] h-[20px] rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }