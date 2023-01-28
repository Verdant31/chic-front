import React, { FC, useEffect, useState } from "react";
import Input from "../../Input";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../../Select";
import { DeliveryFormDataProps, deliveryFormValidationSchema } from "./form";
import { DeliveryFormProps } from "./types";
import { Freight } from "../../../types/freights";
import { FormControlLabel, Radio } from "@mui/material";
import DeliveryFormFilled from "./components/DeliveryFormFilled";

const DeliveryForm: FC<DeliveryFormProps> = ({
  status,
  onSubmit,
  address,
  handleVerifyCep,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    control,
    setValue,
  } = useForm<DeliveryFormDataProps>({
    resolver: zodResolver(deliveryFormValidationSchema),
  });
  const [freightOptions, setFreightOptions] = useState<Freight[]>([]);

  const verifyCepAndGetFreight = async (cep: string) => {
    const freights = await handleVerifyCep(cep);
    setFreightOptions(freights);
  };

  useEffect(() => {
    if (address) {
      setValue("street", address.street);
      setValue("district", address.district);
      setValue("city", address.city);
      setValue("uf", address.uf);
    }
  }, [address, setValue]);

  if (status === "pending") return null;
  if (status === "completed") {
    const fields = getValues();
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto mt-2 w-[300px] pb-4"
      >
        <DeliveryFormFilled fields={fields} />
      </form>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.7,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="m-auto  w-[300px]"
    >
      <h1 className="mb-1 font-cormorant text-2xl font-bold text-black">
        Entrega
      </h1>
      <p className="font-thin">Insira seu CEP no campo abaixo:</p>
      <Input
        onKeyUp={(event) =>
          event.key === "Enter"
            ? verifyCepAndGetFreight(getValues("cep"))
            : null
        }
        errors={errors}
        register={register}
        name="cep"
        id="cep"
        label="CEP"
      />
      {status === "cepVerified" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            errors={errors}
            register={register}
            name="street"
            id="street"
            label="Endereço"
          />
          <div className="flex gap-4">
            <Input
              errors={errors}
              register={register}
              name="number"
              id="number"
              label="Numero"
            />
            <Input
              errors={errors}
              required={false}
              register={register}
              name="complement"
              id="complement"
              label="Complemento"
            />
          </div>
          <Input
            errors={errors}
            register={register}
            name="district"
            id="district"
            label="Bairro"
          />
          <div className="flex gap-4">
            <Input
              errors={errors}
              register={register}
              name="city"
              id="city"
              label="Cidade"
            />
            <Select
              options={states}
              errors={errors}
              register={register}
              name="uf"
              id="uf"
              label="Estado"
            />
          </div>
          <Controller
            name="freightOption"
            control={control}
            render={({ field }) => (
              <div className="mt-4">
                {freightOptions.length > 0 &&
                  freightOptions.map((freight) => (
                    <FormControlLabel
                      key={freight.serviceCode}
                      value={freight.serviceCode}
                      control={
                        <Radio
                          onChange={field.onChange}
                          checked={field.value === freight.serviceCode}
                        />
                      }
                      label={`${freight.serviceName} (${freight.deadline} dias úteis) - R$ ${freight.price}`}
                    />
                  ))}
              </div>
            )}
          />
          {errors.freightOption && (
            <p className="text-sm text-red-500">Selecione uma opção de frete</p>
          )}
          <button className="font-sm mb-12 mt-10 h-12 w-full bg-zinc-700  uppercase tracking-wider text-white">
            <p className="text-sm font-bold">ir para o pagamento</p>
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default DeliveryForm;

const states = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO",
];
