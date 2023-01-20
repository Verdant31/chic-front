import { Checkbox, FormControlLabel } from "@mui/material";
import React, { FC } from "react";

interface DrawerContentProps {}

const DrawerContent: FC<DrawerContentProps> = () => {
  return (
    <div className="h-[100vh] w-[240px] bg-white p-6">
      <p className="text-xl  tracking-wider">Aplicar filtros</p>
      <div className="mt-4 border-b-[1px] border-gray-400 pb-4">
        <p className=" text-lg font-medium tracking-wider">Ordenar</p>
        <div className="ml-2">
          <FormControlLabel label="Maior preço" control={<Checkbox />} />
          <FormControlLabel label="Menor preço" control={<Checkbox />} />
          <FormControlLabel label="Maior desconto" control={<Checkbox />} />
          <FormControlLabel label="Lançamentos" control={<Checkbox />} />
          <FormControlLabel label="Relevancia" control={<Checkbox />} />
        </div>
      </div>
      <div className="mt-4 border-b-[1px] border-gray-400 pb-4">
        <p className=" text-lg font-medium tracking-wider">Preço</p>
        <div className="ml-2">
          <FormControlLabel label="Até R$100" control={<Checkbox />} />
          <FormControlLabel label="R$100 - R$200" control={<Checkbox />} />
          <FormControlLabel label="R$200 - R$300" control={<Checkbox />} />
          <FormControlLabel label="R$300 - R$400" control={<Checkbox />} />
          <FormControlLabel label="R$400 - R$500" control={<Checkbox />} />
        </div>
      </div>
    </div>
  );
};

export default DrawerContent;
