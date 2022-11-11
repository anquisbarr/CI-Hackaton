import type { NextPage } from "next";
import Head from "next/head";
import HomeProducts from "../components/HomeProducts";

const Home: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>Ecommerce</title>
        <meta name="description" content="Ecommerce for ''" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeProducts />
    </>
    
  );
};

export default Home;
