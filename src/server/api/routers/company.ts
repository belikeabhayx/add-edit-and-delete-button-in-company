import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  company,
  insertCompanySchema,
  selectCompanySchema,
} from "@/server/db/schema";
import { CompanySchema } from "@/lib/validations/auth";
import { eq } from "drizzle-orm";


const id = selectCompanySchema.pick({ id: true });
// yeh add krne se last line ka error kaise gayab hogya

export const companyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CompanySchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(company).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),
  read: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.query.company.findMany();
  }),
  createOrUpdate: protectedProcedure
    .input(insertCompanySchema)
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.db.update(company).set(input).where(eq(company.id, input.id));
      } else {
        await ctx.db.insert(company).values(input);
      }
    }),
  update: protectedProcedure
    .input(selectCompanySchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(company).set(input).where(eq(company.id, input.id));
    }),
  delete: protectedProcedure
    .input(id)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(company).where(eq(company.id, input.id));
    }),
});
