import { useRouter } from "next/router";
import React, { FC } from "react";
import Filter from "../../components/Products/Filter";
import { api } from "../../utils/api";

interface CatalogProps {}

const Catalog: FC<CatalogProps> = () => {
  const { query } = useRouter();
  const { data: products } = api.product.getProducts.useQuery({
    productCategory: query.productCategory as string,
  });
  return (
    <div className="flex flex-col gap-4">
      <Filter />
      {products?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default Catalog;
