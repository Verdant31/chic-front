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
});
