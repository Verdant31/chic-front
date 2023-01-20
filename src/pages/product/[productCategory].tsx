import { useRouter } from "next/router";
import { Sliders } from "phosphor-react";
import React, { FC } from "react";
import Filter from "../../components/Products/Filter";
import useFilter from "../../components/Products/Filter/hook";
import { api } from "../../utils/api";

interface CatalogProps {}

const Catalog: FC<CatalogProps> = () => {
  const { isFilterOpen, toggleDrawer } = useFilter();
  const { query } = useRouter();
  const { data: products } = api.product.getProducts.useQuery({
    productCategory: query.productCategory as string,
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="shadow-sm">
          <input
            className="h-10 w-64 pl-4"
            type="text"
            placeholder="Busque por um produto"
          />
        </div>
        <Sliders onClick={toggleDrawer(true)} size={32} />
      </div>
      <Filter isFilterOpen={isFilterOpen} toggleFilter={toggleDrawer} />
      {products?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default Catalog;
