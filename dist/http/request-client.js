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
const axios_1 = __importDefault(require("axios"));
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
            const headers = Object.assign(Object.assign({}, this.headers), additionalOptions.headers);
            // Default values for these headers if not provided in additional headers.
            if (!headers.accept && !headers.Accept) {
                headers.accept = "application/json";
            }
            if (!headers["Content-Type"] && !headers["content-type"]) {
                headers["content-type"] = "application/json";
            }
            try {
                const options = {
                    method: additionalOptions.method,
                    headers: headers,
                    url: this.formatUrl(this.options.baseUrl, additionalOptions.url),
                    responseType: "json",
                    validateStatus: status => {
                        return status < 500; // Resolve only if the status code is less than 500
                    }
                };
                if (additionalOptions.body) {
                    options.data = additionalOptions.body;
                }
                // any errors (including status code errors) are thrown as exceptions and
                // will be caught in the catch block.
                const resp = yield axios_1.default(options);
                return {
                    status: resp.status,
                    body: resp.data,
                    headers: resp.headers
                };
            }
            catch (e) {
                // e can be an instance of AxiosError or a generic error
                // however, we cannot specify a type for e coz type annotations for catch block errors must be 'any' or 'unknown' if specified
                const error = ((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) || { message: "failed to execute http request" };
                return {
                    status: (e === null || e === void 0 ? void 0 : e.status) || 500,
                    error
                };
            }
        });
    }
    formatUrl(baseUrl, uri) {
        if (uri.startsWith("http")) {
            return uri;
        }
        if (uri.length > 0 && uri.charAt(0) !== "/") {
            uri = `/${uri}`;
        }
        if (uri === "/") {
            return baseUrl;
        }
        return `${baseUrl}${uri}`;
    }
}
exports.default = RequestClient;
//# sourceMappingURL=request-client.js.map