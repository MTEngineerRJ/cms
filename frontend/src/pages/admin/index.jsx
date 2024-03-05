import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Admin from "../../components/admin";

const index = () => {
  return (
    <>
      <Seo pageTitle="Admin Dashboard" />
      <Admin />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
