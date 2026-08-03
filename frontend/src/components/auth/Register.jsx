import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../store/actions/actions";

import Spinners from "../shared/Spinners";
import toast from "react-hot-toast";

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

    console.log(data);

    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="w-1/3 p-8 sm:px-8 px-4 rounded-4xl border border-b-blue-950"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaUserPlus className="text-slate-500 text-5xl" />
          <h1 className="text-slate-300 text-center font-montserrat lg:text-3xl text-2xl ">
            Register Here
          </h1>
        </div>
        <hr className="my-5 text-white" />
        <div className="flex flex-col gap-3">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            message="*UserName is required"
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
              <option value="participant"> Participant</option>
              <option value="organizer"> Organizer</option>
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
            w-1/3
            mt-10
            m-auto
            h-12
            rounded-xl
            bg-amber-400
            text-slate-950
            font-bold
            cursor-pointer
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

        <p className="text-center text-sm text-slate-700 mt-6">
          Already have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/login"
          >
            <span> Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
