import { createAuthMiddleware } from 'better-auth/plugins';

export const validateInputs = {
	id: 'validate-inputs',
	middleware: [
		{
			path: '/auth',
			middleware: createAuthMiddleware(async (ctx) => {
				console.log(ctx);
			}),
		},
	],
};
