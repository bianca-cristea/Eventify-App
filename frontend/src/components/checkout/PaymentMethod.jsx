import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  handleNext,
  handleBack,
}) => {
  const paymentMethodHandler = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-slate-950 text-white shadow-black rounded-lg mt-16 border border-black">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Select Payment method
      </h1>
      <FormControl>
        <RadioGroup
          aria-label="payment method"
          value={paymentMethod}
          name="paymentMethod"
          onChange={(e) => paymentMethodHandler(e.target.value)}
        >
          <FormControlLabel
            value="Stripe"
            control={
              <Radio
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-checked": { color: "#22c55e" },
                }}
              />
            }
            label="Stripe"
            className="text-gray-50"
          />
          <FormControlLabel
            value="Paypal"
            control={
              <Radio
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-checked": { color: "#22c55e" },
                }}
              />
            }
            label="Paypal"
            className="text-gray-50"
          />
        </RadioGroup>
      </FormControl>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-6 py-2 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default PaymentMethod;
