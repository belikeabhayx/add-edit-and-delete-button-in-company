import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { insertInvoiceSchema, invoice, selectInvoiceSchema } from "@/server/db/schema/invoice";
import { desc, eq } from "drizzle-orm";

const id = selectInvoiceSchema.pick({ id: true });
// yeh add krne se last line ka error kaise gayab hogya

export const invoiceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(invoice).values({
        customername: input.customername,
        invoiceamount: input.invoiceamount,
        balancedue: input.balancedue,
        paymentstatus: input.paymentstatus,
        status: input.status,
      });
    }),
  read: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.invoice.findMany({
      orderBy: [desc(invoice.createdAt)],
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
      await ctx.db.update(invoice).set(input).where(eq(invoice.id, input.id || ''));
    }),
  delete: protectedProcedure
    .input(id)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(invoice).where(eq(invoice.id, input.id));
    }),
});
