import { AbstractClient, HttpResponse, AdditionalOptions, Headers } from "./http-client";
import rq from "request-promise-native";

/**
 * RequestClient is an implementation of our http client using the request
 * library.
 */
export default class RequestClient extends AbstractClient {
    public async httpGet (url: string, headers?: Headers): Promise<HttpResponse> {
        return this.request({ method: "GET", url, headers });
    }

    public async httpPost (url: string, body?: any, headers?: Headers): Promise<HttpResponse> {
        return this.request({ method: "POST", url, body, headers });
    }

    public async httpPatch (url: string, body?: any, headers?: Headers): Promise<HttpResponse> {
        return this.request({ method: "PATCH", url, body, headers });
    }

    public async httpPut (url: string, body?: any, headers?: Headers): Promise<HttpResponse> {
        return this.request({ method: "PUT", url, body, headers });
    }

    public async httpDelete (url: string): Promise<HttpResponse> {
        return this.request({ method: "DELETE", url });
    }

    private async request (additionalOptions: AdditionalOptions): Promise<HttpResponse> {
        try {
            const options: rq.Options = {
                baseUrl: this.options.baseUrl,
                uri: additionalOptions.url as string,
                method: additionalOptions.method,
                headers: {
                    ...this.headers,
                    ...additionalOptions.headers
                },
                resolveWithFullResponse: true,
                body: additionalOptions.body,
                json: true
            };

            // any errors (including status code errors) are thrown as exceptions and
            // will be caught in the catch block.
            const resp = await rq(options) as rq.FullResponse;
            return {
                status: resp.statusCode,
                body: resp.body,
                headers: resp.headers
            };
        } catch (e) {
            // e is an instance of RequestError or StatusCodeError
            // @see https://github.com/request/promise-core/blob/master/lib/errors.js
            // however, there is currently no type declaration file for this.
            const error = e?.response?.body || { message: "failed to execute http request" };
            return {
                status: e?.statusCode || 500,
                error
            };
        }
    }
}
