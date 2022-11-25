import DashboardLayout from "../../Layout/DashboardLayout";
import Login from "../../Pages/Common/Login/Login";
import SignUp from "../../Pages/Common/SignUp/SignUp";
import AllBuyers from "../../Pages/Dashboard/Admin/Users/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/Admin/Users/AllSellers/AllSellers";
import Makeadmin from "../../Pages/Dashboard/Admin/Users/MakeAdmin";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <h2>Dashboard</h2>,
          },
          {
            path: "/dashboard/makeadmin",
            element: (
              <AdminRoute>
                <Makeadmin></Makeadmin>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/all-buyers",
            element: (
              <AdminRoute>
                <AllBuyers></AllBuyers>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/all-sellers",
            element: (
              <AdminRoute>
                <AllSellers></AllSellers>
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);
export default router;
