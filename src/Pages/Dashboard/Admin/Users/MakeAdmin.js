import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
const Makeadmin = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make admin successful.");
          refetch();
        }
      });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Make Admin - BookRoy</title>
        <meta
          name="description"
          content="BookRoy is a platform for resale used books"
        />
      </Helmet>
      <h2 className="text-3xl my-4">Make Admin</h2>
      <div className="overflow-x-auto">
        {users?.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Current Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>
                  <td>{user.userName}</td>
                  <td>{user.userEmail}</td>
                  <td>
                    {user?.userRole !== "admin" ? (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-xs btn-primary"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <p>Already Admin</p>
                    )}
                  </td>
                  <td>{user?.userRole}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center font-bold">No User Yet</p>
        )}
      </div>
    </div>
  );
};

export default Makeadmin;
