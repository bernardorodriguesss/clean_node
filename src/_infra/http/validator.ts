import { ZodType, z } from 'zod';
import { IRequest } from './context';
import { Either, failure, success } from '@/src/_lib/either';
import { BadRequest } from '@/src/_lib/errors';

interface Schemas {
	body?: ZodType<any>;
	query?: ZodType<any>;
	params?: ZodType<any>;
	headers?: ZodType<any>;
}

type Response<T> = Either<BadRequest, z.infer<T>>;

export function validateData<S extends Schemas>(schemas: S) {
	const validator =
		<K extends keyof Schemas>(key: K) =>
		(request: IRequest): Response<S[K]> => {
			const schema = schemas[key];
			if (!schema) return request[key];

			const result = schema.safeParse(request[key]);

			if (!result.success) {
				return failure(new BadRequest('Bad Request'));
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
