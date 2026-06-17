import React from "react";
import { Alert, AlertTitle } from "@mui/material";

const PaypalPayment = ({ paymentMethod, handleBack, handleNext }) => {
  return (
    <div className="flex justify-center items-center">
      <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
        <AlertTitle>Paypal Mathod Unavailable</AlertTitle>
        Paypal payment is unavailable. Please use another payment method.
      </Alert>
    </div>
  );
};

export default PaypalPayment;
