import React from "react";

const SellerInfo = ({ seller }) => {
  const { isSellerVerified } = seller;

  return <div>{seller.isSellerVerified && <p>Yes</p>}</div>;
};

export default SellerInfo;
