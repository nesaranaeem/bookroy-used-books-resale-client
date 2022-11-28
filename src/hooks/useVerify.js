import { useEffect, useState } from "react";

const useVerify = (email) => {
  console.log(email);
  const [isSeller, setisSeller] = useState(false);
  const [isSellerLoading, setisSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(
        `https://bookroy-book-resale-market-server.vercel.app/verify/${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setisSeller(data.isVerify);
          setisSellerLoading(false);
        });
    }
  }, [email]);
  return [isSeller, isSellerLoading];
};

export default useVerify;
