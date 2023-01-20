import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import Header from "../components/Home/Header";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../context/AuthContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        {router.pathname === "/" ? null : <Header />}
        <Component {...pageProps} />
      </AuthContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
