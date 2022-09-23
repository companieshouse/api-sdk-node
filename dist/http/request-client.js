"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_client_1 = require("./http-client");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
/**
 * RequestClient is an implementation of our http client using the request
 * library.
 */
class RequestClient extends http_client_1.AbstractClient {
    httpGet(url, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "GET", url, headers });
        });
    }
    httpPost(url, body, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url, body, headers });
        });
    }
    httpPatch(url, body, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "PATCH", url, body, headers });
        });
    }
    httpPut(url, body, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "PUT", url, body, headers });
        });
    }
    httpDelete(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "DELETE", url });
        });
    }
    request(additionalOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    baseUrl: this.options.baseUrl,
                    uri: additionalOptions.url,
                    method: additionalOptions.method,
                    headers: Object.assign(Object.assign({}, this.headers), additionalOptions.headers),
                    resolveWithFullResponse: true,
                    body: additionalOptions.body,
                    json: true
                };
                // any errors (including status code errors) are thrown as exceptions and
                // will be caught in the catch block.
                const resp = yield request_promise_native_1.default(options);
                return {
                    status: resp.statusCode,
                    body: resp.body,
                    headers: resp.headers
                };
            }
            catch (e) {
                // e is an instance of RequestError or StatusCodeError
                // @see https://github.com/request/promise-core/blob/master/lib/errors.js
                // however, there is currently no type declaration file for this.
                const error = ((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.body) || { message: "failed to execute http request" };
                return {
                    status: (e === null || e === void 0 ? void 0 : e.statusCode) || 500,
                    error
                };
            }
        });
    }
}
exports.default = RequestClient;
//# sourceMappingURL=request-client.js.map