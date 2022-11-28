import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);
const Payment = () => {
  const booking = useLoaderData();
  const { productName, price, name, _id, productId } = booking;
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <h2>Loading</h2>;
  }
  return (
    <div>
      <h3 className="text-3xl my-5">Payment for {productName}</h3>
      <p className="text-xl">
        Hello, {name} Please pay <strong>${price}</strong>
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckOutForm booking={booking}></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
