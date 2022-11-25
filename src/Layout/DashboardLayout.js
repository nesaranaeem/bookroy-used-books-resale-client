import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";

import useAdmin from "../hooks/useAdmin";
const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <div className="lg:hidden">
        <div>
          <label
            htmlFor="dashboard-drawer"
            tabIndex={2}
            className="btn btn-ghost lg:hidden"
          >
            <p className="btn">Menu</p>
          </label>
        </div>
      </div>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-gray-50 my-4">
            <li className="bg-accent-content rounded-lg mt-3">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {isAdmin && (
              <>
                <li className="bg-accent-content rounded-lg mt-3">
                  <Link to="/dashboard/makeadmin">Make Admin</Link>
                </li>
                <li className="bg-accent-content rounded-lg mt-3">
                  <Link to="/dashboard/all-buyers">All Buyers</Link>
                </li>
                <li className="bg-accent-content rounded-lg my-3">
                  <Link to="/dashboard/all-sellers">All Sellers</Link>
                </li>
                <li className="bg-accent-content rounded-lg">
                  <Link to="/dashboard/reported-items">Reported Items</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
