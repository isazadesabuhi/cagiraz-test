import jale from "@/src/public/jale.webp";
import Image from "next/image";
import { useEffect } from "react";

const LiveChat = () => {
  useEffect(() => {
    const connectLiveChat = () => {
      window.__lc = window.__lc || {};
      window.__lc.license = 14444979;

      (function (n, t, c) {
        function i(n) {
          return e._h ? e._h.apply(null, n) : e._q.push(n);
        }
        var e = {
          _q: [],
          _h: null,
          _v: "2.0",
          on: function () {
            i(["on", c.call(arguments)]);
          },
          once: function () {
            i(["once", c.call(arguments)]);
          },
          off: function () {
            i(["off", c.call(arguments)]);
          },
          get: function () {
            if (!e._h)
              throw new Error(
                "[LiveChatWidget] You can't use getters before load."
              );
            return i(["get", c.call(arguments)]);
          },
          call: function () {
            i(["call", c.call(arguments)]);
          },
          init: function () {
            var n = t.createElement("script");
            n.async = true;
            n.type = "text/javascript";
            n.src = "https://cdn.livechatinc.com/tracking.js";
            // console.log("Script element:", n);
            // t.head.appendChild(n);
            if (t.head) {
              try {
                // console.log("Appending script to head", n);
                t.head.appendChild(n);
              } catch (e) {
                // console.error("Error appending script", e);
              }
            } else {
              // console.warn("Document head not available");
            }
          },
        };

        if (!n.__lc.asyncInit) e.init();

        n.LiveChatWidget = n.LiveChatWidget || e;
      })(window, document, [].slice);
    };

    setTimeout(() => {
      connectLiveChat();
    }, 3000);
  }, []);

  const handleChatMaximize = () => {
    if (window.LiveChatWidget) {
      window.LiveChatWidget.call("maximize");
    }
  };

  return (
    <div className="">
      {/* <noscript>
        <Link
          href="https://www.livechat.com/chat-with/14444979/"
          rel="nofollow"
        >
          Chat with us
        </Link>
        , powered by{" "}
        <Link
          href="https://www.livechat.com/?welcome"
          rel="noopener nofollow"
          target="_blank"
        >
          LiveChat
        </Link>
      </noscript> */}
      <div className="inline-flex flex-col items-center justify-center">
        <Image
          alt="livechat image"
          width={65}
          height={65}
          className="bubble z-50 rounded-full w-[22px] h-[22px] object-cover object-center hidden"
          onClick={handleChatMaximize}
          src={jale}
          unoptimized
        />
        <span className="text-[12px] leading-[15px] text-black500 hidden">
          Çat
        </span>
      </div>
    </div>
  );
};

export default LiveChat;
