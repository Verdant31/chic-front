import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Minus, Plus, Trash } from "phosphor-react";
import React from "react";
import { useCartComponent } from "../components/Cart/hook";
import PaymentForm from "../components/Checkout/Payment";
import { CheckoutProps } from "../types/checkout";

const Checkout: React.FC<CheckoutProps> = () => {
  const {
    handleProductDecrease,
    handleProductIncrease,
    products,
    removeProductFromCart,
    subtotal,
  } = useCartComponent();
  return (
    <div className="h-[100vh]">
      <h1 className="m-auto mt-2 text-center font-cormorant text-[50px] font-semibold">
        CHIC
      </h1>
      <p className="mt-8 text-center font-ptserif text-2xl uppercase">
        Resumo do carrinho
      </p>
      <div className="mt-8 flex flex-col items-center">
        {products.map((product) => (
          <div key={product.id} className="mb-12 flex items-center gap-10">
            <img
              className="h-12 w-12"
              src={product.images[0]}
              alt="Foto do produto"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <h1>{product.name}</h1>
                <Trash
                  onClick={() => removeProductFromCart(product.id)}
                  size={20}
                  color="#dfbd69"
                  weight="bold"
                />
              </div>
              <p className="mb-2">R${product.price}</p>
              <div className="relative w-24">
                <Minus
                  weight="bold"
                  color="#dfbd69"
                  onClick={() => handleProductDecrease(product)}
                  size={16}
                  className="absolute left-3 top-[50%] z-50 translate-y-[-50%]"
                />
                <input
                  min={1}
                  readOnly
                  value={product.quantity}
                  className="h-7 w-[100%] overflow-hidden rounded-full border-[1px]  border-[#dfbd69] text-center font-sans text-black outline-none focus:border-[2px] "
                />
                <Plus
                  weight="bold"
                  color="#dfbd69"
                  onClick={() => handleProductIncrease(product)}
                  size={16}
                  className="absolute right-3 top-[50%] translate-y-[-50%] focus:bg-red-500 "
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-md mr-9 mb-4 text-right font-semibold uppercase tracking-wider">
        Subtotal: R${subtotal.toFixed(2)}
      </p>
      <div className="m-auto w-[80%]">
        <PaymentForm products={products} />
        <p className="mt-4 text-center font-thin italic text-zinc-400">
          Pague parcelado com cartão de crédito ou PIX através do Paypal.
        </p>
      </div>
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
  return {
    props: {
      session,
    },
  };
};
