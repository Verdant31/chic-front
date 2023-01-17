import React, { FC } from "react";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => {
  return (
    <div className="mb-44 flex flex-col items-center">
      <p className="mt-8 font-ptserif text-2xl font-medium uppercase tracking-widest text-black">
        DESCUBRA-SE
      </p>
      <div className="mt-8 grid grid-cols-2 grid-rows-2 gap-12">
        <div className="flex flex-col items-center ">
          <img
            src="necklace.png"
            className="h-20 w-20 scale-75 object-cover"
            alt="rings"
          />
          <p className="mt-4 font-cormorant text-2xl text-black">Colares</p>
        </div>
        <div className="flex flex-col items-center ">
          <img
            src="earrings.png"
            className="scale-1.5 h-20 w-20 object-cover"
            alt="rings"
          />
          <p className="mt-4 font-cormorant text-2xl text-black">Brincos</p>
        </div>
        <div className="flex flex-col items-center ">
          <img
            src="bracelet.png"
            className="h-20 w-20 scale-[0.85] object-cover"
            alt="rings"
          />
          <p className="mt-4 font-cormorant text-2xl text-black">Pulseiras</p>
        </div>
        <div className="flex flex-col items-center ">
          <img
            src="ring.png"
            className="h-20 w-20 scale-[1.75] object-cover"
            alt="rings"
          />
          <p className="mt-4 font-cormorant text-2xl text-black">Anéis</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
