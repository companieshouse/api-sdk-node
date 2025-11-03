export declare type Result<S, F> = Success<S, F> | Failure<S, F>;
export declare class Failure<S, F> {
    readonly value: F;
    constructor(value: F);
    isFailure(): this is Failure<S, F>;
    isSuccess(): this is Success<S, F>;
}
export declare class Success<S, F> {
    readonly value: S;
    constructor(value: S);
    isFailure(): this is Failure<S, F>;
    isSuccess(): this is Success<S, F>;
}
export declare const failure: <S, F>(f: F) => Result<S, F>;
export declare const success: <S, F>(s: S) => Result<S, F>;
