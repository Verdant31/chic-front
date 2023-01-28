import { Address, Step } from "../../../pages/checkout";
import { DeliveryFormDataProps } from "./form";

export interface DeliveryFormProps {
  handleVerifyCep: (cep: string) => void;
  onSubmit: (e: DeliveryFormDataProps) => void;
  status: Step;
  address: Address | undefined;
}
