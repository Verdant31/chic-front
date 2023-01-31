import { Step } from "../../../pages/checkout";
export interface PaymentFormProps {
  onSubmit: () => void;
  status: Step;
}
