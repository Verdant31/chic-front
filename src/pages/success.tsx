import { GetServerSideProps } from "next";
import React from "react";
import { stripeClient } from "../utils/stripe";
import { Stripe } from "stripe";

interface SuccessProps {
  order: Stripe.Response<Stripe.Checkout.Session>;
  payment: Stripe.Response<Stripe.PaymentIntent>;
}

const Success: React.FC<SuccessProps> = ({ order, payment }) => {
  return (
    <div className="h-[100vh]">
      <h1 className="m-auto mt-2 text-center font-cormorant text-[50px] font-semibold">
        CHIC
      </h1>
      <p>Status do pagamento: {payment.status}</p>
    </div>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionId = context.query.session_id;
  const session = await stripeClient.checkout.sessions.retrieve(
    sessionId as string
  );
  const payment = await stripeClient.paymentIntents.retrieve(
    session.payment_intent as string
  );
  return {
    props: { order: session, payment },
  };
};
