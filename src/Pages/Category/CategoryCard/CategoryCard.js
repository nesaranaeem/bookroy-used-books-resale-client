import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Button from "../../../Components/Buttons/Button";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import ConfirmationModal from "../../Common/Modal/ConfirmationModal/ConfirmationModal";

const CategoryCard = ({ product }) => {
  const { productName, productImage, _id, productDetails, productPrice } =
    product;
  const { user } = useContext(AuthContext);
  const [report, setReport] = useState(null);
  const closeModal = () => {
    setReport(null);
  };
  const data = {
    product,
  };
  const handleReportProduct = (id) => {
    fetch("http://localhost:5000/reports", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success(`Report Sent Successfully`);
      });
  };
  return (
    <>
      <div className="card w-9/12 lg:w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={productImage} alt={productName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {productName}
            <label
              htmlFor="confirmation-modal"
              onClick={() => setReport(productName)}
              className="btn btn-xs"
            >
              Report
            </label>
            {/* <div className="tooltip" data-tip={`Sponsored by ${listedBy}`}>
                <button className="badge badge-secondary">Ads</button>
              </div> */}
          </h2>

          {/* <p>Book Author: {bookAuthor}</p> */}
          <div className="card-actions justify-start">
            Seller:
            {/* <div className="badge p-3 font-bold">
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
              </div> */}
          </div>
          <div className="badge badge-outline">Price: ${productPrice}</div>
          {productDetails?.length > 90 ? (
            <p>{productDetails.slice(0, 90)}...</p>
          ) : (
            <p>{productDetails}</p>
          )}

          <div className="card-actions justify-start">
            <Link to={`/advertisement/${_id}`}>
              <Button>Book Now</Button>
            </Link>
          </div>
        </div>
        {report && (
          <ConfirmationModal
            title={`Report this product`}
            message={`do you beleive that this product is not following TOS`}
            successAction={handleReportProduct}
            successButtonName="Yes"
            modalData={report}
            closeModal={closeModal}
          ></ConfirmationModal>
        )}
      </div>
    </>
  );
};

export default CategoryCard;
