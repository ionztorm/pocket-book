import { APIError } from 'better-auth/api';
import { type BetterAuthPlugin, createAuthMiddleware } from 'better-auth/plugins';
import { ZodSchema } from 'zod';

export type Validator = {
	validate: (userInput: unknown) => Promise<void>;
};

export type Validation = {
	path: string;
	validator: Validator;
};

export const inputValidator = (schema: ZodSchema): Validator => ({
	validate: async (data: unknown) => {
		const parsedData = schema.safeParse(data);
		if (!parsedData.success) {
			throw parsedData.error.errors;
		}
	},
});

export const userInputValidation = (validations: Validation[]): BetterAuthPlugin => {
	const middlewares = validations.map(({ path, validator }) => ({
		path,
		middleware: createAuthMiddleware(async (ctx) => {
			try {
				await validator.validate(ctx.body);
			} catch (error) {
				throw new APIError('BAD_REQUEST', {
					message: 'Inputted data failed to validate',
					issues: error,
				});
			}
		}),
	}));
	return {
		id: 'user-input-validation',
		middlewares,
	};
};
