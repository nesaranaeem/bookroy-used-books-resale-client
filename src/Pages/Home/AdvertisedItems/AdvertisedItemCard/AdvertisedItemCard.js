import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../../Components/Buttons/Button";

const AdvertisedItemCard = ({ advertisedItem }) => {
  const {
    name,
    listedBy,
    isVerified,
    img,
    description,
    bookAuthor,
    id,
    isSponsored,
    sellingPrice,
  } = advertisedItem;
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl">
        <figure>
          <img src={img} alt={name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            {isSponsored && (
              <div className="tooltip" data-tip={`Sponsored by ${listedBy}`}>
                <button className="badge badge-secondary">Ads</button>
              </div>
            )}
          </h2>
          <p>Book Author: {bookAuthor}</p>
          <div className="badge badge-outline">Price: ${sellingPrice}</div>
          {description?.length > 90 ? (
            <p>{description.slice(0, 90)}...</p>
          ) : (
            <p>{description}</p>
          )}
          <div className="card-actions justify-start">
            <Link to={`/listing/${id}`}>
              <Button>Details</Button>
            </Link>
          </div>
          <div className="card-actions justify-end">
            Seller:
            <div className="badge p-3 font-bold">
              {isVerified && (
                <div
                  className="tooltip text-white"
                  data-tip="This seller is verified"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </div>
              )}
              {listedBy}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertisedItemCard;
