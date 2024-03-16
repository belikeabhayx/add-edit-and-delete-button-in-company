
import { createTRPCRouter } from "@/server/api/trpc";
import { companyRouter } from "./routers/company";
import { inventoryRouter } from "./routers/inventory";
import { customerRouter } from "./routers/customer";
import { invoiceRouter } from "./routers/invoice";
import { orderRouter } from "./routers/order";
import { saleseditRouter } from "./routers/salesedit";
import { salesproductRouter } from "./routers/salesproduct";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  company      :  companyRouter,
  inventory    :  inventoryRouter,
  customer     :  customerRouter,
  invoice      :  invoiceRouter,
  order        :  orderRouter,
  salesedit    :  saleseditRouter,
  salesproduct :  salesproductRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
