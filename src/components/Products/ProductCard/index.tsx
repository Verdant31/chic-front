import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import React, { FC } from "react";
interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }: ProductCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      key={product.id}
      className="flex cursor-pointer flex-col items-center bg-[#eeeef1] p-4"
    >
      <img
        className="h-20 w-20"
        src={product.images[0]}
        alt="Foto de um produto"
      />
      <p className="font-semibopld text-md mt-2 font-ptserif">{product.name}</p>
      <p className="font-semibopld  font-ptserif text-lg">
        R${product.price.toFixed(2)}
      </p>
      <p className="font-ptserif  text-sm">
        Ou {product.installments}x de R$
        {(product.price / product.installments).toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
