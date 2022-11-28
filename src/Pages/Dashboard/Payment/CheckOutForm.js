import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const CheckOutForm = ({ booking }) => {
  const { price, name, email, _id, productName, productId } = booking;
  const { user, logOut } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [cardSuccess, setCardSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      "https://bookroy-book-resale-market-server.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
        },

        body: JSON.stringify({ price }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price, productName]);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    setCardSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmEror } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });
    if (confirmEror) {
      setCardError(confirmEror.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id,
      };
      fetch("https://bookroy-book-resale-market-server.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("bookroy-token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            setCardSuccess("Payment Completed");
            setTransactionId(paymentIntent.id);
            toast.success("Payment Completed");
            fetch(
              `https://bookroy-book-resale-market-server.vercel.app/updateProduct/${productId}`,
              {
                method: "PUT",
                headers: {
                  authorization: `bearer ${localStorage.getItem(
                    "bookroy-token"
                  )}`,
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.modifiedCount > 0) {
                  toast.success("Product booked");
                }
                if (data.status === 401 || data.status === 403) {
                  return logOut();
                }
              });
          }
        });
    }

    setProcessing(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="btn btn-sm mt-5"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay ${booking.price}
        </button>
      </form>

      <p className="text-red-500">{cardError}</p>
      {cardSuccess && (
        <p className="text-green-500">
          {cardSuccess} <p className="pl-1"> Payment Id: {transactionId}</p>
        </p>
      )}
    </>
  );
};

export default CheckOutForm;
