import { type NextPage } from "next";
import { signIn } from "next-auth/react";

const Login: NextPage = () => {
  /*   const { data: session } = useSession();
   */ return (
    <div className="flex flex-col items-center">
      <h1 className="m-auto  mt-4 font-cormorant text-[50px] font-semibold">
        CHIC
      </h1>
      <div className="mt-4 flex flex-col items-center">
        <p className="text-lg tracking-wider text-zinc-500">
          Entrar com email e senha
        </p>
        <div className="mt-4 flex flex-col items-center gap-4 ">
          <input
            placeholder="Email"
            type="text"
            className="h-10 w-72 rounded-none pl-4 shadow-lg"
          />
          <input
            placeholder="Senha"
            type="text"
            className="h-10 w-72 rounded-none pl-4 shadow-lg"
          />
          <p className="text-center font-medium tracking-wider underline">
            Esqueceu sua senha?
          </p>
          <button className="h-12 w-72 bg-zinc-700 text-lg font-medium uppercase tracking-wider text-white">
            Entrar
          </button>
          <p className="text-center font-medium tracking-wider underline">
            Não tem uma conta? Cadastre-se
          </p>
        </div>
        <button
          onClick={() => signIn("google")}
          className="relative mt-8 flex items-center gap-4 bg-white p-4 px-6 shadow-md"
        >
          <img src="google.png" className="h-6 w-6" alt="line" />
          <p className="uppercase">Entrar com conta google</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
