import { useRouter } from "next/router";

export const useCategories = () => {
  const router = useRouter();
  const handleRedirect = (productName: string) => {
    router.push(`/products/${productName}`);
  };

  return { handleRedirect };
};
