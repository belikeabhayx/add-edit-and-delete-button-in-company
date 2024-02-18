import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "@/server/api/trpc";
  import {
    insertfinalSchema,
    final,
    selectfinalSchema,
  } from "@/server/db/schema";
  import { desc, eq } from "drizzle-orm";
  
  const id = selectfinalSchema.pick({ id: true });
  
  export const finalRouter = createTRPCRouter({
    createOrUpdate: protectedProcedure
      .input(insertfinalSchema)
      .mutation(async ({ ctx, input }) => {
        if (input.id) {
          await ctx.db
            .update(final)
            .set(input)
            .where(eq(final.id, input.id));
        } else {
          await ctx.db.insert(final).values(input);
        }
      }),
    read: publicProcedure.query(async ({ ctx }) => {
      return await ctx.db.query.final.findMany({
        orderBy: [desc(final.createdAt)],
      });
    }),
    update: protectedProcedure
      .input(selectfinalSchema)
      .mutation(async ({ ctx, input }) => {
        await ctx.db.update(final).set(input).where(eq(final.id, input.id));
      }),
    delete: protectedProcedure.input(id).mutation(async ({ ctx, input }) => {
      await ctx.db.delete(final).where(eq(final.id, input.id));
    }),
  });
  