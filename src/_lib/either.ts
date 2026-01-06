class Success<L, R> {
    constructor(readonly value: R) {}

    isSuccess(): this is Success<L, R> {
        return true;
    }

    isFailure(): this is Failure<L, R> {
        return false;
    }
}

class Failure<L, R> {
    constructor(readonly error: L) {}

    isSuccess(): this is Success<L, R> {
        return false;
    }

    isFailure(): this is Failure<L, R> {
        return true;
    }
}

export function success<L, R>(value: R): Success<L, R> {
    return new Success(value);
}

export function failure<L, R>(error: L): Failure<L, R> {
    return new Failure(error);
}

export type Either<L, R> = Failure<L, R> | Success<L, R>;
