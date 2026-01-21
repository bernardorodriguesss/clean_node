import { IHttpContext } from './adapters/context';
import { BaseError, ValidationError } from '@/src/_lib/errors';

export function ok<T>(ctx: IHttpContext, data: T) {
	ctx.send(200, data);
}

export function created<T>(ctx: IHttpContext, data: T) {
	ctx.send(201, data);
}

export function noContent(ctx: IHttpContext) {
	ctx.send(204, null);
}

export function validationError(ctx: IHttpContext, error: ValidationError) {
	const { message, errors } = error;
	ctx.send(400, {
		message: message,
		errors: errors,
	});
}

export function unauthorized(ctx: IHttpContext, error: BaseError | string) {
	const message = error instanceof BaseError ? error.message : error;
	ctx.send(401, { message: message });
}

export function forbidden(ctx: IHttpContext, error: BaseError) {
	ctx.send(403, { message: error.message });
}

export function notFound(ctx: IHttpContext, error: BaseError) {
	ctx.send(404, { message: error.message });
}

export function conflict(ctx: IHttpContext, error: BaseError) {
	ctx.send(409, { message: error.message });
}

export function serverError(ctx: IHttpContext, error?: unknown) {
	console.error(error);
	ctx.send(500, { message: 'Internal Server Error' });
}
