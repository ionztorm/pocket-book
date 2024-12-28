# Pocket Book

Personal organiser - simple, but efficient.

## Features

- Todo task management
- Finance organiser

## Tech Stack

### Dev Stack

- [NextJS](https://nextjs.org/docs)
- [Tailwind CSS](https://v2.tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/docs)
- [Neon db](https://neon.tech/docs/get-started-with-neon/why-neon)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)
- [Better Auth](https://www.better-auth.com/docs/introduction)
- [Zod](https://zod.dev/)

Coded using:

- [Ghostty Terminal](https://github.com/ghostty-org)
- [Neovim](https://neovim.io/)

## Progress

- ✅ NextJS Setup
- ✅ Folder Structure
- ✅ Dashboard layout
- ✅ Database Setup
  - ✅ Schemas
  - ✅ Connectivity test
- Authentication
  - Username & Password
    - ✅ Registration
    - ✅ Login
    - ✅ Email Verification
    - Password Reset
  - ✅ Github OAuth
  - ✅ Google OAuth
- Payments
  - Implement Stripe
- Authorisation
  - ✅ Implement Middleware
    - ✅ Protect dashboards
    - ✅ Redirect to dashboard if logged in and accessing /auth pages
    - Redirect to payment if logged in, not paid, and accessing /dashboard
- Todo layout
- Finance layout

## Issues Faced

### 1) Deprecated drizzle api provided in AuthJS drizzle adaptor example in docs

The Auth.JS documentation provides example schema for setup with drizzle. Upon pasting this example
into my codebase, warnings were displayed that the third parameter of Drizzle ORM being an Object
had been deprecated and was now to be of an array type. This change was introduced in drizzle
0.36.0. Unfortunately, this change was not yet reflected in the Drizzle docs, but you can find some
information about it [here](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.36.0).

After fixing this issue, I submitted a PR to update the AuthJS docs
[here](https://github.com/nextauthjs/next-auth/pull/12285).

### 2) Type Validating environment variables

I discovered that validating environment variables is difficult in Next JS, and that's because
they're not available on the client by default. The result is that I had to create separate
validation methods for both server and client. I spent a good 5 hours trying to resolve an issue
related to this before realising... I don't actually need the env variable on the client.

Definitely something to look into in a bit more detail later.

### 3) Better Auth data input validation

Better Auth provides a way to register/login using client-side API functions such as
`authClient.signUp.email`. While this function does, by default, perform some validation before
inserting the submitted data into the database / performing server side actions, the validations
performed are not as stringent as I'd like. I did build a plugin that would allow validation to take
place before hitting the database, but I felt that this was not a sustainable approach given the
plugin would only work with Better Auth, and there may come a time in the future where I want to
change the auth library.

As such, I chose to perform client-side validation with React-Hook-Form, and within it's onSubmit
event handler, call a server action which performs additional validation. This helps avoid malicious
persons bypassing the front-end with something like Postman.

### 4) Better Auth email verification and Next.js route intercepting

I did at create an intercepting route using Next.js parallel and intercepting routes, but I found that the shadcn dialog component did not want to play ball - it would close and redirect back to the landing page if the user cancelled login or registration but would not close automatically on successful login or registration, but success redirect to dashboard still worked in the background. The user would have to manually close the dialog, which resulted in a redirect back to the landing page. Not a great experience.

Additionally, I had problems getting the OTP email verification to work. This turned out to be a problem with the Better Auth OTP plugin. After speaking with the maintainers, we were able to resolve the issue, fix the plugin, and get that merged into the next release.

I may return to re-intrduces the intercepting route at a later date as I have now got this working in my Next.js testging repo, but for now, I'm happy with the current setup.
