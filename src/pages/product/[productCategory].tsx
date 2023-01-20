import { useRouter } from "next/router";
import { Sliders } from "phosphor-react";
import React, { FC, useState } from "react";
import Filter from "../../components/Products/Filter";
import useFilter from "../../components/Products/Filter/hook";
import ProductCard from "../../components/Products/ProductCard";
import { api } from "../../utils/api";

interface CatalogProps {}

const Catalog: FC<CatalogProps> = () => {
  const [filterName, setFilterName] = useState<string>("");

  const { isFilterOpen, toggleDrawer } = useFilter();
  const { query } = useRouter();
  const { data: products } = api.product.getProducts.useQuery({
    productCategory: query.productCategory as string,
  });

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
