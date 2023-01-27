import React, { FC } from "react";
import {
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";

interface SelectProps extends MuiSelectProps {
  options: string[];
  label: string;
  register: UseFormRegister<any>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  required?: boolean;
}

const Select: FC<SelectProps> = ({
  options,
  label,
  required = true,
  register,
  errors,
  ...props
}) => {
  return (
    <div className="w-[50%]">
      <label className="mt-4 flex items-center gap-2" htmlFor={props.name}>
        {label}
        <span className="text-red-500">{required ? "*" : "‎"}</span>
      </label>
      <MuiSelect
        {...register(props.name as string)}
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          ".MuiSelect-select": {
            ":focus": { background: "white" },
          },
        }}
        defaultValue={options[0]}
        disableUnderline={true}
        variant="standard"
        label="Age"
        MenuProps={MenuProps}
        className="mt-2 h-10 w-full rounded-none border-[1px] border-gray-500 bg-white pl-4 outline-none"
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
      {errors[props.name as string] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[props.name as string]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default Select;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 120,
    },
  },
};
