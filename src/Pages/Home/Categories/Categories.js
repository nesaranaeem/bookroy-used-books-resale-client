import React from "react";
import Button from "../../../Components/Buttons/Button";
import Category from "./Category";

const Categories = () => {
  const featuredCategoriesData = [
    {
      id: 1,
      name: "Poems Book",
      description:
        "lorem lorem lorem lorem lorem lorem lorem Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      id: 2,
      name: "History Books",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: "https://images.unsplash.com/photo-1573848855919-9abecc93e456?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      id: 3,
      name: "CSE Books",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: "https://images.unsplash.com/photo-1520467795206-62e33627e6ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    },
  ];
  return (
    <>
      <section>
        <div className="my-8">
          <div className="text-center">
            <h3 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-2xl">
              Featured Categories
            </h3>
            <p className="mx-auto max-w-xl sm:text-lg sm:leading-relaxed">
              Browse Featured Categories
            </p>
          </div>
          <div className="my-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {featuredCategoriesData.map((category) => (
              <Category key={category.id} category={category}></Category>
            ))}
          </div>
          {featuredCategoriesData.length > 2 && (
            <div className="grid grid-cols-1 justify-items-center">
              <Button>View All Category</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Categories;
