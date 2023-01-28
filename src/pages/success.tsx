/* eslint-disable camelcase */
import { GetServerSideProps } from "next";
import React from "react";
import { stripeClient } from "../utils/stripe";
import { Stripe } from "stripe";
interface ExtendedLineItem extends Stripe.LineItem {
  productImages: string[];
}
interface ExtendedSession extends Stripe.Response<Stripe.Checkout.Session> {
  line_items: {
    data: ExtendedLineItem[];
    has_more: boolean;
    object: "list";
    url: string;
  };
}
interface SuccessProps {
  order: ExtendedSession;
}

const Success: React.FC<SuccessProps> = ({ order }) => {
  return (
    <div className="h-[100vh]">
      <h1 className="m-auto mt-2 text-center font-cormorant text-[50px] font-semibold">
        CHIC
      </h1>
      <div className="m-auto w-[90%] rounded-sm bg-[#e0e0e4] p-4">
        <p className="font-ptserif font-semibold">
          Pedido realizado com sucesso!
        </p>
        <p className="mt-2 font-ptserif">
          Obrigado por comprar na CHIC Acessórios.
        </p>
        <p className="font-ptserif">
          Seu pedido já está sendo processado e será enviado em breve.
        </p>
        <p className="mt-4 font-ptserif">Resumo do pedido</p>
        <p className="mt-2 font-thin">
          Total: R${((order.amount_total as number) / 100).toFixed(2)}
        </p>
        <p className="mt-2 font-thin">Items:</p>
        {order.line_items.data.map((item) => (
          <div key={item.id}>
            <img
              className="h-12 w-12"
              src={item.productImages[0]}
              alt="Imagem do produto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionId = context.query.session_id;
  const session = await stripeClient.checkout.sessions.retrieve(
    sessionId as string,
    { expand: ["line_items", "payment_intent"] }
  );
  const products = await Promise.all(
    (session.line_items as Stripe.ApiList<Stripe.LineItem>).data.map(
      async (lineItem) => {
        const product = await stripeClient.products.retrieve(
          lineItem.price?.product as string
        );
        return product;
      }
    )
  );

  const line_items = (
    (session.line_items as Stripe.ApiList<Stripe.LineItem>)
      .data as Stripe.LineItem[]
  ).map((lineItem) => {
    const product = products.find((p) => p.id === lineItem.price?.product);
    return { ...lineItem, productImages: product?.images };
  });

  return {
    props: {
      order: {
        ...session,
        line_items: { ...session.line_items, data: line_items },
      },
    },
  };
};
