import { AbstractClient, HttpResponse, Headers } from "./http-client";
/**
 * RequestClient is an implementation of our http client using the request
 * library.
 */
export default class RequestClient extends AbstractClient {
    httpGet(url: string): Promise<HttpResponse>;
    httpPost(url: string, body?: any): Promise<HttpResponse>;
    httpPatch(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;
    httpDelete(url: string): Promise<HttpResponse>;
    private request;
}
