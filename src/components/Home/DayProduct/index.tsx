import React, { FC } from "react";

interface DayProductProps {}

const DayProduct: FC<DayProductProps> = () => {
  return (
    <div className="flex  flex-col items-center py-4">
      <div className="bg-[#ebebeb] sm:flex sm:w-[100vw] sm:items-center ">
        <img
          src={"women2.png"}
          className="h-[auto] max-h-[700px] w-[100vw] sm:w-[60vw]"
          alt="nextjs"
        />
        <div className="mt-8 flex flex-col items-center sm:mx-auto">
          <p className="font-cormorant text-xl font-bold uppercase italic sm:text-base lg:text-2xl">
            O nome da coleção aqui
          </p>
          <p className="mt-2 w-[250px] text-center font-cormorant text-sm font-bold uppercase italic sm:text-center sm:text-[12px] lg:text-sm">
            Uma descriçãozinha sobre a coleção
          </p>
          <p className="mt-4 pb-8 text-xl font-thin underline lg:mt-12 lg:text-2xl">
            Conheça agora
          </p>
        </div>
      </div>
    </div>
  );
};

export default DayProduct;
