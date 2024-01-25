import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { company } from "@/server/db/schema";
import { CompanySchema } from "@/lib/validations/auth";

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
});
