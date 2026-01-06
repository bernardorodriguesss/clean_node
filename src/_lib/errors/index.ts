export class BaseError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

export class BadRequest extends BaseError {
	constructor(message: string) {
		super(400, message);
	}
}

export class Unauthorized extends BaseError {
	constructor(message: string) {
		super(401, message);
	}
}

export class NotFound extends BaseError {
	constructor(message: string) {
		super(404, message);
	}
}

export class Conflict extends BaseError {
	constructor(message: string) {
		super(409, message);
	}
}
