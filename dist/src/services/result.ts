/*
Result Either is a data type with two sides (constructors) - Success and Failure.
It is most commonly used for type safety error handling
*/
export type Result<S, F> = Success<S, F> | Failure<S, F>;

export class Failure<S, F> {
    constructor (readonly value: F) {}

    public isFailure (): this is Failure<S, F> {
        return true;
    }

    public isSuccess (): this is Success<S, F> {
        return false;
    }
}

export class Success<S, F> {
    constructor (readonly value: S) {}

    public isFailure (): this is Failure<S, F> {
        return false;
    }

    public isSuccess (): this is Success<S, F> {
        return true;
    }
}

export const failure = <S, F>(f: F): Result<S, F> => {
    return new Failure<S, F>(f);
};

export const success = <S, F>(s: S): Result<S, F> => {
    return new Success<S, F>(s);
};
