import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../context/AuthContext";
import { CartContextProvider } from "../context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const hasHader =
    router.pathname === "/" ||
    router.pathname === "/checkout" ||
    router.pathname === "/success" ||
    router.pathname === "/account";
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <CartContextProvider>
          <ToastContainer autoClose={1000} />
          {hasHader ? null : <Header />}
          <PayPalScriptProvider
            options={{
              currency: "BRL",
              "client-id":
                "AbXTdbuvfXaSAQYJp8ZDariWTXxiY8rN79sQE7Hc6I3etWK3Hu8gKoG-ExVQafesUm137c_XRvPvP4R8",
            }}
          >
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
