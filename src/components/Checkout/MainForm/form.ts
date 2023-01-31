import * as zod from "zod";

export const mainFormValidationSchema = zod.object({
  firstName: zod
    .string()
    .min(1, "O campo Primeiro nome é obrigatório")
    .max(100),
  lastName: zod.string().min(1, "O campo Ultimo nome é obrigatório").max(100),
  rg: zod.string().min(1, "O campo RG é obrigatório").max(100),
  cpf: zod.string().min(11, "O campo CPF é obrigatório").max(100),
  cellphone: zod.string().min(11, "O campo Telefone é obrigatório").max(100),
});
export interface MainFormDataProps {
  firstName: string;
  lastName: string;
  rg: string;
  cpf: string;
  cellphone: string;
}
