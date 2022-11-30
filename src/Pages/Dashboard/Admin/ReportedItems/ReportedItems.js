import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { format, parseISO } from "date-fns";
import ConfirmationModal from "../../../Common/Modal/ConfirmationModal/ConfirmationModal";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
const ReportedItems = () => {
  const { logOut } = useContext(AuthContext);
  const [deletingReport, setDeletingReport] = useState(null);
  const closeModal = () => {
    setDeletingReport(null);
  };

  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await fetch(
        "https://bookroy-book-resale-market-server.vercel.app/reports"
      );
      const data = await res.json();
      return data;
    },
  });
  const handleDeleteReport = (id) => {
    fetch(
      `https://bookroy-book-resale-market-server.vercel.app/reportedProduct/${id}`,
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
        <title>Reported Items - BookRoy</title>
        <meta
          name="description"
          content="BookRoy is a platform for resale used books"
        />
      </Helmet>
      <h2 className="text-3xl my-4">Reported Items</h2>
      <div className="overflow-x-auto">
        {reports?.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Reported By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, i) => (
                <tr key={report._id}>
                  <th>{i + 1}</th>
                  <td>{report.productName}</td>
                  <td>{report.reportBy}</td>
                  <td>
                    <label
                      className="btn btn-xs btn-error"
                      onClick={() => setDeletingReport(report.productid)}
                      htmlFor="confirmation-modal"
                    >
                      Delete Product
                    </label>
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

export default ReportedItems;
