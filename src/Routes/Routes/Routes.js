import DashboardLayout from "../../Layout/DashboardLayout";
import Blogs from "../../Pages/Blogs/Blogs";
import Category from "../../Pages/Category/Category";
import ErrorPage from "../../Pages/Common/ErrorPage/ErrorPage";
import Login from "../../Pages/Common/Login/Login";
import SignUp from "../../Pages/Common/SignUp/SignUp";
import ReportedItems from "../../Pages/Dashboard/Admin/ReportedItems/ReportedItems";
import AllBuyers from "../../Pages/Dashboard/Admin/Users/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/Admin/Users/AllSellers/AllSellers";
import Makeadmin from "../../Pages/Dashboard/Admin/Users/MakeAdmin";
import Orders from "../../Pages/Dashboard/Buyer/Orders/Orders";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import AddProduct from "../../Pages/Dashboard/Seller/AddProduct/AddProduct";
import ManageProducts from "../../Pages/Dashboard/Seller/ManageProducts/ManageProduct";
import AdminRoute from "../AdminRoute/AdminRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/blog",
        element: <Blogs></Blogs>,
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <Category></Category>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          return fetch(
            `https://bookroy-book-resale-market-server.vercel.app/category/${params.id}`
          );
        },
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            path: "/dashboard",
            element: (
              <PrivateRoute>
                <Dashboard></Dashboard>
              </PrivateRoute>
            ),
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
            path: "/dashboard/reported-items",
            element: (
              <AdminRoute>
                <ReportedItems></ReportedItems>
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
          {
            path: "/dashboard/my-orders",
            element: (
              <BuyerRoute>
                <Orders></Orders>
              </BuyerRoute>
            ),
          },
          {
            path: "/dashboard/payment/:id",
            element: <Payment></Payment>,
            loader: async ({ params }) => {
              return fetch(
                `https://bookroy-book-resale-market-server.vercel.app/booking/${params.id}`
              );
            },
          },
        ],
      },
    ],
  },
]);
export default router;
