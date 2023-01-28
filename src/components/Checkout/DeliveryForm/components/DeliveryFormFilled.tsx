import React, { FC } from "react";
import { motion } from "framer-motion";
import { DeliveryFormDataProps } from "../form";
interface DeliveryFormFilledProps {
  fields: DeliveryFormDataProps;
}

const DeliveryFormFilled: FC<DeliveryFormFilledProps> = ({ fields }) => {
  return (
    <>
      <h1 className="mb-1 font-cormorant text-2xl font-bold text-black">
        Entrega
      </h1>
      <motion.div
        className="border-[1px] border-t-[0px] border-r-[0px] border-l-[0px] border-b-[2px] border-gray-300 pb-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <p className="mt-4 text-[15px] font-thin text-gray-800">
          {fields.street}, {fields.number}
        </p>
        <p className="text-[15px] font-thin text-gray-800">{fields.district}</p>
        <p className="text-[15px] font-thin text-gray-800">
          {fields.city} - {fields.uf}
        </p>
        <p className="text-[15px] font-thin text-gray-800">{fields.cep}</p>
      </motion.div>
    </>
  );
};

export default DeliveryFormFilled;
