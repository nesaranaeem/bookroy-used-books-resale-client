import React from "react";
import About from "./About";
import AdvertisedItems from "./AdvertisedItems/AdvertisedItems";
import AllProduct from "./AllProduct/AllProduct";
import Categories from "./Categories/Categories";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <Categories></Categories>
      <AdvertisedItems></AdvertisedItems>
      <AllProduct></AllProduct>
      <About></About>
    </>
  );
};

export default Home;
