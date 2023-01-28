import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DeliveryForm from "../components/Checkout/DeliveryForm";
import { DeliveryFormDataProps } from "../components/Checkout/DeliveryForm/form";
import MainForm from "../components/Checkout/MainForm";
import { MainFormDataProps } from "../components/Checkout/MainForm/form";
import PaymentForm from "../components/Checkout/Payment";
import { PaymentFormDataProps } from "../components/Checkout/Payment/form";
import { useCart } from "../context/CartContext";
import { stripeClient } from "../utils/stripe";
import axios from "axios";
import { Freight } from "../types/freights";

export type Step = "completed" | "current" | "pending" | "cepVerified";
export type Address = {
  district: string;
  city: string;
  uf: string;
  street: string;
  number: string;
  complement: string;
};

const Checkout: React.FC = () => {
  const [mainFormStatus, setMainFormStatus] = useState<Step>("current");
  const [deliveryFormStatus, setDeliveryFormStatus] = useState<Step>("pending");
  const [paymentFormStatus, setPaymentFormStatus] = useState<Step>("pending");
  const [address, setAddress] = useState<Address | undefined>();
  const router = useRouter();
  const { products } = useCart();
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Carregando...</p>;

  const handleMainFormCheckout = (e: MainFormDataProps) => {
    setMainFormStatus("completed");
    setDeliveryFormStatus("current");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handleDeliveryFormCheckout = async (e: DeliveryFormDataProps) => {
    setDeliveryFormStatus("completed");
    setPaymentFormStatus("current");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handlePaymentFormCheckout = async (e: PaymentFormDataProps) => {
    setPaymentFormStatus("completed");
    await stripeClient.checkout.sessions
      .create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: products.map((product) => ({
          price_data: {
            currency: "brl",
            unit_amount: Number(product.price) * 100,
            product_data: {
              name: product.name,
              images: product.images,
            },
          },
          quantity: product.quantity,
        })),
        success_url:
          "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/cancel",
      })
      .then((res) => {
        if (res && res.url) router.push(res.url);
      });
  };

  const handleVerifyCep = async (cep: string) => {
    setDeliveryFormStatus("cepVerified");
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
      (res) => res.json()
    );
    if (response)
      setAddress({
        city: response.localidade,
        district: response.bairro,
        uf: response.uf,
        street: response.logradouro,
        number: "",
        complement: "",
      });
    const freights: Freight[] = await axios
      .post("api/calculateDeliveryFee", {
        cep,
      })
      .then((res) => res.data.freights);
    return freights;
  };

  return (
    <div className="h-[100vh]">
      <h1 className="m-auto mt-2 text-center font-cormorant text-[50px] font-semibold">
        CHIC
      </h1>
      <MainForm
        status={mainFormStatus}
        onSubmit={handleMainFormCheckout}
        session={session}
      />
      <DeliveryForm
        onSubmit={handleDeliveryFormCheckout}
        address={address}
        status={deliveryFormStatus}
        handleVerifyCep={handleVerifyCep}
      />
      <PaymentForm
        onSubmit={handlePaymentFormCheckout}
        status={paymentFormStatus}
      />
    </div>
  );
};

export default Checkout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
