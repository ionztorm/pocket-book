# Pocket Book

Personal organiser - simple, but efficient.

## Features

- Todo task management
- Finance organiser

## Tech Stack

### Dev Stack

Brewed using Neovim editor in Ghostty terminal, run on BunJS and TypeScript, with Prettier
formatting and ESLint linting.

### Frontend

Next JS with Tailwind CSS for styling and Shadcn UI for components.

### Blend

Front and backend blended using Next JS 15 with React 19 server components and actions, and Zod
validations.

### Backend

Data poured into Neon PGSQL using Drizzle ORM, with authorisation handled by AuthJS. All casked and
stored on Vercel

## Progress:

- ✅ NextJS Setup
- ✅ Folder Structure
- ✅ Dashboard layout
- ✅ Database Setup
  - ✅ Schemas
  - ✅ Connectivity test
- Auth
  - Username & Password with email codes
  - Facebook OAuth
  - Google OAuth
- Todo layout
- Finance layout

## Issues Faced

### 1) Deprecated drizzle api provided in AuthJS drizzle adaptor example in docs.

The Auth.JS documentation provides example schema for setup with drizzle. Upon pasting this example
into my codebase, warnings were displayed that the third parameter of Drizzle ORM being an Object
had been deprecated and was now to be of an array type. Ths change was introduced in drizzle 0.36.0.
Unfortunitely, this change was not yet reflected in the Drizzle docs, but you can find some
information about it [here](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.36.0).

After fixing this issue, I submitted a PR to update the AuthJS docs
[here](https://github.com/nextauthjs/next-auth/pull/12285).
