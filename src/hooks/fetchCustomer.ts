import { stripeClient } from "../utils/stripe";

export const fetchCustomer = async (email: string) => {
  const prevCustomer = await stripeClient.customers.list({
    email,
    limit: 1,
  });
  console.log(prevCustomer.data);
  console.log("opa");
  if (prevCustomer.data.length > 0) {
    return prevCustomer.data[0];
  } else {
    const customer = await stripeClient.customers.create({
      email,
    });
    return customer;
  }
};
