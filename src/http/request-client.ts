import { AbstractClient, HttpResponse, AdditionalOptions, Headers } from "./http-client";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

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
            if (additionalOptions.url.charAt(0) !== "/") {
                additionalOptions.url = `/${additionalOptions.url}`;
            }
            const options: AxiosRequestConfig = {
                method: additionalOptions.method,
                headers: {
                    authorization: this.headers.Authorization,
                    accept: "application/json",
                    "content-type": "application/json"
                },
                url: this.formatUrl(this.options.baseUrl, additionalOptions.url),
                data: additionalOptions.body,
                responseType: "json"
            };
            console.log("headers output ====");
            console.log(this.headers);
            console.log("additionalOptions output ====");
            console.log(additionalOptions);
            console.log("options output/fix/v3 ====");
            console.log(options);
            // any errors (including status code errors) are thrown as exceptions and
            // will be caught in the catch block.

            const resp = await axios(options) as AxiosResponse;

            const response = {
                status: resp.status,
                body: resp.data,
                headers: resp.headers
            };

            console.log("response output ====");
            console.log(response);

            return response;
        } catch (e) {
            // e can be an instance of AxiosError or a generic error
            // however, we cannot specify a type for e coz type annotations for catch block errors must be 'any' or 'unknown' if specified
            const error = e?.response?.data || { message: "failed to execute http request" };

            console.log("error output ====");
            console.log(error);

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
            return baseUrl;
        }
        return `${baseUrl}${uri}`;
    }
}
