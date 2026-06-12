import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonCoponent from "../shared/SkeletonComponent";
import ErrorPage from "../shared/ErrorPage";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const dispatch = useDispatch();

  const steps = [
    "Order Summary",
    "Payment Method",
    "Confirm & Pay",
    "Confirmation",
  ];

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 1 && !paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="py-14 min-h-[calc(100vh-60px)] flex justify-center w-full">
      <div className=" w-3/4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-label": {
              color: "rgba(255,255,255,0.7)",
            },
            "& .MuiStepLabel-label.Mui-active": {
              color: "#fff",
              fontWeight: 700,
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: "#60a5fa",
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: "#4ade80",
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {isLoading ? (
          <div className="lg:w-[80%] mx-auto py-5">
            <SkeletonCoponent />
          </div>
        ) : (
          <div className="lg:w-[80%] mx-auto py-5">
            {activeStep === 0 && <OrderSummary handleNext={handleNext} />}
            {activeStep === 1 && <PaymentMethod />}
            {activeStep === 2 && <div>Confirm & Pay step</div>}
            {activeStep === 3 && <div>Confirmation step</div>}
          </div>
        )}

        {errorMessage && <ErrorPage message={errorMessage} />}
      </div>
    </div>
  );
};

export default Checkout;
