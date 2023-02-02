import React, { FC, useState } from "react";
import { motion } from "framer-motion";
interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: string[];
  label: string;
  required?: boolean;
  onValueChange: (value: string) => void;
}

const Select: FC<SelectProps> = ({
  options,
  label,
  required = true,
  onValueChange,
  ...props
}) => {
  const [optionsContainerIsOpen, setOptionsContainerIsOpen] = useState(false);
  const handleChooseValue = (value: string) => {
    onValueChange(value);
    setOptionsContainerIsOpen(false);
  };
  return (
    <div
      className="w-[50%]"
      onBlur={() => setOptionsContainerIsOpen(false)}
      tabIndex={0}
    >
      <label className="mt-4 flex items-center gap-2" htmlFor={props.name}>
        {label}
        <span className="text-red-500">{required ? "*" : "‎"}</span>
      </label>
      <div
        defaultValue={options[0]}
        onClick={() => setOptionsContainerIsOpen(true)}
        className="r mt-2 flex h-10 w-full items-center rounded-none border-[1px] border-gray-500 bg-white pl-4  text-center outline-none"
      >
        {props.value}
      </div>
      {optionsContainerIsOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="absolute mt-1 flex max-h-[200px] w-[100px] flex-col gap-2 overflow-y-scroll rounded-sm bg-white pt-2"
        >
          {options.map((option) => (
            <p
              onClick={() => handleChooseValue(option)}
              className="w-full pl-4 hover:bg-zinc-300"
              key={option}
            >
              {option}
            </p>
          ))}
        </motion.div>
      )}
      {/* {errors[props.name as string] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[props.name as string]?.message?.toString()}
        </p>
      )} */}
    </div>
  );
};

export default Select;
