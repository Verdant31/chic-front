import { Step } from "../../../pages/checkout";
import { PaymentFormDataProps } from "./form";

export interface PaymentFormProps {
  onSubmit: (e: PaymentFormDataProps) => void;
  status: Step;
}
