import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  index,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";

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

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const company = pgTable(
  "company",
  {
     id: serial("id").primaryKey(),
     name: text("name").notNull(),
     createdById: varchar("createdById", { length: 255 })
       .notNull()
       .references(() => users.id),
     createdAt: timestamp("created_at")
       .default(sql`CURRENT_TIMESTAMP`)
       .notNull(),
     updatedAt: timestamp("updatedAt"),
  }
 );

export const companyRelations = relations(company, ({ one }) => ({
  user: one(users, { fields: [company.id], references: [users.id] }),
}));


// drizzle-orm
// drizzle-kit

// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

// Table companies {
//   id integer
//   name integer
//   created_at timestamp
// }

// Table invoices {
//   id integer [primary key]
//   title varchar
//   amount varchar
//   company_id integer
//   created_at timestamp
// }

// Table clients {
//   id integer [primary key]
//   name varchar
//   created_at timestamp
// }

// Table companies_clients {
//   id integer [primary key]
//   client_id integer
//   company_id integer
// }

// Ref: invoices.company_id - companies.id // one-to-one
// Ref: companies_clients.client_id <> clients.id // many-to-many
// Ref: companies_clients.company_id <> companies.id // many-to-many
