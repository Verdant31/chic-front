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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const hasHader = router.pathname === "/" || router.pathname === "/checkout";
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <CartContextProvider>
          <ToastContainer autoClose={1000} />
          {hasHader ? null : <Header />}
          <Component {...pageProps} />
        </CartContextProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
