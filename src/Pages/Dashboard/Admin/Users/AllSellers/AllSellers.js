import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../../contexts/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";
import ConfirmationModal from "../../../../Common/Modal/ConfirmationModal/ConfirmationModal";
const AllSellers = () => {
  const { logOut } = useContext(AuthContext);
  const [deletingSeller, setDeletingSeller] = useState(null);
  const closeModal = () => {
    setDeletingSeller(null);
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
  const handleDeleteSeller = (id) => {
    const proceed = window.confirm(`are you sure you want to remove?`);
    if (proceed) {
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
    }
  };

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
      <h2 className="text-3xl my-4">All Buyers</h2>
      <div className="overflow-x-auto">
        {sellers?.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, i) => (
                <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>{seller.userName}</td>
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
                  <td>{seller.userRole}</td>
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
    </div>
  );
};

export default AllSellers;
