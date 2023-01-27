import React, { FC } from "react";

interface DayProductProps {}

const DayProduct: FC<DayProductProps> = () => {
  return (
    <div className="flex flex-col items-center py-4">
      <p className="mb-4 font-cormorant text-2xl font-bold uppercase text-zinc-700">
        ACESSÓRIO EM ALTA
      </p>
      <img src="women.png" className="h-56 w-56" alt="nextjs" />
      <div className="mt-4 flex flex-col items-center">
        <p className="text-xl font-light">Colar Dourado X</p>
        <p className="text-xl font-medium">3x de R$49,00</p>
      </div>
    </div>
  );
};

export default DayProduct;
