import { Session } from "next-auth";
import Stripe from "stripe";
import { Step } from "../../../types/checkout";
import { MainFormDataProps } from "./form";

export interface MainFormProps {
  onSubmit: (e: MainFormDataProps) => void;
  session: Session | null;
  status: Step;
  changeStatus: (status: Step) => void;
  customer: Stripe.Customer;
}
