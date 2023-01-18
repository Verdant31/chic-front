import { Check } from "phosphor-react";
import React, { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div>
      <div className="mb-2 mt-4 flex flex-col gap-4 bg-[#ebebeb] p-8">
        <a className="tracking-wide underline">Sobre nós</a>
        <a className="tracking-wide underline">Contato</a>
        <a className="tracking-wide underline">Duvidas frequentes</a>
        <div className="mt-4 flex flex-col items-center">
          <p className="text-xl uppercase tracking-widest">
            Acompanhe as ofertas
          </p>
          <p className="text-sm uppercase tracking-widest">
            Insira seu e-mail abaixo
          </p>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Email"
              className="mt-4 h-10 w-64 rounded-none border-[1px] border-black pl-4"
            />
            <Check
              size={32}
              className="mt-[15.5px] h-10 w-16 bg-black"
              color="#fff"
            />
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-col p-8">
        <p className="text-zinc-600">2022 © Todos os direitos reservados</p>
        <p className="text-zinc-600">49329-111 CNPJ: 49.032.489/0011-84</p>
      </div>
    </div>
  );
};

export default Footer;
