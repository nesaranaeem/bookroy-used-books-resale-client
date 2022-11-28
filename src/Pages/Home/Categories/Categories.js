import React, { useEffect, useState } from "react";
import Button from "../../../Components/Buttons/Button";
import Category from "./Category";
import axios from "axios";
import Loader from "../../Common/Loader/Loader";
const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const categoriesURL =
    "https://bookroy-book-resale-market-server.vercel.app/categories";
  useEffect(() => {
    axios.get(categoriesURL).then((response) => {
      setCategories(response.data);
      setLoading(false);
    });
  }, [categories]);
  if (!categories) return null;
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <section>
          <div className="my-8">
            <div className="text-center">
              <h3 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-2xl">
                Featured Categories
              </h3>
              <p className="mx-auto max-w-xl sm:text-lg sm:leading-relaxed">
                Browse Categories
              </p>
            </div>
            <div className="my-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {categories.map((category) => (
                <Category key={category._id} category={category}></Category>
              ))}
            </div>
            {categories.length > 2 && (
              <div className="grid grid-cols-1 justify-items-center"></div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Categories;
