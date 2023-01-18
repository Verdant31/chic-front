import React, { FC } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { bestSellersMock } from "./mock";
import SwiperItem from "./components/SwiperItem";

interface BestSellersProps {}

const BestSellers: FC<BestSellersProps> = () => {
  return (
    <div className="mb-44 mt-12 flex flex-col items-center">
      <p className="mt-8 font-ptserif text-2xl font-medium uppercase tracking-widest text-black">
        Mais vendidos
      </p>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mt-12 mb-12 h-[300px] w-44"
      >
        {bestSellersMock.map((item) => (
          <SwiperSlide key={item.name}>
            <SwiperItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestSellers;
