import Stripe from "stripe";
import { Address, Step } from "../../../types/checkout";
import { DeliveryFormDataProps } from "./form";

export interface DeliveryFormProps {
  handleVerifyCep: (cep: string) => void;
  onSubmit: (e: DeliveryFormDataProps) => void;
  status: Step;
  address: Address | undefined;
  changeStatus: (status: Step) => void;
  customer: Stripe.Customer;
}
