import React, { FC } from "react";
import { Step } from "../../pages/checkout";
import Input from "../Input";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

export interface DeliveryFormDataProps {
  cep: string;
}

interface DeliveryFormProps {
  onSubmit: (e: DeliveryFormDataProps) => void;
  status: Step;
}
const deliveryFormValidationSchema = zod.object({
  cep: zod.string().min(1, "O campo Telefone é obrigatório").max(100),
});

const DeliveryForm: FC<DeliveryFormProps> = ({ status, onSubmit }) => {
  const methods = useForm<DeliveryFormDataProps>({
    resolver: zodResolver(deliveryFormValidationSchema),
  });

  if (status === "pending") return null;
  return (
    <FormProvider {...methods}>
      <motion.form
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        onSubmit={methods.handleSubmit(onSubmit)}
        className="m-auto w-[300px] "
      >
        <h1 className="mb-1 font-cormorant text-2xl font-bold text-black">
          Entrega
        </h1>
        <p className="font-thin">Insira seu CEP no campo abaixo:</p>
        <Input register={methods.register} name="cep" id="cep" label="CEP" />
      </motion.form>
    </FormProvider>
  );
};

export default DeliveryForm;
