import { AbstractClient, HttpResponse, AdditionalOptions, Headers } from "./http-client";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * RequestClient is an implementation of our http client using the request
 * library.
 */
export default class RequestClient extends AbstractClient {
    public async httpGet (url: string, headers?: Headers, formatUri?: boolean): Promise<HttpResponse> {
        return this.request({ method: "GET", url, headers }, formatUri);
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

    private async request (additionalOptions: AdditionalOptions, formatUrl?: boolean): Promise<HttpResponse> {
        const url = formatUrl === true ? this.formatUrl(this.options.baseUrl, additionalOptions.url) : additionalOptions.url;
        console.log(`url in api sdk node before calling: ${url}`)
        const headers = {
            ...this.headers,
            ...additionalOptions.headers
        }
        // Default values for these headers if not provided in additional headers.
        if (!headers.accept && !headers.Accept) {
            headers.accept = "application/json";
        }
        if (!headers["Content-Type"] && !headers["content-type"]) {
            headers["content-type"] = "application/json";
        }

        try {
            const options: AxiosRequestConfig = {
                method: additionalOptions.method,
                headers: headers,
                url: url,
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
            const resp = await axios(options) as AxiosResponse;
            return {
                status: resp.status,
                body: resp.data,
                headers: resp.headers
            };
        } catch (e) {
            // e can be an instance of AxiosError or a generic error
            // however, we cannot specify a type for e coz type annotations for catch block errors must be 'any' or 'unknown' if specified
            const error = e?.response?.data || { message: "failed to execute http request" };
            return {
                status: e?.status || 500,
                error
            };
        }
    }

    private formatUrl (baseUrl: string, uri: string) {
        if (uri.length > 0 && uri.charAt(0) !== "/") {
            uri = `/${uri}`;
        }
        if (uri === "/") {
            console.log(`returning baseUrl : ${baseUrl}`);
            return baseUrl;
        }
        console.log(`returning baseUrluri : ${baseUrl}${uri}`);
        return `${baseUrl}${uri}`;
    }
}
