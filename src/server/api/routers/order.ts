import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  insertorderSchema,
  order,
  selectorderSchema,
} from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const id = selectorderSchema.pick({ id: true });

export const orderRouter = createTRPCRouter({
  createOrUpdate: protectedProcedure
    .input(insertorderSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.db
          .update(order)
          .set(input)
          .where(eq(order.id, input.id));
      } else {
        await ctx.db.insert(order).values(input);
      }
    }),
    read: protectedProcedure.query(async ({ ctx }) => {
      return await ctx.db.query.order.findMany({
        orderBy: [desc(order.createdAt)],
      });
    }),
  update: protectedProcedure
    .input(selectorderSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(order).set(input).where(eq(order.id, input.id));
    }),
  delete: protectedProcedure.input(id).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(order).where(eq(order.id, input.id));
  }),
});
