import { relations, sql } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  doublePrecision,
  pgEnum,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";
import { company } from "./company";

export const paymentStatus = pgEnum("paymentStatus", ["Paid", "Unpaid"]);

export const invoice = pgTable("invoice", {
  id: serial("id")
    .notNull()
    .primaryKey(),
  companyId: integer("company_id")
    .references(() => company.id)
    .notNull(),
  customername: text("customername").notNull(),
  invoiceamount: doublePrecision("invoiceamount").notNull(),
  balancedue: doublePrecision("balancedue").notNull(),
  status: paymentStatus("status").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const invoiceRelations = relations(invoice, ({ one }) => ({
  company: one(company, {
    fields: [invoice.companyId],
    references: [company.id],
  }),
}));


export const selectInvoiceSchema = createSelectSchema(invoice);
export const insertInvoiceSchema = createInsertSchema(invoice);

// drizzle-orm
