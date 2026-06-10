import React from "react";

const SetQuantity = ({
  quantity,
  cardCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cardCounter ? null : <div className="font-semibold">quantity</div>}
      <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22] text-sm"></div>
      <button
        disabled={quantity <= 1}
        onClick={() => handleQtyDecrease()}
        className=" cursor-pointer border border-slate-50 px-3 py-1 rounded"
      >
        -
      </button>
      <div className="text-slate-50">{quantity}</div>
      <button
        onClick={() => handleQtyIncrease()}
        className=" cursor-pointer border border-slate-50 px-2 py-1 rounded"
      >
        +
      </button>
    </div>
  );
};

export default SetQuantity;
