import { BaseError } from '@/src/_lib/errors';
import { IHttpContext } from './context';

export function created<T>(ctx: IHttpContext, data: T) {
	ctx.send(201, {
		data: data,
	});
}

export function ok<T>(ctx: IHttpContext, data: T) {
	ctx.send(200, {
		data: data,
	});
}

export function badRequest(ctx: IHttpContext, error: BaseError) {
	ctx.send(error.status, {
		message: error.message,
	});
}

export function conflict(ctx: IHttpContext, error: BaseError) {
	ctx.send(error.status, { message: error.message });
}

export function unauthorized(ctx: IHttpContext, error: BaseError) {
	ctx.send(error.status, { message: error.message });
}

export function serverError(ctx: IHttpContext) {
	ctx.send(500, { error: 'Internal Server Error' });
}
