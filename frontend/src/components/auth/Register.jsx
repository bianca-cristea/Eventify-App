import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import InputField from "../shared/InputField";
import Spinners from "../shared/Spinners";
import { registerNewUser } from "../../store/actions/actions";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    data.role = [data.role];

    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="w-full max-w-md rounded-3xl border border-blue-950 p-6 sm:p-8"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaUserPlus className="text-slate-300 text-5xl" />

          <h1 className="text-slate-300 text-center font-montserrat text-2xl sm:text-3xl">
            Register Here
          </h1>
        </div>

        <hr className="my-6 text-white" />

        <div className="flex flex-col gap-4">
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            message="*Username is required"
            min={5}
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />

          <div className="flex flex-col gap-2">
            <label className="text-slate-300 font-medium">Account Type</label>

            <select
              {...register("role")}
              defaultValue="participant"
              className="
                w-full
                rounded-xl
                border
                border-slate-600
                bg-slate-900
                text-slate-200
                px-4
                py-3
                outline-none
                transition
                focus:border-amber-400
                focus:ring-2
                focus:ring-amber-400/20
              "
            >
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          <InputField
            label="Password"
            required
            id="password"
            min={6}
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />
        </div>

        <button
          disabled={loader}
          type="submit"
          className="
            mt-8
            w-full
            h-12
            rounded-xl
            bg-amber-400
            text-slate-950
            font-bold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-amber-300
            hover:scale-[1.02]
            transition-all
            duration-300
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:scale-100
          "
        >
          {loader ? (
            <>
              <Spinners />
              Loading...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?
          <Link
            className="font-semibold underline hover:text-white ml-1"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
