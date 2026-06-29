import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../shared/InputField";
import Spinners from "../../shared/Spinners";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewEventFromDashboard,
  fetchCategories,
  updateEventsFromDashboard,
} from "../../../store/actions/actions";
import SelectTextField from "../../shared/SelectTextField";

const AddEventForm = ({ setOpen, event, update = false }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { categories } = useSelector((state) => state.events);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const formatDateTimeLocal = (value) => {
    if (!value) return "";
    if (Array.isArray(value)) {
      const [year, month, day, hour = 0, minute = 0] = value;
      const pad = (n) => String(n).padStart(2, "0");
      return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`;
    }
    if (typeof value === "string") return value.slice(0, 16);
    if (value instanceof Date) {
      const pad = (n) => String(n).padStart(2, "0");
      return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}T${pad(value.getHours())}:${pad(value.getMinutes())}`;
    }
    return "";
  };

  const saveEventHandler = (data) => {
    const { date, ...rest } = data;

    const sendData = {
      ...rest,
      eventDate: date,
      ...(update
        ? { id: event?.id }
        : { categoryId: selectedCategory?.categoryId }),
    };

    const action = update
      ? updateEventsFromDashboard
      : addNewEventFromDashboard;
    dispatch(action(sendData, toast, reset, setLoader, setOpen));
  };

  useEffect(() => {
    if (!update) {
      dispatch(fetchCategories());
    }
  }, [dispatch, update]);

  useEffect(() => {
    if (categories?.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (!update || !event) return;
    setValue("title", event.title || "");
    setValue("price", event.price || "");
    setValue("status", event.status || "");
    setValue("date", formatDateTimeLocal(event.date));
  }, [update, event, setValue]);

  return (
    <div className="flex flex-col h-[80vh]">
      <form
        onSubmit={handleSubmit(saveEventHandler)}
        className="flex flex-col gap-4 flex-1 overflow-y-auto py-5 px-1"
      >
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Event Name"
            id="title"
            type="text"
            placeholder="Event name"
            register={register}
            errors={errors}
            required={true}
            message="Event name is required"
          />
          {!update && (
            <SelectTextField
              label="Select categories"
              select={selectedCategory}
              setSelect={setSelectedCategory}
              lists={categories}
            />
          )}
        </div>

        <InputField
          label="Price"
          id="price"
          type="number"
          placeholder="Event price"
          register={register}
          errors={errors}
          required={true}
          message="Price is required"
        />

        <InputField
          label="Date"
          id="date"
          type="datetime-local"
          register={register}
          errors={errors}
          required={true}
          message="Date is required"
        />

        <InputField
          label="Status"
          id="status"
          type="text"
          placeholder="Event status"
          register={register}
          errors={errors}
        />

        <div className="h-20" />
      </form>

      <div className="flex justify-between items-center border-t border-slate-700 px-4 py-3 bg-white">
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={loader}
          className="px-4 py-2 text-sm font-medium border border-slate-400 text-slate-700 rounded-md hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          form="event-form"
          onClick={handleSubmit(saveEventHandler)}
          disabled={loader}
          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-blue-900 hover:bg-blue-700 flex items-center gap-2"
        >
          {loader ? (
            <>
              <Spinners /> Loading
            </>
          ) : update ? (
            "Update"
          ) : (
            "Create"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddEventForm;
