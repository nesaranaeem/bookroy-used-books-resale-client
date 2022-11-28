import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { format, parseISO } from "date-fns";
import ConfirmationModal from "../../../Common/Modal/ConfirmationModal/ConfirmationModal";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
const Orders = () => {
  const { logOut, user } = useContext(AuthContext);
  const [deletingReport, setDeletingReport] = useState(null);
  const closeModal = () => {
    setDeletingReport(null);
  };

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `https://bookroy-book-resale-market-server.vercel.app/bookedItem?email=${user.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  const handleDeleteReport = (id) => {
    fetch(
      `https://bookroy-book-resale-market-server.vercel.app/bookedItem?email=${user.email}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted successful.");
          fetch(
            `https://bookroy-book-resale-market-server.vercel.app/deleteReport/${id}`,
            {
              method: "DELETE",
              headers: {
                authorization: `bearer ${localStorage.getItem(
                  "bookroy-token"
                )}`,
              },
            }
          );
          refetch();
        }
        refetch();
      });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Orders - BookRoy</title>
        <meta
          name="description"
          content="BookRoy is a platform for resale used books"
        />
      </Helmet>
      <h2 className="text-3xl my-4">My Booked</h2>
      <div className="overflow-x-auto">
        {bookings?.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((book, i) => (
                <tr key={book._id}>
                  <th>{i + 1}</th>
                  <td>{book.productName}</td>
                  <td>{book.price}</td>
                  <td>
                    {book?.paid ? (
                      <p>Paid</p>
                    ) : (
                      <Link
                        className="btn btn-xs"
                        to={`/dashboard/payment/${book._id}`}
                      >
                        Pay {book.price}$
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center font-bold">No Reports Yet</p>
        )}
      </div>
      {deletingReport && (
        <ConfirmationModal
          title={`Are you sure you want to delete this product?`}
          message={`If you delete? It cannot be undone.`}
          successAction={handleDeleteReport}
          successButtonName="Delete"
          modalData={deletingReport}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default Orders;
