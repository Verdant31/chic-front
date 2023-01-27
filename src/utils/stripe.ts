import Stripe from "stripe";

export const stripeClient = new Stripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`,
  {
    apiVersion: "2022-11-15",
  }
);
