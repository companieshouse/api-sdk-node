"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestIdHeader = void 0;
const config_1 = require("./config");
/**
 * Adds a Request ID header to the existing headers, if the Request ID is provided.
 *
 * The Request ID header is utilised to correlate requests between services, allowing
 * for easier tracking of how requests propagate through a system of microservices.
 * It is also used as a context key for logger systems to maintain tracing information
 * across service calls.
 *
 * @param {string | undefined} requestId The unique identifier for the request, used for tracing.
 * @param {Headers} otherHeaders Existing set of headers to which the Request ID header will be added.
 * @returns {Headers | undefined} A new headers object with the Request ID added, or undefined if no Request ID was provided.
 */
function addRequestIdHeader(requestId, otherHeaders = {}) {
    if (requestId === undefined) {
        return undefined;
    }
    otherHeaders = otherHeaders !== undefined ? otherHeaders : {};
    return Object.assign(Object.assign({}, otherHeaders), { [config_1.REQUEST_ID_HEADER]: requestId });
}
exports.addRequestIdHeader = addRequestIdHeader;
//# sourceMappingURL=util.js.map