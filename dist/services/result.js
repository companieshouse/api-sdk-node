"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.failure = exports.Success = exports.Failure = void 0;
class Failure {
    constructor(value) {
        this.value = value;
    }
    isFailure() {
        return true;
    }
    isSuccess() {
        return false;
    }
}
exports.Failure = Failure;
class Success {
    constructor(value) {
        this.value = value;
    }
    isFailure() {
        return false;
    }
    isSuccess() {
        return true;
    }
}
exports.Success = Success;
const failure = (f) => {
    return new Failure(f);
};
exports.failure = failure;
const success = (s) => {
    return new Success(s);
};
exports.success = success;
//# sourceMappingURL=result.js.map