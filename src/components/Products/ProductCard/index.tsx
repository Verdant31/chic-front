import { Product } from "@prisma/client";
import React, { FC } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }: ProductCardProps) => {
  return (
    <div
      key={product.id}
      className="flex cursor-pointer flex-col items-center bg-[#eeeef1] p-4"
    >
      <img
        className="h-20 w-20"
        src={product.imageUrl}
        alt="Foto de um produto"
      />
      <p className="font-semibopld text-md mt-2 font-ptserif">{product.name}</p>
      <p className="font-semibopld  font-ptserif text-lg">
        R${product.price.toFixed(2)}
      </p>
      <p className="font-ptserif  text-sm">Ou 3x de R$40.99</p>
    </div>
  );
};

export default ProductCard;
