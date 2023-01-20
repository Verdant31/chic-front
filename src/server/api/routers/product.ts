/* eslint-disable no-undef */
import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure
    .input(z.object({ productCategory: z.string() }))
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: {
          category: {
            equals: input.productCategory,
          },
        },
      });
      return products;
    }),
  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        stock: z.number(),
        category: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.product
        .create({
          data: {
            name: input.name,
            price: input.price,
            stock: input.stock,
            category: input.category,
            imageUrl: "http://localhost:3000/ring.png",
          },
        })
        .catch((err) => {
          console.log(err);
        });
    }),
});
