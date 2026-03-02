"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPackageType = void 0;
const packageTypes = [
    "uksef",
    "cic",
    "welsh",
    "limited-partnership",
    "group-package-400",
    "group-package-401",
    "overseas",
    "audit-exempt-subsidiary",
    "filing-exempt-subsidiary"
];
function isPackageType(o) {
    return packageTypes.includes(o);
}
exports.isPackageType = isPackageType;
//# sourceMappingURL=types.js.map