import { Session } from "next-auth";
import React, { FC } from "react";
import { Step } from "../../pages/checkout";
import Input from "../Input";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

export interface MainFormDataProps {
  firstName: string;
  lastName: string;
  rg: string;
  cpf: string;
  cellphone: string;
}

interface MainFormProps {
  onSubmit: (e: MainFormDataProps) => void;
  session: Session | null;
  status: Step;
}

const mainFormValidationSchema = zod.object({
  firstName: zod
    .string()
    .min(1, "O campo Primeiro nome é obrigatório")
    .max(100),
  lastName: zod.string().min(1, "O campo Ultimo nome é obrigatório").max(100),
  rg: zod.string().min(1, "O campo RG é obrigatório").max(100),
  cpf: zod.string().min(1, "O campo CPF é obrigatório").max(100),
  cellphone: zod.string().min(1, "O campo Telefone é obrigatório").max(100),
});

const MainForm: FC<MainFormProps> = ({ onSubmit, session, status }) => {
  const methods = useForm<MainFormDataProps>({
    resolver: zodResolver(mainFormValidationSchema),
  });

  if (status === "completed") {
    const fieldsValue = methods.getValues();
    return (
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="m-auto mt-2 w-[300px] pb-4"
        >
          <h1 className="mb-1 font-cormorant text-2xl font-bold text-black">
            Dados pessoais
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
              Email:{" "}
              <span className="text-[15px] font-thin text-gray-800">
                {session?.user?.email}
              </span>
            </p>
            <p className="text-[15px] font-thin text-gray-800">
              Nome:{" "}
              <span className="text-[15px] font-thin text-gray-800">
                {fieldsValue.firstName} {fieldsValue.lastName}
              </span>
            </p>
            <p className="text-[15px] font-thin text-gray-800">
              Telefone:{" "}
              <span className="text-[15px] font-thin text-gray-800">
                {fieldsValue.cellphone}
              </span>
            </p>
          </motion.div>
        </form>
      </FormProvider>
    );
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="m-auto mt-2 w-[300px] "
      >
        <h1 className="mb-1 font-cormorant text-2xl font-bold text-black">
          Dados pessoais
        </h1>
        <span className="mt-4 font-medium">
          Email: <p className="font-normal">{session?.user?.email}</p>
        </span>
        <div className="mt-4">
          <Input
            register={methods.register}
            name="firstName"
            id="firstName"
            label="Primeiro nome"
          />
          <Input
            register={methods.register}
            name="lastName"
            id="lastName"
            label="Ultimo nome"
          />
          <Input register={methods.register} name="rg" id="rg" label="RG" />
          <Input register={methods.register} name="cpf" id="cpf" label="CPF" />
          <Input
            register={methods.register}
            name="cellphone"
            id="cellphone"
            label="Telefone"
          />
        </div>
        <button className="font-sm mt-10 h-12 w-full bg-zinc-700  uppercase tracking-wider text-white">
          <p className="text-sm font-bold">ir para entrega</p>
        </button>
      </form>
    </FormProvider>
  );
};

export default MainForm;
