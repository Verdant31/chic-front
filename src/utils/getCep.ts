/* eslint-disable no-unused-vars */
import axios from "axios";
import { Address } from "../types/checkout";
import { Freight } from "../types/freights";
// export type Freight = {
//     price: string;
//     deadline: string;
//     serviceCode: string;
//     serviceName: string;
//     error: string;
//   };

export const getCep = async (cep: string) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
    (res) => res.json()
  );
  if (response) {
    return await axios
      .post("api/calculateDeliveryFee", {
        cep,
      })
      .then((res) => {
        const freights: Freight[] = res.data.freights;
        return {
          address: {
            cep,
            city: response.localidade,
            district: response.bairro,
            uf: response.uf,
            street: response.logradouro,
            number: "",
            complement: "",
          },
          freights,
        };
      });
  }
};
