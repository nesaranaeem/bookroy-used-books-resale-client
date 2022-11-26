import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../../contexts/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";
import ConfirmationModal from "../../../../Common/Modal/ConfirmationModal/ConfirmationModal";
const AllSellers = () => {
  const { logOut } = useContext(AuthContext);
  const [deletingSeller, setDeletingSeller] = useState(null);
  const [verifiedSeller, setVerifiedSeller] = useState(null);
  const closeModal = () => {
    setDeletingSeller(null);
    setVerifiedSeller(null);
  };
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/sellers");
      const data = await res.json();
      if (data.status === 401 || data.status === 403) {
        return logOut();
      }
      return data;
    },
  });
  const handleVerify = (id) => {
    fetch(`http://localhost:5000/user/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Seller is verified now");
          refetch();
        }
      });
  };
  const handleDeleteSeller = (id) => {
    fetch(`http://localhost:5000/user/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted successful.");
          refetch();
        }
      });
  };
  console.log(sellers);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Buyers - BookRoy</title>
        <meta
          name="description"
          content="BookRoy is a platform for resale used books"
        />
      </Helmet>
      <h2 className="text-3xl my-4">All Sellers</h2>
      <div className="overflow-x-auto">
        {sellers?.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
                <th>Verification</th>
              </tr>
            </thead>

            <tbody>
              {sellers.map((seller, i) => (
                <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td className="flex">
                    {seller.userName}

                    {seller?.isSellerVerified && (
                      <div className="badge ml-2 p-3 font-bold">
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
                      </div>
                    )}
                  </td>
                  <td>{seller.userEmail}</td>
                  <td>
                    <label
                      className="btn btn-xs btn-error"
                      onClick={() => setDeletingSeller(seller._id)}
                      htmlFor="confirmation-modal"
                    >
                      Delete Seller
                    </label>
                  </td>
                  <td>
                    <>
                      {seller?.isSellerVerified ? (
                        <p>Already Verified</p>
                      ) : (
                        <label
                          className="btn btn-xs btn-error"
                          onClick={() => setVerifiedSeller(seller._id)}
                          htmlFor="confirmation-modal"
                        >
                          Verify
                        </label>
                      )}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center font-bold">No Seller Yet</p>
        )}
      </div>

      {deletingSeller && (
        <ConfirmationModal
          title={`Are you sure you want to delete this seller?`}
          message={`If you delete? It cannot be undone.`}
          successAction={handleDeleteSeller}
          successButtonName="Delete"
          modalData={deletingSeller}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}

      {verifiedSeller && (
        <ConfirmationModal
          title={`Are you sure you want to Verified this selle?`}
          message={`If you verified this seller. a verified badge will appear with this seller `}
          successAction={handleVerify}
          successButtonName="Yes"
          modalData={verifiedSeller}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllSellers;
