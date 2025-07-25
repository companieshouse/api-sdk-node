"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalRoute = exports.AssociationStatus = void 0;
var AssociationStatus;
(function (AssociationStatus) {
    AssociationStatus["CONFIRMED"] = "confirmed";
    AssociationStatus["REMOVED"] = "removed";
    AssociationStatus["AWAITING_APPROVAL"] = "awaiting-approval";
    AssociationStatus["MIGRATED"] = "migrated";
    AssociationStatus["UNAUTHORISED"] = "unauthorised";
})(AssociationStatus = exports.AssociationStatus || (exports.AssociationStatus = {}));
var ApprovalRoute;
(function (ApprovalRoute) {
    ApprovalRoute["AUTH_CODE"] = "auth_code";
    ApprovalRoute["INVITATION"] = "invitation";
})(ApprovalRoute = exports.ApprovalRoute || (exports.ApprovalRoute = {}));
//# sourceMappingURL=types.js.map