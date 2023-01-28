import { CartProduct, useCart } from "../../context/CartContext";

export function useCartComponent() {
  const { products, toggleQuantity, removeProductFromCart } = useCart();

  const subtotal = products.reduce((acc, product) => {
    return acc + Number(product.price) * product.quantity;
  }, 0);

  const handleProductDecrease = (product: CartProduct) => {
    if (product.quantity === 1) {
      removeProductFromCart(product.id);
      return;
    }
    toggleQuantity(product.id, "decrease");
  };

  const handleProductIncrease = (product: CartProduct) => {
    if (product.quantity > Number(product.stock)) {
      return;
    }
    toggleQuantity(product.id, "increase");
  };
  return {
    products,
    subtotal,
    handleProductDecrease,
    handleProductIncrease,
    removeProductFromCart,
  };
}
