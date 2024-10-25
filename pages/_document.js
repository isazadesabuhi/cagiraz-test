import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://api.cagir.az" />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T5QK2Z74EX"
          strategy="afterInteractive"
        />
        <Script id="gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T5QK2Z74EX');
          `}
        </Script>
        
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "irz9dd42b9");
          `}
        </Script>

        <Script id="tawk" strategy="afterInteractive" type="text/javascript">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/66584131981b6c56477663bf/1hv4btbcs';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>

        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K9TLBWQ');
          `}
        </Script>

        <Script
          async
          data-id="101435170"
          src="//static.getclicky.com/js"
          strategy="afterInteractive"
        />

        <meta name="author" content="cagir.az" />
        <meta
          name="keywords"
          content="temizlik, kondisioner, masaj, usta, temir"
        />
        <meta
          name="google-site-verification"
          content="hO1qFYFX_8NQseaYKP2ismDoxmfl9l7IQLkMQ0ZaFdg"
        />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CagirAz" />
        <meta name="twitter:title" content="Cagir.az" />
        <meta
          name="twitter:image"
          content="https://api.cagir.az/Uploads/Logo/logo-cagir.png"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://api.cagir.az/Uploads/Logo/logo-cagir.png"
        />
        <link
          rel="icon"
          href="https://api.cagir.az/Uploads/Logo/logo-cagir.png"
          sizes="any"
        />
      </Head>
      <body className="screen1700:flex screen1700:justify-center bg-white">
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9TLBWQ" 
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
