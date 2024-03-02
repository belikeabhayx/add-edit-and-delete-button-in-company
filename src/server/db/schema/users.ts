import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { accounts, company } from ".";

export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
  });
  
  export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    company: many(company),
  }));
  