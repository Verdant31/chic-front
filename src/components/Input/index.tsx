import React, { FC, InputHTMLAttributes } from "react";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { normalizeValue } from "../../utils/masks";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<any>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  register,
  required = true,
  errors,
  label,
  ...props
}) => {
  const registerProps = { ...register(props.name as string) };
  return (
    <div>
      <label className="mt-4 flex items-center gap-2" htmlFor={props.name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {props.name === "cellphone" || props.name === "cpf" ? (
        <input
          name={registerProps.name}
          ref={registerProps.ref}
          maxLength={registerProps.maxLength}
          onChange={(e) => {
            const { value } = e.target;
            if (props.name === "cellphone" || props.name === "cpf") {
              e.target.value = normalizeValue(value, props.name);
              registerProps.onChange(e);
              return;
            }
            registerProps.onChange({ target: { value } });
            return value;
          }}
          className="mt-2 h-10 w-full rounded-none border-[1px] border-gray-500 pl-4"
          {...props}
        />
      ) : (
        <input
          {...registerProps}
          {...props}
          className="mt-2 h-10 w-full rounded-none border-[1px] border-gray-500 pl-4"
        />
      )}

      {errors[props.name as string] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[props.name as string]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default Input;
