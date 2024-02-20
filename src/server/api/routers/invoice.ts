import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { insertInvoiceSchema, invoice, selectInvoiceSchema } from "@/server/db/schema/invoice";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const id = selectInvoiceSchema.pick({ id: true });
// yeh add krne se last line ka error kaise gayab hogya

export const invoiceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(invoice).values({
        companyId: input.companyId, 
        customername: input.customername, 
        invoiceamount: input.invoiceamount, 
        balancedue: input.balancedue, 
        status: input.status,
      });
    }),
  read: protectedProcedure
    .input(z.object({ companyId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.invoice.findMany({
        orderBy: [desc(invoice.createdAt)],
        where: eq(invoice.companyId, (input.companyId)),
      });
    }),
  createOrUpdate: protectedProcedure
    .input(insertInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.db.update(invoice).set(input).where(eq(invoice.id, input.id));
      } else {
        await ctx.db.insert(invoice).values(input);
      }
    }),
  update: protectedProcedure
    .input(insertInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(invoice).set(input).where(input.id ? eq(invoice.id, input.id) : undefined);
    }),
  delete: protectedProcedure
    .input(id)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(invoice).where(eq(invoice.id, input.id));
    }),
});
