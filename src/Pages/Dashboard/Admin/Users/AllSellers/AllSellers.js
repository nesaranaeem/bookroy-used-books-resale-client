import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../../contexts/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";
const AllSellers = () => {
  const { logOut } = useContext(AuthContext);
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
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteSeller(seller._id)}
                    >
                      Delete Seller
                    </button>
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
    </div>
  );
};

export default AllSellers;
