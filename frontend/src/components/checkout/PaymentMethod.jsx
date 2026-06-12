import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "../../store/actions/actions";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const paymentMethodHandler = (method) => {
    dispatch(addPaymentMethod(method));
  };

  const { paymentMethod } = useSelector((state) => state.payment);

  return (
    <div className="max-w-md mx-auto p-5 bg-slate-950 text-white shadow-black rounded-lg mt-16 border border-black">
      <h1 className="text-2xl  font-semibold text-center mb-4">
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
                  "&.Mui-checked": {
                    color: "#22c55e",
                  },
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
                  "&.Mui-checked": {
                    color: "#22c55e",
                  },
                }}
              />
            }
            label="Paypal"
            className="text-gray-50"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PaymentMethod;
