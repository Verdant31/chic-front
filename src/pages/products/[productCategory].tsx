/* eslint-disable no-async-promise-executor */
import { GetServerSideProps } from "next";
import { Sliders } from "phosphor-react";
import React, { FC, useState } from "react";
import Filter from "../../components/Products/Filter";
import useFilter from "../../components/Products/Filter/hook";
import ProductCard from "../../components/Products/ProductCard";
import { Product } from "../../types/product";
import { stripeClient } from "../../utils/stripe";

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
  const { data: products } = await stripeClient.products.search({
    query: `metadata['categoria']:'${context.params?.productCategory}'`,
  });
  const { data: prices } = await stripeClient.prices.list();
  const formattedProducts = products.map((product) => {
    const price = prices.find((price) => price.product === product.id);
    if (!price?.unit_amount) return null;
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: (price?.unit_amount / 100).toFixed(2),
      images: JSON.parse(product.metadata.imagens as string),
      category: product.metadata.categoria,
      stock: product.metadata.estoque,
    };
  });
  return {
    props: {
      products: formattedProducts,
    },
  };
};
