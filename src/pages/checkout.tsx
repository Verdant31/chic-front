import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DeliveryForm from "../components/Checkout/DeliveryForm";
import { DeliveryFormDataProps } from "../components/Checkout/DeliveryForm/form";
import MainForm from "../components/Checkout/MainForm";
import { MainFormDataProps } from "../components/Checkout/MainForm/form";
import PaymentForm from "../components/Checkout/Payment";
import { useCart } from "../context/CartContext";
import { Freight } from "../types/freights";
import { api } from "../utils/api";
import { stripeClient } from "../utils/stripe";
import { Address, CheckoutProps, Step } from "../types/checkout";
import { getCep } from "../utils/getCep";

const Checkout: React.FC<CheckoutProps> = ({ customer }) => {
  const { data: session, status } = useSession();
  const { products } = useCart();
  const router = useRouter();

  const [mainFormStatus, setMainFormStatus] = useState<Step>("current");
  const [deliveryFormStatus, setDeliveryFormStatus] = useState<Step>("pending");
  const [paymentFormStatus, setPaymentFormStatus] = useState<Step>("pending");
  const [freightOptions, setFreightOptions] = useState<Freight[]>([]);
  const [address, setAddress] = useState<Address | undefined>();
  const [mainInfo, setMainInfo] = useState<MainFormDataProps | undefined>();

  const createCustomerMutation = api.customer.createCustomer.useMutation();
  const checkoutMutation = api.customer.checkout.useMutation();

  if (status === "loading") return <p>Carregando...</p>;

  const handleChangeMainFormStatus = (newStatus: Step) => {
    setMainFormStatus(newStatus);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handleChangeDeliveryFormStatus = (newStatus: Step) => {
    setDeliveryFormStatus(newStatus);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handleMainFormCheckout = (e: MainFormDataProps) => {
    setMainInfo(e);
    setMainFormStatus("completed");
    setDeliveryFormStatus("current");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handleDeliveryFormCheckout = async (e: DeliveryFormDataProps) => {
    setAddress(e);
    setDeliveryFormStatus("completed");
    setPaymentFormStatus("current");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handlePaymentFormCheckout = async () => {
    setPaymentFormStatus("completed");
    if (!session?.user?.email || !address || !mainInfo) return;
    if (!customer) {
      await createCustomerMutation
        .mutateAsync({
          email: session?.user?.email,
          address,
          mainInfo,
        })
        .then(async (customer) => {
          await checkoutMutation
            .mutateAsync({
              customerId: customer.id,
              products,
              freightOptions,
            })
            .then((res) => {
              if (res && res.url) router.push(res.url);
            });
        });
    } else {
      await checkoutMutation
        .mutateAsync({
          customerId: customer.id,
          products,
          freightOptions,
        })
        .then((res) => {
          if (res && res.url) router.push(res.url);
        });
    }
  };

  const handleVerifyCep = async (cep: string) => {
    setDeliveryFormStatus("cepVerified");
    const response = await getCep(cep);
    if (response?.address) setAddress(response.address);
    if (response?.freights) setFreightOptions(response.freights);
  };
  console.log(mainInfo);
  return (
    <div className="h-[100vh]">
      <h1 className="m-auto mt-2 text-center font-cormorant text-[50px] font-semibold">
        CHIC
      </h1>
      <MainForm
        status={mainFormStatus}
        onSubmit={handleMainFormCheckout}
        session={session}
        changeStatus={handleChangeMainFormStatus}
      />
      <DeliveryForm
        onSubmit={handleDeliveryFormCheckout}
        address={address}
        status={deliveryFormStatus}
        handleVerifyCep={handleVerifyCep}
        changeStatus={handleChangeDeliveryFormStatus}
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
  if (!session || !session?.user?.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const prevCustomer = await stripeClient.customers.list({
    email: session?.user?.email,
    limit: 1,
  });

  return {
    props: {
      session,
      customer: prevCustomer.data[0] ? prevCustomer.data[0] : null,
    },
  };
};
