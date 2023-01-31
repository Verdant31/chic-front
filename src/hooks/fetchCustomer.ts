import { MainFormDataProps } from "../components/Checkout/MainForm/form";
import { Address } from "../pages/checkout";
import { stripeClient } from "../utils/stripe";

interface fetchCustomerProps {
  email: string;
  address: Address | undefined;
  mainInfo: MainFormDataProps | undefined;
}
export const fetchCustomer = async ({
  email,
  address,
  mainInfo,
}: fetchCustomerProps) => {
  const prevCustomer = await stripeClient.customers.list({
    email,
    limit: 1,
  });
  if (prevCustomer.data.length > 0) {
    return prevCustomer.data[0];
  } else {
    const customer = await stripeClient.customers.create({
      email,
      name: mainInfo?.firstName + " " + mainInfo?.lastName,
      phone: mainInfo?.cellphone,
      metadata: {
        cpf: `${mainInfo?.cpf}`,
      },
      address: {
        city: address?.city,
        line1:
          address?.street +
          " " +
          address?.number +
          " Complemento: " +
          address?.complement,
        line2: address?.district,
        state: address?.uf,
        postal_code: address?.cep,
      },
    });
    return customer;
  }
};
