import React, { useEffect, useState } from "react";
import axios from "axios";
import AllProductCard from "./AllProductCard/AllProductCard";
const AllProduct = () => {
  const [products, setProducts] = useState(null);
  const ProductsURL = "http://localhost:5000/all-product";
  useEffect(() => {
    axios.get(ProductsURL).then((response) => {
      setProducts(response.data);
    });
  }, [products]);
  if (!products) return null;
  return (
    <section>
      <div className="text-center">
        <h3 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-2xl">
          Recent Listing
        </h3>
        <p className="mx-auto max-w-xl sm:text-lg sm:leading-relaxed">
          Browse Recent Listing
        </p>
      </div>
      <div className="my-8 grid gap-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
        {products.map((product) => (
          <AllProductCard key={product._id} product={product}></AllProductCard>
        ))}
      </div>
    </section>
  );
};

export default AllProduct;
