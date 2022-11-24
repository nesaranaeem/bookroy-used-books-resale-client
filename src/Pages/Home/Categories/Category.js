import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../Components/Buttons/Button";

const Category = ({ category }) => {
  const { name, img, description, id } = category;
  return (
    <>
      <div className="card w-full lg:w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={img} alt={name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          {description?.length > 90 ? (
            <p>{description.slice(0, 90)}...</p>
          ) : (
            <p>{description}</p>
          )}
          <div className="card-actions justify-end">
            <Link to={`category/${id}`}>
              <Button>View Listing</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
