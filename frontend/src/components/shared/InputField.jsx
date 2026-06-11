import React from "react";

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
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1 w-3/4 m-auto">
      <label
        htmlFor="id"
        className={`${className ? className : ""} font-semibold text-sm text-slate-500`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${className ? className : ""} px-2 py-2 border outline-none bg-transparent text-slate-50 rounded-md ${
          errors[id]?.message
            ? "border-2 ring-2 ring-red-400"
            : "border-slate-500"
        }`}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: `Minimum ${min} characters is required.` }
            : null,
          pattern:
            type === "email"
              ? {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                }
              : type === "url"
                ? {
                    value:
                      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/,
                    message: "Please enter valid url",
                  }
                : null,
        })}
      />
      {errors[id]?.message && (
        <p className="text-xs text-gray-400 m-0">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default InputField;
