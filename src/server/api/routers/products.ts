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
  
  const id = selectProductSchema.pick({ id: true });
  
  export const productRouter = createTRPCRouter({
    createOrUpdate: protectedProcedure
      .input(insertProductSchema)
      .mutation(async ({ ctx, input }) => {
        if (input.id) {
          await ctx.db
            .update(products)
            .set(input)
            .where(eq(products.id, input.id));
        } else {
          await ctx.db.insert(products).values(input);
        }
      }),
    read: publicProcedure.query(async ({ ctx }) => {
      return await ctx.db.query.products.findMany({
        orderBy: [desc(products.createdAt)],
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
  