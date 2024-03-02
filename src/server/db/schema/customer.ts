import { relations, sql } from "drizzle-orm";
import { timestamp, pgTable, text, integer, serial } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { company } from "./company";

export const customer = pgTable("customer", {
  id: serial("id")
    .notNull()
    .primaryKey(),
  companyId: integer("company_id")
    .references(() => company.id)
    .notNull(),
  legalname: text("legalname").notNull(),
  businessname: text("businessname").notNull(),
  gstin: text("gstin").notNull(),
  pno: integer("pno").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const customerRelations = relations(customer, ({ one }) => ({
  company: one(company, {fields: [customer.companyId],references: [company.id],}),
}));

export const insertCustomerSchema = createInsertSchema(customer, {
  pno: z.coerce.number(),
});

export const selectCustomerSchema = createSelectSchema(customer, {
  pno: z.coerce.number(),
});
