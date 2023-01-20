import { useSession } from "next-auth/react";
import { User } from "phosphor-react";
import React, { FC } from "react";
import DrawerItem from "./DrawerItem";

interface DrawerContentProps {}

const DrawerContent: FC<DrawerContentProps> = () => {
  const { data: session } = useSession();
  return (
    <div className="h-[100vh] w-[240px] bg-white p-6">
      {session ? (
        <div className="flex items-center gap-4">
          <User size={32} />
          <div>
            <p className="text-sm font-medium">
              Bem vindo {session.user?.name?.split(" ")[0]}.
            </p>
            <p className="text-sm">{session.user?.email}</p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-center">Bem vindo!</p>
          <p className="text-center underline">Entre ou Cadastre-se</p>
        </>
      )}
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
