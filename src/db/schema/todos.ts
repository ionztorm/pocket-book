import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from './authentication';

export const projects = pgTable('projects', {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: varchar().notNull(),
	userId: text()
		.notNull()
		.references(() => users.id),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const todos = pgTable('todos', {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: varchar().notNull(),
	description: text(),
	dueDate: timestamp().notNull(),
	completed: boolean().notNull().default(false),
	projectId: integer()
		.notNull()
		.references(() => projects.id),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

// relations

// A user may have many projects
export const usersRelations = relations(users, ({ many }) => ({ projects: many(projects) }));

// A project may have many todos and belongs to one user
export const projectRelations = relations(projects, ({ many, one }) => ({
	todos: many(todos),
	user: one(users, {
		fields: [projects.userId],
		references: [users.id],
	}),
}));

// A todo belongs to one project
export const todoRelations = relations(todos, ({ one }) => ({
	project: one(projects, {
		fields: [todos.projectId],
		references: [projects.id],
	}),
}));
