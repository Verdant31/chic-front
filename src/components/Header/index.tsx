import React, { FC } from "react";
import HamburguerButton from "./components/HamburguerButton";
import { Handbag } from "phosphor-react";
import useHeader from "./hook";
import { useCart } from "../../context/CartContext";
import Cart from "../Cart";
import Sidebar from "../Sidebar";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { isSidebarOpen, toggleSidebar, isCartOpen, toggleCart } = useHeader();
  const { products } = useCart();

  return (
    <header className="flex w-[100vw] items-center px-6">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />
      <HamburguerButton onClick={toggleSidebar(true)} />
      <h1 className="m-auto  font-cormorant text-[50px] font-semibold">CHIC</h1>
      <div className="relative">
        <Handbag onClick={toggleCart(true)} size={32} />
        {products.length > 0 && (
          <p className="absolute top-4 left-[20px] flex h-[20px] w-[20px] items-center justify-center rounded-[9999px] bg-black text-[12px] text-white">
            {products.length}
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
