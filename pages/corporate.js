import Head from "next/head";

const Page = (props) => {
    return (
        <div>
            <Head>
                <title>Corporate</title>
                <meta name="description" content="Corporate" />
                <meta property="og:title" content="You can visit this page to get more detailed information about the corporate" />
            </Head>
            <h1>Welcome</h1>
        </div>
    );
};

export default Page;