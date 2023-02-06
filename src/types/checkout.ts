import Stripe from "stripe";
export type Step = "completed" | "current" | "pending" | "cepVerified";
export type Address = {
  district: string;
  city: string;
  cep: string;
  uf: string;
  street: string;
  number: string;
  complement: string;
};
export interface CheckoutProps {
  customer: Stripe.Customer;
}
