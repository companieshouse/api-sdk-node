"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNT_URL = exports.API_URL = exports.RequestClient = exports.createApiClient = void 0;
const client_1 = __importDefault(require("./client"));
const config_1 = require("./config");
Object.defineProperty(exports, "API_URL", { enumerable: true, get: function () { return config_1.API_URL; } });
Object.defineProperty(exports, "ACCOUNT_URL", { enumerable: true, get: function () { return config_1.ACCOUNT_URL; } });
const http_1 = require("./http");
Object.defineProperty(exports, "RequestClient", { enumerable: true, get: function () { return http_1.RequestClient; } });
/**
 * Creates a new API Client.
 *
 * @param apiKey the api key to use for authentication
 * @param oauthToken a user's oauth token that can be used for authentication
 * @param baseUrl the api base url
 */
const createApiClient = (apiKey, oauthToken, baseUrl = config_1.API_URL, baseAccountUrl = config_1.ACCOUNT_URL) => {
    if (apiKey && oauthToken) {
        throw new Error("You cannot set both api key and oauth token to create a client. Please use one or the other");
    }
    // the http client adapter for the api domain
    const apiOptions = {
        apiKey,
        baseUrl,
        oauthToken
    };
    const apiHttpClient = new http_1.RequestClient(apiOptions);
    // the http client adapter for the account domain
    const accountOptions = {
        apiKey: apiKey,
        baseUrl: baseAccountUrl,
        oauthToken: oauthToken
    };
    const accountHttpClient = new http_1.RequestClient(accountOptions);
    // the api client
    return new client_1.default(apiHttpClient, accountHttpClient);
};
exports.createApiClient = createApiClient;
//# sourceMappingURL=index.js.map