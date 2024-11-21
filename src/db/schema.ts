import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name').notNull(),
	lastName: varchar('last_name').notNull(),
	email: varchar('email').unique().notNull(),
	avatarUrl: varchar('avatar_url'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const projects = pgTable('projects', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const todos = pgTable('todos', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull(),
	description: text('description'),
	dueDate: timestamp('due_date').notNull(),
	completed: boolean('completed').notNull().default(false),
	projectId: integer('project_id')
		.notNull()
		.references(() => projects.id),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
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
