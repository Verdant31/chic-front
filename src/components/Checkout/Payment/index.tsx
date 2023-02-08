/* eslint-disable no-undef */
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
} from "@paypal/paypal-js/types/components/buttons";
import React, { FC, useCallback } from "react";
import { PaymentFormProps } from "./types";

const PaymentForm: FC<PaymentFormProps> = ({ products }) => {
  const handleCreateOrder = useCallback(
    (data: CreateOrderData, actions: CreateOrderActions) => {
      return actions.order.create({
        purchase_units: products.map((product) => ({
          amount: {
            value: (Number(product.price) * product.quantity).toString(),
          },
        })),
      });
    },
    [products]
  );

  return (
    <PayPalButtons
      style={{ layout: "horizontal", tagline: false }}
      createOrder={handleCreateOrder}
      onApprove={async (data, actions) => {
        const order = await actions.order?.capture();
        console.log("order", order);
        console.log("data", data);
      }}
      onCancel={() => {}}
      onError={(err) => {
        console.log("Error", err);
      }}
    />
  );
};

export default PaymentForm;
