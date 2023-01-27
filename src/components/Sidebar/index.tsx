import React, { FC } from "react";
import { Drawer } from "@mui/material";
import { useSession } from "next-auth/react";
import { User } from "phosphor-react";
import SidebarItem from "./components/SidebarItem";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Sidebar: FC<SidebarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { data: session } = useSession();

  return (
    <Drawer open={isSidebarOpen} onClose={toggleSidebar(false)}>
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
          <SidebarItem
            title="Joias"
            items={["Anéis", "Colares", "Brincos", "Pulseiras"]}
          />
          <SidebarItem
            title="Semijoias"
            items={["Anéis", "Colares", "Brincos", "Pulseiras"]}
          />
          <SidebarItem
            title="Acessórios"
            items={["Anéis", "Colares", "Brincos", "Pulseiras"]}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
