import axios from "axios";
import ServicePage from "@/src/components/componentPageSubServices";

const Page = ({ mainServiceData, chosenLang }) => {
  return (
    <ServicePage
      parentId={mainServiceData.id}
      mainServiceUrl={mainServiceData.nameUrl}
      {...{ chosenLang }}
      isReklam={false}
    />
  );
};
export default Page;

async function fetchMainAllService(chosenLang) {
  try {
    const response = await axios.get(
      "https://api.cagir.az/api/service/getAllForFront",
      {
        headers: {
          "Accept-Language": chosenLang,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    return {};
  }
}

// Fetching dynamic paths for static generation
export async function getStaticPaths() {
  const chosenLang = "az"; // You can adjust this or make it dynamic based on your locale
  const allServiceData = await fetchMainAllService(chosenLang);

  const paths = allServiceData.map((service) => ({
    params: { mainService: service.serviceNames[0].titleUrl },
  }));

  return {
    paths,
    fallback: "blocking", // Block the request until the static page is generated
  };
}

export async function getStaticProps({ params, locale }) {
  const chosenLang = locale || "az";

  const allServiceData = await fetchMainAllService(chosenLang);
  const findMainByTitleUrl = (url) =>
    allServiceData.find((obj) => obj.serviceNames[0].titleUrl === url);

  const mainServiceData = findMainByTitleUrl(params.mainService);

  if (!mainServiceData || !mainServiceData.id) {
    return {
      redirect: {
        destination: `/`, // Redirect to home if not found
        permanent: false,
      },
    };
  }

  return {
    props: {
      mainServiceData,
      chosenLang,
    },
    revalidate: 10, // Revalidate every 10 seconds
  };
}