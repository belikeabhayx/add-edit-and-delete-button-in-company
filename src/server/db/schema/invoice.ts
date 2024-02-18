import { relations, sql } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  doublePrecision,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

export const paymentStatus = pgEnum("paymentStatus", ["Paid", "Unpaid"]);

export const invoice = pgTable("invoice", {
  id: text("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  customername: text("customername").notNull(),
  invoiceamount: doublePrecision("invoiceamount").notNull(),
  balancedue: doublePrecision("balancedue").notNull(),
  status: paymentStatus("status").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const invoiceRelations = relations(invoice, ({ many }) => ({
  user: many(users),
}));


export const selectInvoiceSchema = createSelectSchema(invoice);
export const insertInvoiceSchema = createInsertSchema(invoice);

// drizzle-orm
