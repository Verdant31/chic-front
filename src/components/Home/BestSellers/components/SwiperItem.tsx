import { Star } from "phosphor-react";
import React, { FC } from "react";

type Item = {
  img: string;
  price: number;
  name: string;
  rating: number;
};

interface SwiperItemProps {
  item: Item;
}

const SwiperItem: FC<SwiperItemProps> = ({ item }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < item.rating)
      stars.push(<Star key={i} size={20} weight="fill" color="#E0AA3E" />);
    else stars.push(<Star key={i} size={20} color="#E0AA3E" />);
  }
  return (
    <div className="m-auto flex h-24 w-[100%] flex-col items-center">
      <img className="h-24 w-24" src={item.img} alt="Foto de um produto" />
      <div className="mt-6 mb-4 flex items-center">{stars}</div>
      <p className="font-semibopld font-ptserif text-xl">{item.name}</p>
      <p className="font-semibopld pt-2 font-ptserif text-2xl">
        R${item.price.toFixed(2)}
      </p>
      <p className="text-md  font-ptserif">Ou 3x de R$40.99</p>
    </div>
  );
};

export default SwiperItem;
