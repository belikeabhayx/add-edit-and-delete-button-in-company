import { relations, sql } from "drizzle-orm";
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
import { createInsertSchema } from "drizzle-zod";
import { users } from "./users";
import { z } from "zod";

export const customer = pgTable("customer", {
    id: text("id")
      .default(sql`gen_random_uuid()`)
      .notNull()
      .primaryKey(),
    legalname: text("legalname").notNull(),
    businessname: text("businessname").notNull(),
    gstin: text("gstin").notNull(),
    pno: integer("pno").notNull(),
    email:text("email").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  });
  
  export const customerRelations = relations(customer, ({ one }) => ({
    user: one(users, { fields: [customer.id], references: [users.id] }),
  }));
  
  export const insertCustomerSchema = createInsertSchema(customer,{
    pno : z.coerce.number(),
  });