"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("../result");
const mapping_1 = __importDefault(require("../../mapping/mapping"));
class default_1 {
    constructor() { }
    processResponse(resp) {
        if (resp.error) {
            const error = {
                httpStatusCode: resp.status,
                errors: this.buildErrors(resp.error)
            };
            return result_1.failure(error);
        }
        else {
            return result_1.success({
                httpStatusCode: resp.status,
                headers: resp.headers,
                resource: resp.body
            });
        }
    }
    buildErrors(errors) {
        if (typeof errors === "string") {
            const ret = {
                error: errors
            };
            return [ret];
        }
        else if (errors.errors) {
            return errors.errors.reduce((previousValue, currentValue) => {
                return [...previousValue, mapping_1.default.camelCaseKeys(currentValue)];
            }, []);
        }
        else {
            return [];
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=util.js.map