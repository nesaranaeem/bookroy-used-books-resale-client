import React, { useEffect, useState } from "react";
import AdvertisedItemCard from "./AdvertisedItemCard/AdvertisedItemCard";
//axios
import axios from "axios";
const AdvertisedItems = () => {
  const [promotedProducts, setPromotedProducts] = useState(null);
  const promotedProductsURL = "http://localhost:5000/promoted-products";
  useEffect(() => {
    axios.get(promotedProductsURL).then((response) => {
      setPromotedProducts(response.data);
    });
  }, [promotedProducts]);
  if (!promotedProducts) return null;
  if (promotedProducts.length > 0) {
    return (
      <section>
        <div className="text-center">
          <h3 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-2xl">
            Advertised Listing
          </h3>
          <p className="mx-auto max-w-xl sm:text-lg sm:leading-relaxed">
            Browse Advertised Listing
          </p>
        </div>
        <div className="my-8 grid gap-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
          {promotedProducts.map((advertisedItem) => (
            <AdvertisedItemCard
              key={advertisedItem._id}
              advertisedItem={advertisedItem}
            ></AdvertisedItemCard>
          ))}
        </div>
      </section>
    );
  }
};

export default AdvertisedItems;
