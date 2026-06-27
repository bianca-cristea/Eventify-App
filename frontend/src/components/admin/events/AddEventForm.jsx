import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../shared/InputField";
import Spinners from "../../shared/Spinners";

const AddEventForm = ({ setOpen, event, update = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const [loader, setLoader] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col h-[80vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 flex-1 overflow-y-auto py-5 px-1"
      >
        <InputField
          className="w-full"
          label="Event name"
          required
          id="eventName"
          type="text"
          placeholder="Event name"
          register={register}
          errors={errors}
        />

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            className="w-full"
            label="Price"
            required
            id="price"
            type="number"
            placeholder="Event price"
            register={register}
            errors={errors}
          />

          <InputField
            className="w-full"
            label="Quantity"
            required
            id="quantity"
            type="number"
            placeholder="Event quantity"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            className="w-full"
            label="Discount"
            required
            id="discount"
            type="number"
            placeholder="Event discount"
            register={register}
            errors={errors}
          />

          <InputField
            className="w-full"
            label="Special price"
            required
            id="specialPrice"
            type="number"
            placeholder="Event special price"
            register={register}
            errors={errors}
          />
        </div>

        <textarea
          placeholder="Description"
          className={`w-full px-4 py-2 border rounded-md outline-none bg-transparent text-slate-50 ${
            errors["description"]
              ? "border-red-500 ring-2 ring-red-400"
              : "border-slate-500"
          }`}
          {...register("description", {
            required: "Description is required",
          })}
        />
      </form>

      <div className="flex justify-between items-center border-t px-4 py-3 shrink-0">
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={loader}
          className="px-4 py-2 text-sm font-medium border border-slate-500 text-blue-950 rounded-md hover:bg-slate-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loader}
          onClick={handleSubmit(onSubmit)}
          className="px-4 py-2 text-sm font-medium bg-blue-950 text-white rounded-md hover:bg-blue-900 flex items-center gap-2"
        >
          {loader ? <Spinners /> : update ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default AddEventForm;
