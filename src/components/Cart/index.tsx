import { Drawer } from "@mui/material";
import React, { FC } from "react";
import { Minus, Plus, Trash } from "phosphor-react";
import { useCartComponent } from "./hook";
import { useRouter } from "next/router";

interface CartProps {
  isCartOpen: boolean;
  toggleCart: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Cart: FC<CartProps> = ({ isCartOpen, toggleCart }) => {
  const router = useRouter();
  const {
    handleProductDecrease,
    handleProductIncrease,
    subtotal,
    products,
    removeProductFromCart,
  } = useCartComponent();
  return (
    <Drawer anchor="right" open={isCartOpen} onClose={toggleCart(false)}>
      <div className="h-[100vh] w-[320px] bg-white p-6">
        <p className="mb-8 text-center text-xl font-bold uppercase tracking-widest">
          Carrinho
        </p>
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-6">
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
                  size={16}
                  onClick={() => handleProductDecrease(product)}
                  className="absolute left-3 top-[50%] z-50 translate-y-[-50%]"
                />
                <input
                  min={1}
                  value={product.quantity}
                  className="h-7 w-[100%] overflow-hidden rounded-full border-[1px]  border-[#dfbd69] text-center font-sans text-black outline-none focus:border-[2px] "
                />
                <Plus
                  onClick={() => handleProductIncrease(product)}
                  weight="bold"
                  color="#dfbd69"
                  size={16}
                  className="absolute right-3 top-[50%] translate-y-[-50%] focus:bg-red-500 "
                />
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-12 left-[50%] flex w-[100%] translate-x-[-50%] flex-col items-center ">
          {products.length > 0 && (
            <span className="mb-6 text-lg font-bold">
              Subtotal:{" "}
              <span className="font-normal">R${subtotal.toFixed(2)}</span>
            </span>
          )}
          <button
            onClick={() => router.push("/checkout")}
            className="w-[80%] bg-zinc-800 py-4"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              {products.length > 0 ? "Finalizar compra" : "Continuar comprando"}
            </p>
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default Cart;
