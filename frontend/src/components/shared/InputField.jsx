import React from "react";

const DEFAULT_MIN_LENGTHS = {
  username: 5,
  password: 6,
};

const InputField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  placeholder,
}) => {
  const effectiveMin = min ?? DEFAULT_MIN_LENGTHS[id];

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="font-semibold text-sm text-slate-700">
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md outline-none bg-white text-slate-900 ${
          errors[id]?.message
            ? "border-red-500 ring-2 ring-red-400"
            : "border-slate-300"
        } ${className || ""}`}
        {...register(id, {
          required: required ? message : false,
          minLength: effectiveMin
            ? {
                value: effectiveMin,
                message: `Minimum ${effectiveMin} characters is required.`,
              }
            : undefined,
          pattern:
            type === "email"
              ? {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                }
              : type === "url"
                ? {
                    value: /(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                    message: "Please enter valid url",
                  }
                : undefined,
        })}
      />

      {errors[id]?.message && (
        <p className="text-xs text-red-500">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default InputField;
