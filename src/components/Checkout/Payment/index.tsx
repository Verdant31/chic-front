import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "phosphor-react";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../Input";
import Select from "../../Select";
import { PaymentFormDataProps, paymentFormValidationSchema } from "./form";
import { PaymentFormProps } from "./types";

const PaymentForm: FC<PaymentFormProps> = ({ onSubmit, status }) => {
  const {
    handleSubmit,
    control,
    getValues,
    watch,
    register,
    formState: { errors },
  } = useForm<PaymentFormDataProps>({
    resolver: zodResolver(paymentFormValidationSchema),
    defaultValues: {
      paymentOption: "card",
    },
  });
  const paymentOption = watch("paymentOption");
  console.log(errors);
  return (
    <div className="m-auto mt-2 w-[300px] ">
      <h1 className="mb-1 font-cormorant text-2xl font-bold text-black">
        Pagamento
      </h1>
      <Controller
        control={control}
        name="paymentOption"
        render={({ field }) => {
          return (
            <div className="mt-4 flex flex-col gap-4 border-[1px] border-t-[0px] border-r-[0px] border-l-[0px] border-b-[2px] border-gray-300 pb-4">
              <div
                onClick={() => field.onChange("card")}
                className={`flex items-center gap-4 border-[1px] p-3 shadow-black ${
                  getValues().paymentOption === "card" && "bg-zinc-200"
                }`}
              >
                <CreditCard size={32} />
                <p>Cartão de crédito</p>
              </div>
              <div
                onClick={() => field.onChange("pix")}
                className={`flex items-center gap-4 border-[1px] p-3 shadow-black ${
                  getValues().paymentOption === "pix" && "bg-zinc-200"
                }`}
              >
                <img className="h-6 w-6" src="pix.png" alt="Pix logo" />
                <p>Pix</p>
              </div>
            </div>
          );
        }}
      />
      {paymentOption === "card" && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Input
            id="cardNumber"
            name="cardNumber"
            label="Numero do cartão"
            errors={errors}
            register={register}
          />
          <Input
            id="cardName"
            name="cardName"
            label="Nome impresso no cartão"
            errors={errors}
            register={register}
          />
          <div className="flex gap-4">
            <Select
              options={months}
              id="cardMonth"
              name="cardMonth"
              label="Validade"
              errors={errors}
              register={register}
            />
            <Select
              label=""
              options={years}
              required={false}
              id="cardYear"
              name="cardYear"
              errors={errors}
              register={register}
            />
          </div>
          <div className="flex gap-4">
            <Input
              id="cardCvv"
              name="cardCvv"
              label="Código"
              errors={errors}
              register={register}
            />
            <Input
              id="holderCpf"
              name="holderCpf"
              label="CPF do titular"
              errors={errors}
              register={register}
            />
          </div>
          <button className="font-sm mt-10 h-12 w-full bg-zinc-700  uppercase tracking-wider text-white">
            <p className="text-sm font-bold">finalizar pedido</p>
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;

const months = [
  "Mês",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const years = [
  "Ano",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
];
