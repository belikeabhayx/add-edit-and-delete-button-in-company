import { sql } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  index,
  varchar,
  doublePrecision,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const paymentStatus = pgEnum("paymentStatus", ["Paid", "Unpaid"]);

export const invoices = pgTable("invoices", {
  invoice: text("invoice")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  customername: text("customername").notNull(),
  invoiceamount: doublePrecision("invoiceamount").notNull(),
  balancedue: doublePrecision("balancedue").notNull(),
  paymentstatus: doublePrecision("paymentstatus").notNull(),
  status: paymentStatus("status").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const selectInvoiceSchema = createSelectSchema(invoices);
export const insertInvoiceSchema = createInsertSchema(invoices);

// drizzle-orm
