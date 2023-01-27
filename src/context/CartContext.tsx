import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import nookies from "nookies";
import { Product } from "../types/product";

interface CartContextProviderProps {
  children: ReactNode;
}

export interface CartProduct extends Product {
  quantity: number;
}
interface CartContextProps {
  products: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (productId: string) => void;
  toggleQuantity: (
    productId: string,
    toggleType: "increase" | "decrease"
  ) => void;
}

const CartContext = createContext({} as CartContextProps);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    const products = nookies.get().products;
    if (products) {
      setProducts(JSON.parse(products));
    }
  }, []);

  const toggleQuantity = (
    productId: string,
    toggleType: "increase" | "decrease"
  ) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity:
            toggleType === "increase"
              ? product.quantity + 1
              : product.quantity - 1,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    nookies.set({}, "products", JSON.stringify(updatedProducts));
  };

  const removeProductFromCart = (productId: string) => {
    const updatedProducts = products.filter((product) => {
      return product.id !== productId;
    });
    setProducts(updatedProducts);
    nookies.set({}, "products", JSON.stringify(updatedProducts));
  };

  const addProductToCart = (product: CartProduct) => {
    const productIndex = products.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );
    if (productIndex === -1) {
      setProducts([...products, product]);
      nookies.set({}, "products", JSON.stringify([...products, product]));
    } else {
      setProducts((prev) => {
        const newProducts = [...prev];
        (products[productIndex] as CartProduct).quantity += product.quantity;
        nookies.set({}, "products", JSON.stringify(newProducts));
        return newProducts;
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        toggleQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const value = useContext(CartContext);
  return value;
};
