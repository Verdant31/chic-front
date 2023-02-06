import { z } from "zod";

export const createCustomerSchema = z.object({
  email: z.string(),
  address: z.object({
    district: z.string(),
    city: z.string(),
    cep: z.string(),
    uf: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
  }),
  mainInfo: z.object({
    firstName: z.string(),
    lastName: z.string(),
    cellphone: z.string(),
    cpf: z.string(),
  }),
});

export const checkoutSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().nullable().optional(),
      price: z.string(),
      images: z.array(z.string()),
      quantity: z.number(),
      category: z.string(),
      stock: z.string(),
    })
  ),
  customerId: z.string(),
  freightOptions: z.array(
    z.object({
      price: z.string(),
      deadline: z.string(),
      serviceCode: z.string(),
      serviceName: z.string(),
      error: z.string(),
    })
  ),
});
