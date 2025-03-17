"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
class Mapping {
    static camelCaseKeys(input, options = { deep: true }) {
        return camelcase_keys_1.default(input, options);
    }
    static snakeCaseKeys(input, options = { deep: true }) {
        return snakecase_keys_1.default(input, options);
    }
}
exports.default = Mapping;
//# sourceMappingURL=mapping.js.map