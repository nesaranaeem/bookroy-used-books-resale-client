import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";

import useAdmin from "../hooks/useAdmin";
import { Helmet } from "react-helmet";
import useBuyer from "../hooks/useBuyer";
const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard - BookRoy</title>
        <meta
          name="description"
          content="BookRoy is a platform for resale used books"
        />
      </Helmet>
      <div className="grid gap-3 justify-items-center grid-cols-1 lg:grid-cols-5">
        {isAdmin && (
          <>
            <div className="w-44">
              <div class="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                <Link
                  to="/dashboard/make-admin"
                  className="block rounded-xl bg-white p-4"
                >
                  <h3 class="text-xl font-bold text-gray-900">Make Admin</h3>
                </Link>
              </div>
            </div>
            <div className="w-44">
              <div class="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                <Link
                  to="/dashboard/all-buyers"
                  className="block rounded-xl bg-white p-4"
                >
                  <h3 class="text-xl font-bold text-gray-900">All Buyers</h3>
                </Link>
              </div>
            </div>
            <div className="w-44">
              <div class="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                <Link
                  to="/dashboard/all-sellers"
                  className="block rounded-xl bg-white p-4"
                >
                  <h3 class="text-xl font-bold text-gray-900">All Sellers</h3>
                </Link>
              </div>
            </div>
          </>
        )}
        {isBuyer && (
          <>
            <div className="w-44">
              <div class="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                <Link
                  to="/dashboard/my-orders"
                  className="block rounded-xl bg-white p-4"
                >
                  <h3 class="text-xl font-bold text-gray-900">My Orders</h3>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <Outlet></Outlet>
    </>
  );
};

export default DashboardLayout;
