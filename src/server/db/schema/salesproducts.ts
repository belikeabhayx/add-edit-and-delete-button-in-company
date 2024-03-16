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
  import { relations } from "drizzle-orm";
  
  export const salesproducts = pgTable("salesproducts", {
    id: serial("id")
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
  
  export const salesproductsRelations = relations(salesproducts, ({ many }) => ({
    company: many(company),
  }));
  
  export const insertSalesproductsSchema = createInsertSchema(salesproducts, {
    price: z.coerce.number(),
    hsn: z.coerce.number(),
    quantity: z.coerce.number(),
    taxableamount: z.coerce.number(),
    gst: z.coerce.number(),
    cgst: z.coerce.number(),
    amount: z.coerce.number(),
  });
  
  export const selectSalesproductsSchema = createSelectSchema(salesproducts, {
    price: z.coerce.number(),
    hsn: z.coerce.number(),
    quantity: z.coerce.number(),
    taxableamount: z.coerce.number(),
    gst: z.coerce.number(),
    cgst: z.coerce.number(),
    amount: z.coerce.number(),
  });
  