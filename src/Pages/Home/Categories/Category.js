import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../Components/Buttons/Button";

const Category = ({ category }) => {
  const { categoryName, categoryImage, CategoryDescription, _id } = category;
  return (
    <>
      <div className="card w-9/12 lg:w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={categoryImage} alt={categoryName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{categoryName}</h2>
          {CategoryDescription?.length > 90 ? (
            <p>{CategoryDescription.slice(0, 90)}...</p>
          ) : (
            <p>{CategoryDescription}</p>
          )}
          <div className="card-actions justify-end">
            <Link to={`category/${_id}`}>
              <Button>View Listing</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
