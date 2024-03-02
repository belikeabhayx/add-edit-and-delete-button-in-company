import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "@/server/api/trpc";
  import {
    insertProductSchema,
    products,
    selectProductSchema,
  } from "@/server/db/schema";
  import { desc, eq } from "drizzle-orm";
import { z } from "zod";
  
  const id = selectProductSchema.pick({ id: true });
  
  export const inventoryRouter = createTRPCRouter({
    create: protectedProcedure
    .input(insertProductSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(products).values({
        name: input.name, 
        companyId: input.companyId,
        hsn:   input.hsn, 
        quantity: input.quantity, 
        price: input.price, 
        gst: input.gst, 
        cgst: input.cgst,
        taxableamount: input.taxableamount, 
        amount: input.amount, 
      });
    }),
      read: protectedProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await ctx.db.query.products.findMany({
          orderBy: [desc(products.createdAt)],
          where: eq(products.companyId, (input.companyId)),
        });
      }),
    update: protectedProcedure
      .input(selectProductSchema)
      .mutation(async ({ ctx, input }) => {
        await ctx.db.update(products).set(input).where(eq(products.id, input.id));
      }),
    delete: protectedProcedure.input(id).mutation(async ({ ctx, input }) => {
      await ctx.db.delete(products).where(eq(products.id, input.id));
    }),
  });
  