import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
const AddProduct = () => {
  const [currentDateMeta, setCurrentDateMeta] = useState(new Date());
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const imgbbApi = process.env.REACT_APP_imgbbApi;
  const handleAddProduct = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgbbApi}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        console.log(imageData);
        if (imageData.success) {
          const productData = {
            productName: data.name,
            productDetails: data.details,
            productPrice: data.productPrice,
            buyingPrice: data.buyingPrice,
            yearOfPurchase: data.yearOfPurchase,
            productSubmitterPhone: data.number,
            productPostedOn: currentDateMeta,
            productCategory: data.category,
            productImage: imageData.data.url,
            productLocation: data.location,
            productCondition: data.condition,
            productStatus: "available",
            isAdvertise: false,
            productPostedBy: user?.email,
          };
          fetch("http://localhost:5000/products", {
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
              toast.success(`${data.name} is added successfully`);
              navigate("/dashboard/my-products");
            });
        }
      });
  };
  // here data:specialities = data er new name speciality
  const { data: categories, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <div className="hero-content flex-col">
        <form
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          onSubmit={handleSubmit(handleAddProduct)}
        >
          <div className="card-body">
            <h3 className="text-center text-2xl">Add Product</h3>
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                type="text"
                placeholder="name"
                className="input input-bordered"
              />
              {errors.name && (
                <p className="label-text-alt mt-1 text-red-700">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Selling Price ($)</span>
              </label>
              <input
                {...register("productPrice", {
                  required: "selling price is required",
                })}
                type="number"
                placeholder="eg, 20"
                className="input input-bordered"
              />
              {errors.name && (
                <p className="label-text-alt mt-1 text-red-700">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Buying Price ($)</span>
              </label>
              <input
                {...register("buyingPrice", {
                  required: "buying price is required",
                })}
                type="number"
                placeholder="eg, 30"
                className="input input-bordered"
              />
              {errors.name && (
                <p className="label-text-alt mt-1 text-red-700">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Year Of Purchase</span>
              </label>
              <input
                {...register("yearOfPurchase", {
                  required: "year of purchase is required",
                })}
                type="number"
                placeholder="eg, 2021"
                className="input input-bordered"
              />
              {errors.name && (
                <p className="label-text-alt mt-1 text-red-700">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                {...register("number", {
                  required: "Number is required",
                })}
                type="number"
                placeholder="eg, 01700000000"
                className="input input-bordered"
              />
              {errors.name && (
                <p className="label-text-alt mt-1 text-red-700">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text">Details</span>
              </label>
              <textarea
                {...register("details", {
                  required: "Details Address is required",
                })}
                placeholder="details"
                className="textarea textarea-bordered"
              />
              {errors.details && (
                <p className="label-text-alt mt-1 text-red-700">
                  {errors.details?.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                {...register("location", {
                  required: "Location is required",
                })}
                type="text"
                placeholder="location"
                className="input input-bordered"
              />
              {errors.location && (
                <p className="label-text-alt mt-1 text-red-700">
                  {errors.location?.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Condition</span>
              </label>
              <select
                {...register("condition", {
                  required: "Condition is required",
                })}
                className="select select-bordered w-full max-w-xs"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                {...register("category", {
                  required: "category is required",
                })}
                className="select select-bordered w-full max-w-xs"
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text">Product Image</span>
              </label>

              <input
                {...register("image", {
                  required: "image is required",
                })}
                type="file"
                className="file-input w-full max-w-xs"
              />
              {errors.image && (
                <p className="label-text-alt mt-1 text-red-700">
                  {errors.image?.message}
                </p>
              )}
            </div>
            <div className="form-control mt-2">
              <input className="btn" value="Add Product" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
