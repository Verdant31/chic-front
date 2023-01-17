import React, { FC } from "react";
import HamburguerButton from "./components/HamburguerButton";
import { Handbag } from "phosphor-react";
import { Drawer } from "@mui/material";
import useHeader from "./hook";
import DrawerContent from "./components/DrawerContent";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { isSidebarOpen, toggleDrawer } = useHeader();
  return (
    <header className="flex w-[100vw] items-center px-6">
      <Drawer open={isSidebarOpen} onClose={toggleDrawer(false)}>
        <DrawerContent />
      </Drawer>
      <HamburguerButton onClick={toggleDrawer(true)} />
      <h1 className="m-auto  text-[50px] font-medium">CHIC</h1>
      <div className="relative">
        <Handbag size={42} />
        <p className=" absolute top-6 left-[24px] h-[26px] w-[26px] rounded-[9999px] bg-black  text-center text-lg text-white">
          1
        </p>
      </div>
    </header>
  );
};

export default Header;
