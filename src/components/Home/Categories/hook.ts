import { useRouter } from "next/router";

export const useCategories = () => {
  const router = useRouter();
  const handleRedirect = (productName: string) => {
    router.push(`/product/${productName}`);
  };

  return { handleRedirect };
};
