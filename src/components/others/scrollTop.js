import { useEffect, useState } from "react";

export default function ScrollTop() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const totalDocScrollLength = docHeight - windowHeight;
    const scrollPosition = Math.floor((scrollTop / totalDocScrollLength) * 100);

    setScrollPercentage(scrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isVisible = scrollPercentage > 1;

  return (
    <div
      className="fixed bottom-[80px] lg:bottom-[180px] left-5 lg:left-auto
           lg:right-10 z-[50]"
    >
      <button aria-label="scroll to top" onClick={scrollToTop}>
        <div
          className={`${
            isVisible
              ? "radial-progress flex items-center justify-center bg-white text-cagiraz w-[50px] h-[50px] rounded-full border-transparent"
              : "hidden"
          }`}
          style={{
            "--value": `${scrollPercentage}`,
            "--size": "3rem",
            "--thickness": "3px",
            "--border": "black",
            "--color": "black",
          }}
          role="progressbar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="35"
            fill="currentColor"
            className="bi bi-arrow-up"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
