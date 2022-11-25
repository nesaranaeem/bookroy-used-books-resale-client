import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import ConfirmationModal from "../../../Common/Modal/ConfirmationModal/ConfirmationModal";
import { format, parseISO } from "date-fns";
const ManageProducts = () => {
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [promote, setPromote] = useState(null);
  const { user, logOut } = useContext(AuthContext);
  const closeModal = () => {
    setDeletingProduct(null);
    setPromote(null);
  };
  const handleDeleteProduct = (product) => {
    fetch(`http://localhost:5000/product/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Product ${product.productName} deleted successfully`);
        }
      });
  };
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products/?email=${user?.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
            },
          }
        );
        const data = await res.json();
        if (data.status === 401 || data.status === 403) {
          return logOut();
        }
        return data;
      } catch (error) {}
    },
  });
  const setPromoteProduct = (id) => {
    fetch(`http://localhost:5000/product/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Product Addded To Advertised List ");
          refetch();
        }
      });
  };
  return (
    <div>
      <h2 className="text-3xl my-4 text-center">
        Manage Products:{" "}
        {products?.length < 1 ? <>No product Yet</> : <>{products?.length}</>}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Status</th>
              <th>Posted On</th>
              <th>Action</th>
              <th>Promote</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={product.productImage} alt="" />
                    </div>
                  </div>
                </td>
                <td>{product.productName}</td>
                <td>{product?.productStatus}</td>
                <td>{format(parseISO(product.productPostedOn), "PP")}</td>
                <td>
                  <label
                    onClick={() => setDeletingProduct(product)}
                    htmlFor="confirmation-modal"
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </label>
                </td>
                <td>
                  {product?.isAdvertise === true ? (
                    <p>Promoted</p>
                  ) : (
                    <label
                      onClick={() => setPromote(product._id)}
                      htmlFor="confirmation-modal"
                      className="btn btn-sm btn-error"
                    >
                      Promote
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingProduct && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete? It cannot be undone.`}
          successAction={handleDeleteProduct}
          successButtonName="Delete"
          modalData={deletingProduct}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
      {promote && (
        <ConfirmationModal
          title={`Are you sure you want to Promote?`}
          message={`If you promote. It will add to advertise`}
          successAction={setPromoteProduct}
          successButtonName="Promote"
          modalData={promote}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ManageProducts;
