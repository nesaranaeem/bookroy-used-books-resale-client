import DashboardLayout from "../../Layout/DashboardLayout";
import Login from "../../Pages/Common/Login/Login";
import SignUp from "../../Pages/Common/SignUp/SignUp";
import AllBuyers from "../../Pages/Dashboard/Admin/Users/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/Admin/Users/AllSellers/AllSellers";
import Makeadmin from "../../Pages/Dashboard/Admin/Users/MakeAdmin";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import AddProduct from "../../Pages/Dashboard/Seller/AddProduct/AddProduct";
import ManageProducts from "../../Pages/Dashboard/Seller/ManageProducts/ManageProduct";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

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
            element: <Dashboard></Dashboard>,
          },
          {
            path: "/dashboard/make-admin",
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
          {
            path: "/dashboard/add-product",
            element: (
              <SellerRoute>
                <AddProduct></AddProduct>
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/my-products",
            element: (
              <SellerRoute>
                <ManageProducts></ManageProducts>
              </SellerRoute>
            ),
          },
        ],
      },
    ],
  },
]);
export default router;
