"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractClient = void 0;
/**
 * The default error logger.
 *
 * @param message error message
 * @param data additional context data
 */
const defaultErrorLogger = (message, data) => {
    console.log(message, data);
};
class AbstractClient {
    constructor(options) {
        this.options = options;
        this._headers = {};
        this.init();
    }
    /**
     * Public getter for the request headers.
     */
    get headers() {
        const out = {};
        for (const name in this._headers) {
            if (!out.hasOwnProperty(name)) {
                out[name] = this._headers[name].join(", ");
            }
        }
        return out;
    }
    /**
     * Set's a http request header. Headers can have multiple values and when sent the resulting
     * header values will be comma separated.
     *
     * Headers set here will be sent for all requests.
     *
     * @param name the header name
     * @param value the header value
     */
    header(name, value) {
        if (!this._headers.hasOwnProperty(name)) {
            this._headers[name] = [];
        }
        this._headers[name].push(value);
    }
    /**
     * Removes a request header.
     *
     * @param name the header name
     */
    removeHeader(name) {
        if (this._headers.hasOwnProperty(name)) {
            delete this._headers[name];
        }
    }
    init() {
        const { apiKey, oauthToken } = this.options;
        if (oauthToken) {
            this.header("Authorization", `Bearer ${oauthToken}`);
        }
        else if (apiKey) {
            this.header("Authorization", apiKey);
        }
        else {
            throw new Error("You must either set the apiKey or oauthToken options to use the client");
        }
        if (!this.options.errorLogger) {
            this.options.errorLogger = defaultErrorLogger;
        }
    }
}
exports.AbstractClient = AbstractClient;
//# sourceMappingURL=http-client.js.map