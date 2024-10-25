import React from "react";
import Link from "next/link";

function CategoriesBlog({ messages, chosenLang, categoriesBlog }) {
  const titleStyle =
    "font-semibold lg:font-bold text-[16px] lg:text-[20px] lg:leading-[30px] leading-[24px] pb-[15px] pt-[30px] lg:pt-0 text-center lg:text-start border-t border-[#EAEAEA] lg:border-none text-black";

  const nameStyle =
    "font-semibold text-[14px] lg:text-[18px] leading-[21px] lg:leading-[27px] text-cagiraz";

  return (
    <div>
      <h4 className={titleStyle}>{messages.categories}</h4>
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
                <p className={nameStyle}>{name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesBlog;
