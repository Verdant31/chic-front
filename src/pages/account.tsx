import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CaretDown, UserCircle } from "phosphor-react";
import React from "react";
import { stripeClient } from "../utils/stripe";

interface AccountProps {
  session: Session;
}

const Account: React.FC<AccountProps> = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div>
      <header className="flex w-[100vw] items-center border-b-[2px] px-6 pb-4">
        <div
          className="m-auto text-center"
          onClick={() => router.push("/home")}
        >
          <h1 className="font-cormorant text-[50px] font-semibold">CHIC</h1>
          <h1 className="-mt-4 font-cormorant text-[20px] font-semibold tracking-widest">
            ACESSÓRIOS
          </h1>
        </div>
      </header>
      <div className="mt-2  px-12 py-6">
        <div className=" flex items-center gap-6 ">
          <UserCircle size={48} weight="fill" />
          <p className="text-xl font-thin">Olá, {session?.user?.name}</p>
        </div>
        <div className="mt-6">
          <Accordion elevation={0} disableGutters>
            <AccordionSummary
              expandIcon={<CaretDown color="black" />}
              className="m-0 h-8 min-h-0 p-0"
              style={{ backgroundColor: "#eff2f5" }}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <h1 className="font-ptserif text-xl">Dados pessoais</h1>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col  p-0">
              <div className="p-2">
                <p className="text-lg  text-zinc-700">Nome</p>
                <p className="text-lg font-thin  text-zinc-700">
                  {session?.user?.name}
                </p>
              </div>
              <div className="p-2">
                <p className="text-lg  text-zinc-700">Email</p>
                <p className="text-lg font-thin  text-zinc-700">
                  {session?.user?.email}
                </p>
              </div>
              <div className="p-2">
                <p className="text-lg  text-zinc-700">CPF</p>
                <p className="text-lg font-thin  text-zinc-700"></p>
              </div>
              <div className="p-2">
                <p className="text-lg  text-zinc-700">Data de nascimento</p>
                <p className="text-lg font-thin  text-zinc-700"></p>
              </div>
              <div className="p-2">
                <p className="text-lg  text-zinc-700">Telefone</p>
                <p className="text-lg font-thin  text-zinc-700"></p>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="mt-6">
          <Accordion elevation={0} disableGutters>
            <AccordionSummary
              expandIcon={<CaretDown color="black" />}
              className="m-0 h-8 min-h-0 p-0"
              style={{ backgroundColor: "#eff2f5" }}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <h1 className="font-ptserif text-xl">Meus pedidos</h1>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col  p-0"></AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Account;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const customers = await stripeClient.customers.list({
    email: session.user?.email as string,
    limit: 1,
  });
  console.log(customers);
  const orders = await stripeClient.charges.list({
    customer: customers?.data[0]?.id,
  });
  console.log(orders);
  return {
    props: {},
  };
};
