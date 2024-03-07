import { sql, relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { products } from "./inventory";
import { users } from "./users";
import { invoice } from "./invoice";
import { customer, order } from ".";

export const company = pgTable("company", {
  id: serial("id").primaryKey(),
  legalname: text("legalname").notNull(),
  businessname: text("businessname").notNull(),
  GSTIN: text("GSTIN").notNull(),
  pan: text("pan").notNull(),
  createdById: varchar("createdById", { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const companyRelations = relations(company, ({ one,many }) => ({
  products: many(products),
  // order: one(products, { fields: [company.id], references: [products.id] }),
  users: one(users, { fields: [company.id], references: [users.id] }),
  invoice: many(invoice),
  customer: many(customer),
  order: many(order),
}));

export const insertCompanySchema = createInsertSchema(company);
export const selectCompanySchema = createSelectSchema(company);
