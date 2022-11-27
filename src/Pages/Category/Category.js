import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CategoryCard from "./CategoryCard/CategoryCard";

const Category = ({ productPostedBy }) => {
  const products = useLoaderData();

  return (
    <div>
      <section>
        <div className="text-center">
          <h3 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-2xl">
            Recent From This Category
          </h3>
          <p className="mx-auto max-w-xl sm:text-lg sm:leading-relaxed">
            Browse Recent From This Category
          </p>
        </div>
        <div className="my-8 grid gap-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
          {products.map((product) => (
            <CategoryCard key={product._id} product={product}></CategoryCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Category;
