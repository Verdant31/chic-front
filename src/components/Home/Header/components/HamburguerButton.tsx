import React, { ButtonHTMLAttributes, FC } from "react";

interface HamburguerButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const HamburguerButton: FC<HamburguerButtonProps> = ({ ...props }) => {
  return (
    <div>
      <button
        {...props}
        className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
      >
        <svg className={`h-8 w-8 `} viewBox="0 0 24 24">
          <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
        </svg>
      </button>
    </div>
  );
};

export default HamburguerButton;
