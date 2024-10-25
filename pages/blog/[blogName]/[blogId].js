import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useIntl } from "react-intl";
import SocialNetworks from "@/src/components/others/SocialNetworks";
import ModalStandart from "@/src/components/modal/ModalStand";
import InputBtnNbTransition from "@/src/components/input/inputBtnNbTransition";
import TabBar from "@/src/components/mobile/TabBar";

async function blogDetail(blogId, chosenLang) {
  try {
    const response = await axios.get(
      `https://api.cagir.az/api/post/detail?id=${blogId}`,
      {
        headers: {
          "Accept-Language": chosenLang,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function categoriesBlogFetch(chosenLang) {
  try {
    const response = await axios.get(
      `https://api.cagir.az/api/category/getAll`,
      {
        headers: {
          "Accept-Language": chosenLang,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function relatedBlogsFetch(blogId, categoryId, chosenLang) {
  try {
    const response = await axios.get(
      `https://api.cagir.az/api/post/getRelativesByCategory?currentPostId=${blogId}&categoryId=${categoryId}`,
      {
        headers: {
          "Accept-Language": chosenLang,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getServerSideProps(context) {
  const chosenLang = context.locale || "az";
  const { blogId } = context.query;
  const responseData = await blogDetail(blogId, chosenLang);
  const categoryId = responseData?.categoryId;

  const categoriesBlog = await categoriesBlogFetch(chosenLang);

  const relatedBlogs = await relatedBlogsFetch(blogId, categoryId, chosenLang);

  if (!responseData) {
    return {
      redirect: {
        destination: "/", // Redirect to the 'page not found' route
        permanent: false, // This is a temporary redirect
      },
    };
  }

  return {
    props: { initialData: responseData, categoriesBlog, blogId, relatedBlogs },
  };
}

function BlogPost({ initialData, categoriesBlog, blogId, relatedBlogs }) {
  const intl = useIntl();
  const { locale: chosenLang, messages } = intl;
  const {
    id,
    imageUrl,
    adImageUrl,
    viewCount,
    insertDate,
    postNames,
    tags,
    categoryId,
    category,
  } = initialData;
  const { description, shortDescription, title } = postNames?.length
    ? postNames[0]
    : {};
  const subject = category?.categoryNames?.[0]?.name || "Default Value";

  return (
    <div>
      <Head>
        <title>{postNames[0].title}</title>
        <meta name="description" content={shortDescription} />
        <meta property="og:title" content={postNames[0].title} />
      </Head>
      <div className="sticky top-[35px] lg:hidden z-50 pb-[20px] pt-[10px]">
        <TabBar {...{ messages }} />
      </div>
      <div className="flex flex-col lg:flex-row gap-x-[40px] xl:gap-x-[50px] 2xl:gap-x-[60px] pt-[25px] pb-[60px] lg:pb-[90px]">
        {/* Main Content */}
        <div className="w-full lg:w-2/3 pb-[30px] lg:pb-0">
          <div className="hidden lg:flex flex-row gap-x-[10px]">
            <p className="font-semibold non-italic tracking-[0.02em] text-[14px] leading-[22px] text-black500">
              {messages.share}:
            </p>

            <SocialNetworks
              classNames="hidden lg:flex flex-row gap-x-[20px] pb-[30px]"
              isSharingEnabled={true}
            />
          </div>

          <Image
            // loading="lazy"
            priority={true}
            src={`https://api.cagir.az${imageUrl}`}
            alt={title}
            width={900}
            height={900}
            unoptimized
          />

          <div className="flex justify-between pt-5 lg:pt-30 pb-15 lg:pb-30">
            <p className="text-[#595959] font-medium lg:font-semibold text-14 leading-12 lg:leading-21">
              {insertDate?.slice(0, 10)}
            </p>
            <p className="text-cagiraz font-semibold text-12 lg:text-18 leading-15 lg:leading-27">
              Baxış: {viewCount}
            </p>
          </div>
          <h1 className="my-h2 pt-[5px] lg:pt-[10px] pb-[5px] lg:pb-[20px]">
            {postNames[0].title}
          </h1>

          <div
            className="text-black"
            dangerouslySetInnerHTML={{
              __html: (description || "")
                .replaceAll(
                  "<ul>",
                  '<ul className="list-disc list-inside pt-[3px] pb-[7px] text-black">'
                )
                .replaceAll("<span", '<span class="text-[#595959]"')
                .replaceAll("<a", '<a class="font-semibold text-cagiraz"')
                .replaceAll("<img", "<Image className='' unoptimized"),
            }}
          />
          <div className="flex flex-row items-center gap-x-[10px] pt-[10px] lg:pt-[30px]">
            <p className="font-semibold non-italic tracking-[0.02em] text-[14px] leading-[22px] text-black500">
              {messages.share}:
            </p>
            <SocialNetworks
              classNames="flex flex-row gap-x-[20px] "
              isSharingEnabled={true}
            />
          </div>
        </div>
        
        <div className="w-full lg:w-1/3 flex flex-col gap-y-[40px] lg:gap-y-[40px]">
          {/* Related Blogs */}
          <div>
            <h4
              className="font-semibold lg:font-bold text-[16px] lg:text-[20px] lg:leading-[30px] leading-[24px] pb-[15px] pt-[30px] lg:pt-0 text-center lg:text-start
        border-t border-[#EAEAEA] lg:border-none text-black"
            >
              {messages["related-posts"]}
            </h4>
            <div className="overflow-y-scroll h-[300px]">
              {Object.keys(relatedBlogs).map((childObjectName, index) => {
                const { shortDescription, postId, title } =
                  relatedBlogs[childObjectName].postNames[0];

                const {
                  id,
                  adImageUrl,
                  imageUrl,
                  nameUrl,
                  titleUrl,
                  viewCount,
                  insertDate,
                } = relatedBlogs[childObjectName];
                return (
                  <div
                    key={id}
                    className="flex flex-row gap-x-[10px] lg:gap-x-[20px] p-[10px] rounded-[10px]"
                  >
                    <Image
                      src={`https://api.cagir.az${imageUrl}`}
                      alt={title}
                      width={100}
                      height={100}
                      className="w-[54px] h-[54px] lg:w-[84px]
                   lg:h-[84px] rounded-[5px] object-cover object-center"
                      loading="lazy"
                      unoptimized
                    />

                    <div className="w-full flex flex-col justify-between lg:justify-normal">
                      <Link href={`/blog/${titleUrl}/${id}`}>
                        <h4 className="flex flex-wrap font-semibold lg:font-bold text-[12px] lg:text-[12px] leading-[18px] lg:leading-[21px] text-black">
                          {title}
                        </h4>
                      </Link>
                      <div className="flex flex-row justify-between">
                        <p
                          className="lg:order-2 font-medium lg:font-semibold text-[12px] lg:text-[12px] leading-[15px] lg:leading-[16px]
                  border border-cagiraz rounded-[5px] py-[2px] lg:py-[4px] px-[8px] lg:px-[10px] text-cagiraz"
                        >
                          {subject}
                        </p>

                        <p className="lg:order-1 font-medium lg:font-semibold text-[8px] lg:text-[12px] leading-[12px] lg:leading-[15px] text-[#595959]">
                          {insertDate.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center pt-[30px] lg:pt-[15px]">
              <Link
                href="/blog"
                className="lg:py-[10px] lg:px-[26px]
          font-medium lg:font-extrabold text-cagiraz text-[12px] lg:text-[14px] leading-[18px] lg:leading-[21px]"
              >
                {messages["see-more"]}
              </Link>
            </div>
          </div>
          {/* Categories Blog */}
          <div>
          <h4 className="font-semibold lg:font-bold text-[16px] lg:text-[20px] lg:leading-[30px] leading-[24px] pb-[15px] pt-[30px] lg:pt-0 text-center lg:text-start border-t border-[#EAEAEA] lg:border-none text-black">{messages.categories}</h4>
          <div className="grid grid-cols-2 gap-[10px] lg:gap-[15px]">
        {Object.values(categoriesBlog).map((category, index) => {
          const { name } = category.categoryNames[0];
          const { titleUrl } = category;

          return (
            <div key={index}>
              <Link
                href={{
                  pathname: `/blog/kateqoriya/${titleUrl}`,
                  query: { user: titleUrl },
                }}
                as={`/blog/kateqoriya/${titleUrl}`}
              >
                <p className="font-semibold text-[14px] lg:text-[18px] leading-[21px] lg:leading-[27px] text-cagiraz">{name}</p>
              </Link>
            </div>
          );
        })}
      </div>
          </div>
          {/*Tags Blog  */}
          <div>
            <h4 className="font-semibold lg:font-bold text-[16px] lg:text-[20px] lg:leading-[30px] leading-[24px] pb-[15px] pt-[30px] lg:pt-0 text-center lg:text-start border-t border-[#EAEAEA] lg:border-none text-black">
              {messages.tags}
            </h4>
            {tags && tags.length > 0 ? (
              <div className="flex flex-row flex-wrap gap-[10px] lg:gap-[15px]">
                {tags.map((tag, index) => (
                  <div key={index}>
                    <Link
                      href={{
                        pathname: `/blog/tag/${tag.name}`,
                        query: { user: tag.name },
                      }}
                      as={`/blog/tag/${tag.name}`}
                    >
                      <p className="font-medium lg:font-semibold text-[12px] leading-[15px] border border-cagiraz rounded-[5px] py-[2px] lg:py-[4px] px-[8px] lg:px-[10px] text-cagiraz">
                        {tag.name}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* Modal pop up for Call */}
          <Image
            onClick={() => window.my_modal_3.showModal()}
            src={`https://api.cagir.az${adImageUrl}`}
            alt="Cagir.az zəng et"
            width={424}
            height={512}
            loading="lazy"
            unoptimized
          />
          <ModalStandart
            dialogId="my_modal_3"
            content={
              <InputBtnNbTransition
                {...{ messages }}
                name={messages["fast-order"]}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
