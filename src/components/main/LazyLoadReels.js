import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Reels = dynamic(() => import("@/src/components/main/YoutubeVideos"), {
  ssr: false,
});

const LazyLoadReels = () => {
  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.disconnect();
        }
      },
      { threshold: 0.2, passive: true } // Adjust the threshold as needed
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div id="target-element-2-lazy" style={{ minHeight: "500px" }}>
      <div ref={ref}>{isVisible && <Reels />}</div>
    </div>
  );
};

export default LazyLoadReels;
