import React, { FC, InputHTMLAttributes } from "react";
import { useFormContext, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<any>;
}

const Input: FC<InputProps> = ({ register, label, ...props }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="mt-4 flex items-center gap-2" htmlFor={props.name}>
        {label}
        <p className="text-[#b99d58]">*</p>
      </label>
      <input
        {...register(props.name as string)}
        className="mt-2 h-10 w-full rounded-none border-[1px] border-gray-500 pl-4"
        {...props}
      />
      {errors[props.name as string] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[props.name as string]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default Input;
