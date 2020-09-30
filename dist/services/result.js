"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.failure = (f) => {
    return new Failure(f);
};
exports.success = (s) => {
    return new Success(s);
};
//# sourceMappingURL=result.js.map