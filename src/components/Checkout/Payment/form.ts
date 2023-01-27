import * as zod from "zod";

export interface PaymentFormDataProps {
  paymentOption: "card" | "paypal" | "pix" | "bank" | "other";
  cardNumber: string;
  cardName: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
  holderCpf: string;
}
export const paymentFormValidationSchema = zod.object({
  paymentOption: zod.string().optional(),
  cardNumber: zod.string().min(16, "O campo Numero é obrigatório").max(16),
  cardName: zod.string().min(1, "O campo Nome é obrigatório"),
  cardMonth: zod.string().min(1, "O campo Mês é obrigatório"),
  cardYear: zod.string().min(1, "O campo Ano é obrigatório"),
  cardCvv: zod.string().min(3, "O campo CVV é obrigatório"),
  holderCpf: zod.string().min(11, "O campo CPF é obrigatório").max(11),
});
