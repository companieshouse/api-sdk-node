"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
class Mapping {
    static camelCaseKeys(input) {
        return camelcase_keys_1.default(input, { deep: true });
    }
    static snakeCaseKeys(input) {
        return snakecase_keys_1.default(input, { deep: true });
    }
}
exports.default = Mapping;
//# sourceMappingURL=mapping.js.map