import React from "react";
import AdvertisedItemCard from "./AdvertisedItemCard/AdvertisedItemCard";

const AdvertisedItems = () => {
  const advertisedItemsData = [
    {
      id: 1,
      name: "Robi Kakar Nana Bari",
      bookAuthor: "Dj Babul Mia",
      listedBy: "Mofiz Mia",
      isVerified: true,
      isSponsored: false,
      yearsOfUse: 1,
      sellingPrice: 5,
      originalPrice: 10,
      location: "",
      postedOn: "",
      description:
        "lorem lorem lorem lorem lorem lorem lorem Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      id: 2,
      name: "History Books Of Dj Bravo",
      bookAuthor: "Dj Jolil Mia",
      listedBy: "Rocky Mia",
      isVerified: false,
      isSponsored: true,
      yearsOfUse: 2,
      sellingPrice: 18,
      originalPrice: 28,
      location: "",
      postedOn: "",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: "https://images.unsplash.com/photo-1573848855919-9abecc93e456?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      id: 3,
      name: "Keka Apar Ranna",
      bookAuthor: "Mofiz Bepary",
      listedBy: "Kuddus Boyati",
      isVerified: true,
      isSponsored: false,
      yearsOfUse: 1,
      sellingPrice: 10,
      originalPrice: 20,
      location: "",
      postedOn: "",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: "https://images.unsplash.com/photo-1520467795206-62e33627e6ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    },
  ];
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
        {advertisedItemsData.map((advertisedItem) => (
          <AdvertisedItemCard
            key={advertisedItem.id}
            advertisedItem={advertisedItem}
          ></AdvertisedItemCard>
        ))}
      </div>
    </section>
  );
};

export default AdvertisedItems;
