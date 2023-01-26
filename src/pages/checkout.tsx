import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import MainForm, { MainFormDataProps } from "../components/Checkout/MainForm";
import DeliveryForm from "../components/Checkout/DeliveryForm";
import axios from "axios";

export type Step = "completed" | "current" | "pending";

const Checkout: React.FC = () => {
  const [mainFormStatus, setMainFormStatus] = useState<Step>("current");
  const [deliveryFormStatus, setDeliveryFormStatus] = useState<Step>("pending");
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Carregando...</p>;

  const handleMainFormCheckout = (e: MainFormDataProps) => {
    setMainFormStatus("completed");
    setDeliveryFormStatus("current");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handleDeliveryFormCheckout = async (e: any) => {
    setDeliveryFormStatus("completed");
    /*     try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${e.cep}/json/`
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } */
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
        status={deliveryFormStatus}
        onSubmit={handleDeliveryFormCheckout}
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
