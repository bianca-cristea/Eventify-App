import React, { useEffect } from "react";
import { Alert, AlertTitle, Skeleton } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useDispatch } from "react-redux";
import { createStripePaymentSecret } from "../../store/actions/actions";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = ({ paymentMethod, handleBack, handleNext }) => {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("totalPrice din state.carts:", totalPrice);
    if (!clientSecret) {
      const sendData = {
        amount: Number(totalPrice),
        currency: "usd",
        email: user.email,
        name: `${user.username}`,
        description: `Booking for ${user.email}`,
        metadata: { test: "1" },
      };
      dispatch(createStripePaymentSecret(sendData));
    }
  }, [clientSecret]);

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md">
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
