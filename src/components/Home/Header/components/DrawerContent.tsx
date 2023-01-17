import React, { FC } from "react";
import DrawerItem from "./DrawerItem";

interface DrawerContentProps {}

const DrawerContent: FC<DrawerContentProps> = () => {
  return (
    <div className="h-[100vh] w-[220px] bg-white p-6">
      <p className="text-center">Bem vindo!</p>
      <p className="text-center underline">Entre ou Cadastre-se</p>
      <div className="mt-4 flex flex-col gap-2">
        <DrawerItem
          title="Joias"
          items={["Anéis", "Colares", "Brincos", "Pulseiras"]}
        />
        <DrawerItem
          title="Semijoias"
          items={["Anéis", "Colares", "Brincos", "Pulseiras"]}
        />
        <DrawerItem
          title="Acessórios"
          items={["Anéis", "Colares", "Brincos", "Pulseiras"]}
        />
      </div>
    </div>
  );
};

export default DrawerContent;
