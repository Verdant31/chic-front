import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "phosphor-react";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { PaymentFormDataProps, paymentFormValidationSchema } from "./form";
import { PaymentFormProps } from "./types";

const PaymentForm: FC<PaymentFormProps> = ({ onSubmit, status }) => {
  const { control, getValues } = useForm<PaymentFormDataProps>({
    resolver: zodResolver(paymentFormValidationSchema),
    defaultValues: {
      paymentOption: "card",
    },
  });
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
      <button
        onClick={() => onSubmit(getValues())}
        className="font-sm mt-10 h-12 w-full bg-zinc-700  uppercase tracking-wider text-white"
      >
        <p className="text-sm font-bold">ir para o pagamento</p>
      </button>
    </div>
  );
};

export default PaymentForm;
