import React, { FC } from "react";
import { useCategories } from "./hook";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => {
  const { handleRedirect } = useCategories();
  return (
    <div className="mb-12 flex flex-col items-center">
      <p className="mt-8 font-ptserif text-2xl font-medium uppercase tracking-widest text-black">
        DESCUBRA-SE
      </p>
      <div className="mt-12 grid grid-cols-2 grid-rows-2 gap-12">
        <div
          onClick={() => handleRedirect("Colar")}
          className="flex cursor-pointer flex-col items-center"
        >
          <img
            src="necklace.png"
            className="h-20 w-20 scale-75 object-cover"
            alt="rings"
          />
          <p className="mt-6 border-b-[2px] border-[#dfbd69] pb-[5px] font-cormorant text-2xl text-black">
            Colares
          </p>
        </div>
        <div
          onClick={() => handleRedirect("Brinco")}
          className="flex cursor-pointer flex-col items-center"
        >
          <img
            src="earrings.png"
            className="scale-1.5 h-20 w-20 object-cover"
            alt="rings"
          />
          <p className="mt-6 border-b-[2px] border-[#dfbd69] pb-[5px] font-cormorant text-2xl text-black">
            Brincos
          </p>
        </div>
        <div
          onClick={() => handleRedirect("Bracelete")}
          className="flex cursor-pointer flex-col items-center"
        >
          <img
            src="bracelet.png"
            className="h-20 w-20 scale-[0.85] object-cover"
            alt="rings"
          />
          <p className="mt-6 border-b-[2px] border-[#dfbd69] pb-[5px] font-cormorant text-2xl text-black">
            Pulseiras
          </p>
        </div>
        <div
          onClick={() => handleRedirect("Anel")}
          className="flex cursor-pointer flex-col items-center"
        >
          <img
            src="ring.png"
            className="h-20 w-20 scale-[1.75] object-cover"
            alt="rings"
          />
          <p className="mt-6 border-b-[2px] border-[#dfbd69] pb-[5px] font-cormorant text-2xl text-black">
            Anéis
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
