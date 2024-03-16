import {
    createTRPCRouter,
    protectedProcedure,
  } from "@/server/api/trpc";
  import {
    insertSalesproductsSchema,
    salesproducts,
    selectProductSchema,
    selectSalesproductsSchema,
  } from "@/server/db/schema";
  import { desc, eq } from "drizzle-orm";
import { z } from "zod";
  
  const id = selectSalesproductsSchema.pick({ id: true });
  
  export const salesproductRouter = createTRPCRouter({
    create: protectedProcedure
    .input(insertSalesproductsSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(salesproducts).values({
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
        return await ctx.db.query.salesproducts.findMany({
          orderBy: [desc(salesproducts.createdAt)],
          where: eq(salesproducts.companyId, (input.companyId)),
        });
      }),
    update: protectedProcedure
      .input(selectSalesproductsSchema)
      .mutation(async ({ ctx, input }) => {
        await ctx.db.update(salesproducts).set(input).where(eq(salesproducts.id, input.id));
      }),
    delete: protectedProcedure.input(id).mutation(async ({ ctx, input }) => {
      await ctx.db.delete(salesproducts).where(eq(salesproducts.id, input.id));
    }),
  });
  