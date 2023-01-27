import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import DeliveryForm from "../components/Checkout/DeliveryForm";
import { DeliveryFormDataProps } from "../components/Checkout/DeliveryForm/form";
import MainForm from "../components/Checkout/MainForm";
import { MainFormDataProps } from "../components/Checkout/MainForm/form";
import PaymentForm from "../components/Checkout/Payment";
import { PaymentFormDataProps } from "../components/Checkout/Payment/form";

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

  const { data: session, status } = useSession();

  if (status === "loading") return <p>Carregando...</p>;

  const handleMainFormCheckout = (e: MainFormDataProps) => {
    setMainFormStatus("completed");
    setDeliveryFormStatus("current");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handleDeliveryFormCheckout = (e: DeliveryFormDataProps) => {
    setDeliveryFormStatus("completed");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handlePaymentFormCheckout = (e: PaymentFormDataProps) => {
    setPaymentFormStatus("completed");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
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
