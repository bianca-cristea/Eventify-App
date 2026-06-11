import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const LogIn = () => {
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

  const loginHandler = async (data) => {
    console.log("Login Click");
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="w-1/3 p-8 sm:px-8 px-4 rounded-4xl border border-b-blue-950"
      >
        <div className="flex flex-col items-center  justify-center space-y-4">
          <AiOutlineLogin className="text-slate-50 text-5xl" />
          <h1 className="text-slate-50 my-4 text-center font-montserrat lg:text-3xl text-2xl">
            Login Here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-white" />
        <div className="flex flex-col px-4 gap-4">
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />
        </div>

        <button
          disabled={loader}
          className="   w-1/3
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
            disabled:hover:scale-100"
          type="submit"
        >
          {loader ? (
            <>
              <Spinners /> Loading...
            </>
          ) : (
            <>Login</>
          )}
        </button>

        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?
          <Link
            className="font-semibold underline hover:text-gray-400"
            to="/register"
          >
            <span> SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
