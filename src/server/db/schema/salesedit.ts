import {
  timestamp,
  pgTable,
  text,
  integer,
  doublePrecision,
  serial,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { company } from "./company";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const salesedit = pgTable("order", {
  id: serial("id").notNull().primaryKey(),
  companyId: integer("company_id")
    .references(() => company.id)
    .notNull(),
  legalname: text("legalname").notNull(),
  businessname: text("businessname").notNull(),
  gstin: text("gstin").notNull(),
  custaddress: text("custaddress").notNull(),
  pno: integer("pno").notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  hsn: doublePrecision("hsn").notNull(),
  quantity: integer("quantity").notNull(),
  price: doublePrecision("price").notNull(),
  gst: doublePrecision("gst").notNull(),
  cgst: doublePrecision("cgst").notNull(),
  taxableamount: doublePrecision("taxableamount").notNull(),
  amount: doublePrecision("total").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

//   export const orderRelations = relations(order, ({ one }) => ({
//     company: one(company, { fields: [order.id], references: [company.id] }),
//   }));

export const insertSalesSchema = createInsertSchema(salesedit, {
  pno: z.coerce.number(),
  price: z.coerce.number(),
  hsn: z.coerce.number(),
  quantity: z.coerce.number(),
  taxableamount: z.coerce.number(),
  gst: z.coerce.number(),
  cgst: z.coerce.number(),
  amount: z.coerce.number(),
});

export const selectSalesSchema = createSelectSchema(salesedit, {
  pno: z.coerce.number(),
  price: z.coerce.number(),
  hsn: z.coerce.number(),
  quantity: z.coerce.number(),
  taxableamount: z.coerce.number(),
  gst: z.coerce.number(),
  cgst: z.coerce.number(),
  amount: z.coerce.number(),
});
