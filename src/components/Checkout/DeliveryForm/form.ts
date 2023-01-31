import * as zod from "zod";
import { Address } from "../../../pages/checkout";

export const deliveryFormValidationSchema = zod.object({
  cep: zod.string().length(8, "CEP inválido"),
  district: zod.string().min(1, "O campo Bairro é obrigatório"),
  city: zod.string().min(1, "O campo Cidade é obrigatório"),
  complement: zod.string(),
  uf: zod.string().min(1, "O campo UF é obrigatório"),
  street: zod.string().min(1, "O campo Endereço é obrigatório"),
  number: zod.string().min(1, "O campo Numero é obrigatório"),
});

export interface DeliveryFormDataProps extends Address {
  cep: string;
}
