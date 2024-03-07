import {
  timestamp,
  pgTable,
  text,
  integer,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { company } from "./company";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations, sql } from "drizzle-orm";

export const order = pgTable("order", {
id: text("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  companyId: integer("company_id")
    .references(() => company.id)
    .notNull(),
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

export const orderRelations = relations(order, ({ one }) => ({
  company: one(company, { fields: [order.id], references: [company.id] }),
}));

export const insertorderSchema = createInsertSchema(order, {
  price: z.coerce.number(),
  hsn: z.coerce.number(),
  quantity: z.coerce.number(),
  taxableamount: z.coerce.number(),
  gst: z.coerce.number(),
  cgst: z.coerce.number(),
  amount: z.coerce.number(),
});

export const selectorderSchema = createSelectSchema(order, {
  price: z.coerce.number(),
  hsn: z.coerce.number(),
  quantity: z.coerce.number(),
  taxableamount: z.coerce.number(),
  gst: z.coerce.number(),
  cgst: z.coerce.number(),
  amount: z.coerce.number(),
});
