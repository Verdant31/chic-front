import { getBaseUrl } from "../../../utils/api";
import { stripeClient } from "../../../utils/stripe";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  checkoutSchema,
  createCustomerSchema,
} from "./schemas/customerSchemas";

export const customerRouter = createTRPCRouter({
  createCustomer: publicProcedure
    .input(createCustomerSchema)
    .mutation(async ({ input }) => {
      const customer = await stripeClient.customers.create({
        email: input.email,
        name: input.mainInfo?.firstName + " " + input.mainInfo?.lastName,
        phone: input.mainInfo?.cellphone,
        metadata: {
          cpf: `${input.mainInfo?.cpf}`,
          firstName: input.mainInfo?.firstName,
          lastName: input.mainInfo?.lastName,
        },
        address: {
          country: "Brasil",
          city: input.address?.city,
          line1:
            input.address?.street +
            " " +
            +"Numero: " +
            input.address?.number +
            " Complemento: " +
            input.address?.complement,
          line2: input.address?.district,
          state: input.address?.uf,
          postal_code: input.address?.cep,
        },
      });
      return customer;
    }),
  checkout: publicProcedure
    .input(checkoutSchema)
    .mutation(async ({ input }) => {
      const checkout = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_update: {
          name: "auto",
        },
        customer: input.customerId,
        metadata: {
          orderStatus: "delivery pending",
        },
        shipping_options: input.freightOptions.map((freight) => ({
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: freight.serviceName,
            fixed_amount: {
              currency: "brl",
              amount: Math.round(Number(freight.price.replace(",", ".")) * 100),
            },
            delivery_estimate: {
              maximum: { unit: "day", value: Number(freight.deadline) },
            },
          },
        })),
        line_items: input.products.map((product) => ({
          price_data: {
            currency: "brl",
            unit_amount: Number(product.price) * 100,
            product_data: {
              name: product.name,
              images: product.images,
            },
          },
          quantity: product.quantity,
        })),
        success_url: `${getBaseUrl()}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${getBaseUrl()}/home`,
      });
      return checkout;
    }),
});
