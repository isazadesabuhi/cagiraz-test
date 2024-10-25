import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useIntl } from "react-intl";
import views from "@/src/icons/bloq/views.svg";
import PrimaryOutlineSmBtn from "@/src/components/buttons/primaryOutlineSmBtn";
import SearchInputMd from "@/src/components/input/inputSearchMd";

function BlogCategory({ blog_kateqoriya }) {
  const intl = useIntl();
  const chosenLang = intl.locale;
  const messages = intl.messages;

  const [size, setSize] = useState(0);
  const [responseData, setResponseData] = useState([]);
  const [seeMoreBtnIsVisible, setseeMoreBtnIsVisible] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.cagir.az/api/post/getAll?size=${size}&categoryName=${blog_kateqoriya}`,
        {
          headers: {
            "Accept-Language": "az",
          },
        }
      )
      .then((response) => {
        const newData = response.data.result;
        setResponseData((prevData) => [...prevData, ...newData]);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, [size, blog_kateqoriya]);

  const handleClick = () => {
    setSize((prevSize) => prevSize + 1);
  };

  const [deleteBtnIsClicked, setDeleteBtnIsClicked] = useState(false);
  // Callback function to receive data from the child component
  const receiveDataFromChild = (data) => {
    setDeleteBtnIsClicked(data);
  };

  // ekranda gorunen updatedBlogList.It updates in each search
  const [updatedBlogList, setUpdatedBlogList] = useState(responseData);
  // the value that will search elements
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    const filteredArray = responseData.filter((obj) => {
      const keys = Object.keys(obj);
      return (
        obj.titleUrl.toLowerCase().includes(searchVal.toLowerCase()) ||
        obj.postNames[0].title.toLowerCase().includes(searchVal.toLowerCase())
      );
    });

    if (searchVal.length > 0 && deleteBtnIsClicked === true) {
      setUpdatedBlogList(responseData);
    } else if (searchVal.length > 0 && deleteBtnIsClicked === false) {
      setUpdatedBlogList(filteredArray);
    } else {
      setUpdatedBlogList(responseData);
    }

    if (filteredArray.length < 6) {
      setseeMoreBtnIsVisible(false);
    } else {
      setseeMoreBtnIsVisible(true);
    }
  }, [setseeMoreBtnIsVisible, deleteBtnIsClicked, searchVal, responseData]); // Only run this effect when searchVal changes

  function handleInputChange(event) {
    const inputValue = event.target.value;
    setSearchVal(inputValue);
  }

  return (
    <div>
      <Head>
        <title>Cagir.az - Bloq {blog_kateqoriya}</title>
        <meta
          property="og:title"
          content={`Cagir.az - Bloq ${blog_kateqoriya}`}
        />
        <meta
          name="description"
          content={`Cagir.az - Bloq ${blog_kateqoriya} haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu yazıya baş çəkib faydalana bilərsiniz.`}
        />
      </Head>
      <div className="py-[15px] lg:py-[30px]">
        <h1 className="my-h2 mb-[15px] lg:mb-[30px] text-center">
          {responseData?.[0]?.categoryName}
        </h1>
        <div className="flex justify-center mb-[20px] lg:mb-[50px]">
          <SearchInputMd
            {...{ messages, chosenLang }}
            onChange={handleInputChange}
            value={searchVal}
            sendDataToParent={receiveDataFromChild}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px] lg:gap-[60px] px-[10px] justify-between">
          {Object.keys(updatedBlogList).map((childObjectName, index) => {
            const { shortDescription, postId, title } =
              updatedBlogList[childObjectName].postNames[0];
            const {
              id,
              adImageUrl,
              imageUrl,
              nameUrl,
              titleUrl,
              viewCount,
              insertDate,
              categoryName,
              category,
            } = updatedBlogList[childObjectName];
            return (
              <div key={index}>
                <div className="drop-shadow-card lg:drop-shadow-none hover:drop-shadow-card transition duration-300 bg-white p-[15px] sm:p-[18px] md:p-[21px] lg:p-[24px] lx:p-[27px] 2xl:p-[30px] rounded-[20px] 2xl:rounded-[25px]">
                  <Link href={`/blog/${titleUrl}/${id}`}>
                    <Image
                      priority={true}
                      width={360}
                      height={257}
                      src={`https://api.cagir.az${imageUrl}`}
                      alt={title}
                      className="rounded-[10px] lg:rounded-[20px] w-full aspect-[360/257]"
                      unoptimized
                    />
                  </Link>

                  <div className="flex justify-between mt-[10px] lg:mt-[15px] items-center">
                    <p
                      className="font-semibold text-[12px] lg:text-[14px] leading-[15px] 
              lg:leading-[21px] text-[#595959]"
                    >
                      {insertDate.slice(0, 10)}
                    </p>
                    <div className="ml-auto border border-cagiraz rounded-lg">
                      <p className="font-semibold	text-[12px] leading-[16px] text-cagiraz px-[10px] py-[4px] ">
                        {categoryName}
                      </p>
                    </div>
                  </div>
                  <Link href={`/blog/${titleUrl}/${id}`}>
                    <h2 className="my-h5 mt-[5px] lg:mt-[15px] text-black">
                      {title}
                    </h2>
                  </Link>

                  <p
                    className="font-semibold text-[12px] lg:text-[14px] leading-[15px] 
            lg:leading-[21px] text-[#595959] mt-[5px] "
                  >
                    {shortDescription}
                  </p>

                  <div className="flex justify-between mt-[5px] lg:mt-[15px] text-cagiraz">
                    <div className="flex flew-row justify-center items-center space-x-[5px]">
                      <Image
                        className="w-[22px] h-[15px]"
                        src={views}
                        alt="views logo"
                        loading="lazy"
                        unoptimized
                      />
                      <div>
                        <p className="font-semibold text-[16px]	lg:text-[18px] leading-[24px] lg:leading-[27px]">
                          {viewCount}
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Link
                        className="font-extrabold text-[14px] leading-[21px]"
                        href={`/blog/${titleUrl}/${id}`}
                      >
                        Ətrafli oxu
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          onClick={handleClick}
          className={`flex items-center justify-center max-w-[155px] mx-auto rounded-[25px] mt-[15px] lg:mt-[30px] ${
            seeMoreBtnIsVisible ? "" : "hidden"
          }`}
        >
          <PrimaryOutlineSmBtn btnName="Daha çox gör" />
        </div>
      </div>
    </div>
  );
}

export default BlogCategory;

export async function getServerSideProps(context) {
  const blog_kateqoriya = context.params["blog_kateqoriya"];
  return {
    props: { blog_kateqoriya },
  };
}
