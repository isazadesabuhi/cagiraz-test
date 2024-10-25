import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import fb from "@/src/icons/social_ntwrk/fb.svg";
import fb1 from "@/src/icons/social_ntwrk/fb1.svg";
import insta from "@/src/icons/social_ntwrk/insta.svg";
import insta1 from "@/src/icons/social_ntwrk/insta1.svg";
import linkedin from "@/src/icons/social_ntwrk/linkedin.svg";
import linkedin1 from "@/src/icons/social_ntwrk/linkedin1.svg";

export default function SocialNetworks({ classNames, isSharingEnabled }) {
  const currentURL = "https://cagir.az" + useRouter().asPath;

  const getLink = (baseLink, shareLink) => {
    return isSharingEnabled ? shareLink : baseLink;
  };

  const socialElements = [
    {
      id: 1,
      imageUnhovered: insta,
      imageHovered: insta1,
      baseLink: "https://www.instagram.com/cagir.az",
      shareLink: "", // Instagram doesn't support direct web sharing
      alt: "insta_icon",
    },
    {
      id: 2,
      imageUnhovered: fb,
      imageHovered: fb1,
      baseLink: "https://www.facebook.com/cagir.az",
      shareLink: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentURL
      )}`,
      alt: "fb_icon",
    },
    {
      id: 3,
      imageUnhovered: linkedin,
      imageHovered: linkedin1,
      baseLink: "https://www.linkedin.com/company/cagir-az/",
      shareLink: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentURL
      )}`,
      alt: "linkedin_icon",
    },
  ];

  const [hoveredElements, setHoveredElements] = useState({});

  const handleMouseEnter = (id) => {
    setHoveredElements({ ...hoveredElements, [id]: true });
  };

  const handleMouseLeave = (id) => {
    setHoveredElements({ ...hoveredElements, [id]: false });
  };

  const imageDimension = { width: 22, height: 22 };
  const transitionClass = "transition-opacity duration-300";

  return (
    <div className={classNames}>
      {socialElements
        .filter((element, index) => {
          // If sharing is enabled, exclude the first element
          if (isSharingEnabled && index === 0) {
            return false;
          }
          return true;
        })
        .map((element) => (
          <a
            key={element.id}
            href={getLink(element.baseLink, element.shareLink)}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleMouseEnter(element.id)}
            onMouseLeave={() => handleMouseLeave(element.id)}
            className={transitionClass}
          >
            <Image
              {...imageDimension}
              src={
                hoveredElements[element.id]
                  ? element.imageHovered
                  : element.imageUnhovered
              }
              alt={element.alt}
              loading="lazy"
              unoptimized
            />
          </a>
        ))}
    </div>
  );
}
