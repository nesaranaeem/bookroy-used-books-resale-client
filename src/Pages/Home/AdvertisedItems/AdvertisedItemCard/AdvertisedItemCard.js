import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { format, parseISO } from "date-fns";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import useBuyer from "../../../../hooks/useBuyer";
import ConfirmationModal from "../../../Common/Modal/ConfirmationModal/ConfirmationModal";
import useVerify from "../../../../hooks/useVerify";
const CategoryCard = ({ product }) => {
  const {
    productName,
    productImage,
    _id,
    productDetails,
    productPrice,
    productPostedBy,
    productStatus,
    buyingPrice,
    yearOfPurchase,
    productLocation,
    productPostedOn,
    productCondition,
    sellerName,
  } = product;

  const { user, logOut } = useContext(AuthContext);
  const [isBuyer] = useBuyer(user?.email);
  const [isVerify] = useVerify(productPostedBy);
  const [currentDateMeta, setCurrentDateMeta] = useState(new Date());
  const productData = {
    reportBy: user?.displayName,
    reporterEmail: user?.email,
    reportedTime: currentDateMeta,
    productName: productName,
    productImage: productImage,
    productid: _id,
  };
  const [report, setReport] = useState(null);
  const [bookData, setBookData] = useState(null);
  const closeModal = () => {
    setReport(null);
    setBookData(null);
  };
  const handleReportProduct = async (productData) => {
    fetch("https://bookroy-book-resale-market-server.vercel.app/reports", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success(`Report Sent Successfully`);
        setReport(null);
      });
  };
  const [getBookData, setGetBookData] = useState("");
  const handleBookNow = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const name = form.name.value;
    const number = form.phoneNumber.value;
    const email = form.email.value;
    const price = form.price.value;
    const location = form.location.value;

    const submittedData = {
      name: name,
      number: number,
      price: price,
      email: email,
      location: location,
      productName: productName,
      productId: bookData._id,
      paid: false,
    };
    console.log(submittedData);
    fetch("https://bookroy-book-resale-market-server.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(submittedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          // setAppointmentModalData(null);
          setBookData(null);
          toast.success(
            "Booking confirmed. please make payment from dashboard"
          );
        } else {
          toast.error(data.message);
        }
      });
  };
  const [sellerInfo, setSellerInfo] = useState([]);
  useEffect(() => {
    fetch(
      `https://bookroy-book-resale-market-server.vercel.app/idDetails?email=${product.productPostedBy}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => setSellerInfo(data));
  }, [product]);
  console.log(sellerInfo);
  return (
    <>
      <div className="card w-9/12 lg:w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={productImage} alt={productName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {productName}
            <div className="tooltip" data-tip={`This is ads`}>
              <button className="btn btn-outline btn-xs">Ads</button>
            </div>
            {isBuyer ? (
              <label
                htmlFor="confirmation-modal"
                onClick={() => setReport(productData)}
                className="btn btn-xs"
              >
                Report
              </label>
            ) : (
              <button className="btn btn-xs" disabled>
                Report
              </button>
            )}

            {/* <div className="tooltip" data-tip={`Sponsored by ${listedBy}`}>
                <button className="badge badge-secondary">Ads</button>
              </div> */}
          </h2>
          <div className="badge badge-secondary badge-outline">
            {productCondition}
          </div>
          Posted on:{" "}
          {format(parseISO(product.productPostedOn), "yyyy-MM-dd' 'HH:mm")}
          <div className="card-actions justify-start">
            <div className="badge p-3 font-bold">
              {isVerify && (
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
              {sellerName}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 justify-items-center">
            <div className="badge badge-secondary badge-outline">
              Price:${productPrice}
            </div>

            <div className="badge badge-outline">{productStatus}</div>
            <div className="ml-3 badge w-24 badge-secondary badge-outline">
              {productLocation}
            </div>
          </div>
          {productDetails?.length > 90 ? (
            <p>
              Original Price is ${buyingPrice} Year of purchase:{" "}
              {yearOfPurchase} {productDetails.slice(0, 90)}
              ...
            </p>
          ) : (
            <p>
              Original Price is ${buyingPrice} Year of purchase:
              {yearOfPurchase}, {productDetails}
            </p>
          )}
          <div className="card-actions justify-start">
            <label
              htmlFor="book-modal"
              onClick={() => setBookData(product)}
              className="btn"
            >
              Book Now
            </label>
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
        {bookData && (
          <>
            <input type="checkbox" id="book-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  onClick={() => setBookData(null)}
                  htmlFor="book-modal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">
                  Book {bookData.productName}
                </h3>
                <form
                  onSubmit={handleBookNow}
                  className="grid grid-cols-1 gap-4 py-4"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      defaultValue={user?.displayName}
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      className="input input-bordered w-full"
                      disabled
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      defaultValue={user?.email}
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full"
                      disabled
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Product Name</span>
                    </label>
                    <input
                      defaultValue={bookData.productName}
                      name="productName"
                      type="text"
                      placeholder="Product Name"
                      className="input input-bordered w-full"
                      disabled
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Price</span>
                    </label>
                    <input
                      defaultValue={bookData.productPrice}
                      name="price"
                      type="number"
                      placeholder="Price"
                      className="input input-bordered w-full"
                      disabled
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      name="phoneNumber"
                      type="number"
                      placeholder="Phone Number"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <input
                      name="location"
                      type="text"
                      placeholder="Meeting Location"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <input className="btn" value="Book Now" type="submit" />
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoryCard;
