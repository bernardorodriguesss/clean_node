import { ZodType, z } from 'zod';

import { IRequest } from './adapters/context';
import { ValidationError } from '@/src/_lib/errors';
import { Either, failure, success } from '@/src/_lib/either';

interface Schemas {
	body?: ZodType<any>;
	query?: ZodType<any>;
	params?: ZodType<any>;
	headers?: ZodType<any>;
}

type Response<T> = Either<ValidationError, z.infer<T>>;

export function validateData<S extends Schemas>(schemas: S) {
	const validator =
		<K extends keyof Schemas>(key: K) =>
		(request: IRequest): Response<S[K]> => {
			const schema = schemas[key];
			if (!schema) return request[key];

			const result = schema.safeParse(request[key]);

			if (!result.success) {
				const errors = result.error.issues.map((issue) => ({
					path: issue.path.join('.'),
					code: issue.code,
					message: issue.message,
				}));
				return failure(new ValidationError(errors));
			}

			return success(result.data);
		};

	return {
		body: validator('body'),
		query: validator('query'),
		params: validator('params'),
		headers: validator('headers'),
	};
}
