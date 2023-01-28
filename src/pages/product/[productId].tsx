import React, { FC, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Minus, Plus } from "phosphor-react";
import { useCart } from "../../context/CartContext";
import { GetServerSideProps } from "next";
import { stripeClient } from "../../utils/stripe";
import { Product as TProduct } from "../../types/product";

interface ProductProps {
  product: TProduct;
}

const Product: FC<ProductProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useCart();

  const handleAddProduct = () => {
    if (product) {
      addProductToCart({ ...product, quantity });
    }
  };

  return (
    <div className="flex flex-col  gap-4">
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mt-12 h-48 w-44"
      >
        {product?.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="m-auto h-36 w-36"
              src={image}
              alt="Foto de um produto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mx-10 flex h-24 flex-col">
        <p className="font-ptserif text-2xl tracking-wider">{product?.name}</p>

        <div className="mt-4 flex items-center gap-8">
          <p className="pt-2 font-ptserif text-2xl font-bold">
            R${product?.price}
          </p>
          <div className="relative w-36">
            <Minus
              weight="bold"
              size={20}
              onClick={() =>
                setQuantity((prev) => (prev - 1 < 1 ? 1 : prev - 1))
              }
              className="absolute left-6 top-[50%] z-50 translate-y-[-50%]"
            />
            <input
              min={1}
              value={quantity}
              readOnly
              disabled
              className="h-12  w-[100%] text-center font-sans font-semibold text-black "
            />
            <Plus
              weight="bold"
              size={20}
              onClick={() => setQuantity((prev) => prev + 1)}
              className="absolute right-6 top-[50%] translate-y-[-50%]"
            />
          </div>
        </div>

        <button onClick={handleAddProduct} className="mt-12 bg-zinc-800 py-4">
          <p className="font-semibold uppercase tracking-wider text-white">
            Adicionar ao carrinho
          </p>
        </button>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.params?.productId as string;
  const product = await stripeClient.products.retrieve(productId);
  const price = await stripeClient.prices.retrieve(
    product.default_price as string
  );

  const formattedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price:
      price && price.unit_amount ? (price?.unit_amount / 100).toFixed(2) : 0,
    images: JSON.parse(product.metadata.imagens as string),
    category: product.metadata.categoria,
    stock: product.metadata.estoque,
  };

  return {
    props: {
      product: formattedProduct,
    },
  };
};
