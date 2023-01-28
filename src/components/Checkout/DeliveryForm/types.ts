import { Address, Step } from "../../../pages/checkout";
import { Freight } from "../../../types/freights";
import { DeliveryFormDataProps } from "./form";

export interface DeliveryFormProps {
  handleVerifyCep: (cep: string) => Promise<Freight[]>;
  onSubmit: (e: DeliveryFormDataProps) => void;
  status: Step;
  address: Address | undefined;
}
