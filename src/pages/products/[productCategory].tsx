/* eslint-disable no-async-promise-executor */
import { Product } from "@prisma/client";
import { GetServerSideProps } from "next";
import { Sliders } from "phosphor-react";
import React, { FC, useState } from "react";
import Filter from "../../components/Products/Filter";
import useFilter from "../../components/Products/Filter/hook";
import ProductCard from "../../components/Products/ProductCard";
import { prisma } from "../../server/db";

interface CatalogProps {
  products: Product[];
}

const Catalog: FC<CatalogProps> = ({ products }) => {
  const [filterName, setFilterName] = useState<string>("");
  const { isFilterOpen, toggleDrawer } = useFilter();

  const filteredProducts =
    filterName.length > 0
      ? products?.filter((product) => {
          return product.name.toLowerCase().includes(filterName.toLowerCase());
        })
      : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="shadow-sm">
          <input
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="h-10 w-64 pl-4"
            type="text"
            placeholder="Busque por um produto"
          />
        </div>
        <Sliders onClick={toggleDrawer(true)} size={32} />
      </div>
      <Filter isFilterOpen={isFilterOpen} toggleFilter={toggleDrawer} />
      <div className="mt-4 grid grid-cols-2 gap-y-14 gap-x-8 self-center">
        {filteredProducts && filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          : products?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
      </div>
    </div>
  );
};

export default Catalog;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = context.params?.productCategory as string;
  const products = await prisma.product.findMany({
    where: { category },
  });

  return {
    props: { products },
  };
};
