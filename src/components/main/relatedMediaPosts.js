import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useIntl } from "react-intl";

const fetchRelatedMediaPosts = async () => {
  const config = {
    headers: {
      "Accept-Language": "az",
    },
  };

  try {
    const response = await axios.get(
      "https://api.cagir.az/api/media/getRelatives",
      config
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
};

function RelatedMediaPostItem({ id, imageUrl, insertDate, mediaNames }) {
  return (
    <div className="flex flex-row gap-2 lg:gap-4 p-2 rounded-md">
      <Image
        src={`https://api.cagir.az${imageUrl}`}
        alt={mediaNames[0].title}
        width={400}
        height={400}
        className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-20 lg:h-20 rounded-[5px]"
        loading="lazy"
        unoptimized
      />
      <div className="flex flex-col justify-between lg:justify-normal w-full">
        <Link href={`/media/media-detail/${id}`}>
          <h4 className="font-semibold lg:font-bold text-sm lg:text-sm leading-5 lg:leading-6 text-black">
            {mediaNames[0].title}
          </h4>
        </Link>
        <div className="flex flex-row justify-between">
          {/* <p className="lg:order-2 font-medium lg:font-semibold text-xs lg:text-xs leading-4 lg:leading-5 border border-cagiraz rounded-sm py-0.5 lg:py-1 px-2 lg:px-2 text-cagiraz">
            subject
          </p> */}
          <p className="lg:order-1 font-medium lg:font-semibold text-xs lg:text-xs leading-4 lg:leading-5 text-[#595959]">
            {mediaNames[0].insertDate?.slice(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
}

function RelatedMediaPosts() {
  const intl = useIntl();
  const messages = intl.messages;

  const [relatedMediaPosts, setRelatedMediaPosts] = useState([]);

  useEffect(() => {
    fetchRelatedMediaPosts().then(setRelatedMediaPosts);
  }, []);

  return (
    <div>
      <h4 className="font-semibold lg:font-bold text-lg lg:text-xl leading-6 lg:leading-7 pb-4 pt-8 lg:pt-0 text-center lg:text-left border-t border-gray-300 lg:border-none text-black">
        {messages["related-posts"]}
      </h4>
      <div className="overflow-y-scroll h-72">
        {relatedMediaPosts.map((post, index) => (
          <RelatedMediaPostItem key={index} {...post} />
        ))}
      </div>
      <div className="flex justify-center pt-8 lg:pt-4">
        <Link
          href="/media"
          className="py-2 px-6 font-medium lg:font-extrabold text-cagiraz text-sm lg:text-base leading-4 lg:leading-5"
        >
          {messages["see-more"]}
        </Link>
      </div>
    </div>
  );
}

export default RelatedMediaPosts;
