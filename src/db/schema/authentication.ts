import { type SQL, sql } from 'drizzle-orm';
import {
	type AnyPgColumn,
	boolean,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp, //uniqueIndex,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

export function lower(email: AnyPgColumn): SQL {
	return sql`lower(${email})`;
}
const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable('user', {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text(),
	email: text().unique(),
	emailVerified: timestamp({ mode: 'date' }),
	password: text(),
	image: text(),
	role: roleEnum().notNull().default('user'),
});

export const accounts = pgTable(
	'account',
	{
		userId: text()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text().$type<AdapterAccountType>().notNull(),
		provider: text().notNull(),
		providerAccountId: text().notNull(),
		refresh_token: text(),
		access_token: text(),
		expires_at: integer(),
		token_type: text(),
		scope: text(),
		id_token: text(),
		session_state: text(),
	},
	(account) => [
		primaryKey({
			columns: [account.provider, account.providerAccountId], // Specify columns as an array.
			name: 'provider_providerAccountId_pk', // Optional: name for the primary key.
		}),
	],
);

export const sessions = pgTable('session', {
	sessionToken: text().primaryKey(),
	userId: text()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp({ mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text().notNull(),
		token: text().notNull(),
		expires: timestamp({ mode: 'date' }).notNull(),
	},
	(verificationToken) => [
		primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	],
);

export const authenticators = pgTable(
	'authenticator',
	{
		credentialID: text().notNull().unique(),
		userId: text()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		providerAccountId: text().notNull(),
		credentialPublicKey: text().notNull(),
		counter: integer().notNull(),
		credentialDeviceType: text().notNull(),
		credentialBackedUp: boolean().notNull(),
		transports: text(),
	},
	(authenticator) => [
		primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	],
);
