import { CreditCard, Envelope, Truck } from "phosphor-react";
import React, { FC } from "react";

interface AdvertisingProps {}

const Advertising: FC<AdvertisingProps> = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-[100%] items-center justify-center gap-8   border-[#D2AC47] py-4 text-center">
        <Truck size={44} color="#D2AC47" />
        <p className="w-[50%]">Receba seu produto no conforto da sua casa.</p>
      </div>
      <div className="flex w-[100%] items-center justify-center gap-8   border-[#D2AC47] py-4 text-center">
        <CreditCard size={44} color="#D2AC47" />
        <p className="w-[50%]">Parcele suas compras em até 12x no cartão.</p>
      </div>
      <div className="flex w-[100%] items-center justify-center gap-8   border-[#D2AC47] py-4 text-center">
        <Envelope size={44} color="#D2AC47" />
        <p className="w-[50%]">Receba avisos de lançamentos no seu email.</p>
      </div>
    </div>
  );
};

export default Advertising;
