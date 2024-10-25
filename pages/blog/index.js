import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useIntl } from "react-intl";
import views from "@/src/icons/bloq/views.svg";
import PrimaryOutlineSmBtn from "@/src/components/buttons/primaryOutlineSmBtn";
import SearchInputMd from "@/src/components/input/inputSearchMd";
import TabBar from "@/src/components/mobile/TabBar";
import BlogCard from "@/src/components/cards/blogCard"

function Blogs({ initialData }) {
  const [size, setSize] = useState(0);
  const [responseData, setResponseData] = useState(initialData || []);
  const [seeMoreBtnIsVisible, setseeMoreBtnIsVisible] = useState(true);

  useEffect(() => {
    if (!initialData || size > 0) {
      axios
        .get(`https://api.cagir.az/api/post/getAll?size=${size}`, {
          headers: {
            "Accept-Language": "az",
          },
        })
        .then((response) => {
          const newData = response.data.result;
          setResponseData((prevData) => [...prevData, ...newData]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [size, initialData]);

  const handleClick = () => {
    setSize((prevSize) => prevSize + 1);
  };
  //
  const [deleteBtnIsClicked, setDeleteBtnIsClicked] = useState(false);

  // Callback function to receive delete btn is cliked data from the child component
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
      return obj.postNames[0].title
        .toLowerCase()
        .includes(searchVal.toLowerCase());
    });

    if (searchVal.length > 0 && deleteBtnIsClicked === true) {
      setUpdatedBlogList(responseData);
    } else if (searchVal.length > 0 && deleteBtnIsClicked === false) {
      // setUpdatedBlogList(filteredArray);
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
    setSearchVal(event.target.value);
  }

  const intl = useIntl();
  const chosenLang = intl.locale;
  const messages = intl.messages;

  // search result
  const [blogResultSearch, setBlogResultSearch] = useState(null);
  useEffect(() => {
    if (searchVal) {
      axios
        .get(
          `https://api.cagir.az/api/post/searchByName?searchPost=${searchVal}`,
          {
            headers: {
              "Accept-Language": "az",
            },
          }
        )
        .then((response) => {
          const newData = response.data.result;
          setBlogResultSearch(newData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchVal]);
  console.log(responseData);
  return (
    <div>
      <Head>
        <title>Bloq</title>
        <meta property="og:title" content="Bloq" />
        <meta
          name="description"
          content="Cagir.az - Bloq haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu səhifəyə baş çəkib faydalana bilərsiniz."
        />
      </Head>
      <div className="py-[15px] lg:py-[30px]">
        <h1 className="my-h2 mb-[15px] lg:mb-[30px] text-center">
          {messages.blog}
        </h1>

        <div className="flex flex-col gap-y-[5px] items-center justify-center mt-[15px] mb-[15px]">
          <SearchInputMd
            {...{ messages, chosenLang }}
            onChange={handleInputChange}
            value={searchVal}
            sendDataToParent={receiveDataFromChild}
          />
        </div>
        <div className="sticky top-[45px] lg:hidden z-50 pb-[20px]">
          <TabBar {...{ messages }} />
        </div>
        {blogResultSearch && blogResultSearch?.length > 0 ? (
          <div
            className={`${
              blogResultSearch
                ? "flex flex-col justify-start border border-gray900 rounded-[20px] px-[10px] py-[5px]"
                : "hidden"
            }`}
          >
            {blogResultSearch?.map(({ postNames, titleUrl, id }, index) => {
              return (
                <div
                  className="w-full hover:bg-blue-500 hover:bg-opacity-[15%] rouned-[20px]"
                  key={index}
                >
                  <Link className="" href={`/blog/${titleUrl}/${id}`}>
                    {postNames[0].title}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {/* </div> */}

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
                <BlogCard {...{id,
              adImageUrl,
              imageUrl,
              nameUrl,
              titleUrl,
              viewCount,
              insertDate,
              categoryName,
              category,
              title}} />
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
          <PrimaryOutlineSmBtn btnName={messages["see-more"]} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let data = null;

  try {
    const res = await axios.get("https://api.cagir.az/api/post/getAll?size=0", {
      headers: {
        "Accept-Language": "az",
      },
    });
    data = res.data.result;
  } catch (error) {
    console.error("Error in getStaticProps:", error);
  }

  return {
    props: {
      initialData: data,
    },
  };
}

export default Blogs;
