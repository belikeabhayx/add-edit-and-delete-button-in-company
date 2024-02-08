import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  customer,
  insertCustomerSchema,
  selectCompanySchema,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";


const id = selectCompanySchema.pick({ id: true });
// yeh add krne se last line ka error kaise gayab hogya

export const customerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(customer).values({
        title: input.title,
        Pno: input.Pno,
      });
    }),
//   read: protectedProcedure.query(async ({ ctx, input }) => {
//     return await ctx.db.query.company.findMany();
//   }),
  createOrUpdate: protectedProcedure
    .input(insertCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.db.update(customer).set(input).where(eq(customer.id, input.id));
      } else {
        await ctx.db.insert(customer).values(input);
      }
    }),
//   update: protectedProcedure
//     .input(insertCustomerSchema)
//     .mutation(async ({ ctx, input }) => {
//       await ctx.db.update(company).set(input).where(eq(company.id, input.id));
//     }),
//   delete: protectedProcedure
//     .input(id)
//     .mutation(async ({ ctx, input }) => {
//       await ctx.db.delete(company).where(eq(company.id, input.id));
//     }),
});
