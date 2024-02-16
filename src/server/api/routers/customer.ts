import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  customer,
  insertCustomerSchema,
  selectCompanySchema,
  selectCustomerSchema,
} from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";


const id = selectCustomerSchema.pick({ id: true });
// yeh add krne se last line ka error kaise gayab hogya

export const customerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(customer).values({
        legalname: input.legalname,  
        businessname: input.businessname,
        gstin: input.gstin,
        pno: input.pno,  
        email: input.email,
      });
    }),
  read: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.customer.findMany({
      orderBy: [desc(customer.createdAt)],
    });
  }),
  createOrUpdate: protectedProcedure
    .input(insertCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.db.update(customer).set(input).where(eq(customer.id, input.id));
      } else {
        await ctx.db.insert(customer).values(input);
      }
    }),
  // update: protectedProcedure
  //   .input(insertCustomerSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.update(customer).set(input).where(eq(customer.id, input.id));
  //   }),
  delete: protectedProcedure
    .input(id)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(customer).where(eq(customer.id, input.id));
    }),
});
