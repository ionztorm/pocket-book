import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { user } from './auth';

export const projects = pgTable('projects', {
	id: text().primaryKey(),
	name: varchar().notNull(),
	userId: text()
		.notNull()
		.references(() => user.id),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const todos = pgTable('todos', {
	id: text().primaryKey(),
	title: varchar().notNull(),
	description: text(),
	dueDate: timestamp().notNull(),
	completed: boolean().notNull().default(false),
	projectId: text()
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
export const usersRelations = relations(user, ({ many }) => ({ projects: many(projects) }));

// A project may have many todos and belongs to one user
export const projectRelations = relations(projects, ({ many, one }) => ({
	todos: many(todos),
	user: one(user, {
		fields: [projects.userId],
		references: [user.id],
	}),
}));

// A todo belongs to one project
export const todoRelations = relations(todos, ({ one }) => ({
	project: one(projects, {
		fields: [todos.projectId],
		references: [projects.id],
	}),
}));
