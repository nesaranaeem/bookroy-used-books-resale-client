import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useBuyer from "../../hooks/useBuyer";

import Loader from "../../Pages/Common/Loader/Loader";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useBuyer(user?.email);
  const location = useLocation();

  if (loading || isSellerLoading) {
    return <Loader></Loader>;
  }

  if (user && isSeller) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;
