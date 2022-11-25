import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../../contexts/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";
const AllBuyers = () => {
  const { logOut } = useContext(AuthContext);
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch(
        "https://bookroy-book-resale-market-server.vercel.app/buyers"
      );
      const data = await res.json();
      if (data.status === 401 || data.status === 403) {
        return logOut();
      }
      return data;
    },
  });
  const handleDeleteBuyer = (id) => {
    const proceed = window.confirm(`are you sure you want to remove?`);
    if (proceed) {
      fetch(`https://bookroy-book-resale-market-server.vercel.app/user/${id}`, {
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
        {buyers?.length > 0 ? (
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
              {buyers.map((buyer, i) => (
                <tr key={buyer._id}>
                  <th>{i + 1}</th>
                  <td>{buyer.userName}</td>
                  <td>{buyer.userEmail}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteBuyer(buyer._id)}
                    >
                      Delete Buyer
                    </button>
                  </td>
                  <td>{buyer.userRole}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center font-bold">No Buyers Yet</p>
        )}
      </div>
    </div>
  );
};

export default AllBuyers;
