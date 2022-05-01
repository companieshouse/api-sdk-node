export interface HttpResponse {
    error?: any;
    status: number;
    body?: any;
    headers?: Headers;
}
export interface HttpClientOptions {
    baseUrl: string;
    apiKey?: string;
    oauthToken?: string;
    errorLogger?: ErrorLogger;
}
/**
 * ErrorLogger is a function that accepts details about the error through
 * its parameters and is responsible for handling the details.
 */
export declare type ErrorLogger = (message: string, data?: any) => void;
export declare type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface Headers {
    [key: string]: any;
}
export interface AdditionalOptions {
    method?: RequestMethod;
    headers?: Headers;
    url?: string;
    body?: any;
}
export default interface IHttpClient {
    /**
     * Set global headers that are set for every request.
     *
     * @param name the header name
     * @param value the header value
     */
    header(name: string, value: string): void;
    /**
     * Remove a header from each request.
     *
     * @param name the header name
     */
    removeHeader(name: string): void;
    /**
     * Perform a HTTP GET.
     *
     * @param url the url relative to the base url
     */
    httpGet(url: string, headers?: Headers): Promise<HttpResponse>;
    httpPost(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;
    httpPatch(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;
    httpPut(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;
    httpDelete(url: string): Promise<HttpResponse>;
}
export declare abstract class AbstractClient implements IHttpClient {
    protected readonly options: HttpClientOptions;
    private readonly _headers;
    /**
     * Public getter for the request headers.
     */
    get headers(): any;
    constructor(options: HttpClientOptions);
    /**
     * Set's a http request header. Headers can have multiple values and when sent the resulting
     * header values will be comma separated.
     *
     * Headers set here will be sent for all requests.
     *
     * @param name the header name
     * @param value the header value
     */
    header(name: string, value: string): void;
    /**
     * Removes a request header.
     *
     * @param name the header name
     */
    removeHeader(name: string): void;
    /**
     * Sends a HTTP GET request.
     *
     * @param url the full url to make a request to
     */
    abstract httpGet(url: string, headers?: Headers): Promise<HttpResponse>;
    abstract httpPost(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;
    abstract httpPatch(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;
    abstract httpPut(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;
    abstract httpDelete(url: string): Promise<HttpResponse>;
    private init;
}
