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
export type ErrorLogger = (message: string, data?: any) => void;

/**
 * The default error logger.
 *
 * @param message error message
 * @param data additional context data
 */
const defaultErrorLogger = (message: string, data?: any): void => {
    console.log(message, data);
};

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

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
  httpGet(url: string, headers?: Headers, formatUrl?: boolean): Promise<HttpResponse>;
  httpPost(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;
  httpPatch(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;
  httpPut(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;
  httpDelete(url: string): Promise<HttpResponse>;
}

export abstract class AbstractClient implements IHttpClient {
  private readonly _headers: any = {};

  /**
   * Public getter for the request headers.
   */
  get headers (): any {
      const out: any = {};
      for (const name in this._headers) {
          if (!out.hasOwnProperty(name)) {
              out[name] = this._headers[name].join(", ");
          }
      }
      return out;
  }

  constructor (protected readonly options: HttpClientOptions) {
      this.init();
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
  public header (name: string, value: string): void {
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
  public removeHeader (name: string): void {
      if (this._headers.hasOwnProperty(name)) {
          delete this._headers[name];
      }
  }

  /**
   * Sends a HTTP GET request.
   *
   * @param url the full url to make a request to
   */
  public abstract httpGet(url: string, headers?: Headers, formatUrl?: boolean): Promise<HttpResponse>;

  public abstract httpPost(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;

  public abstract httpPatch(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;

  public abstract httpPut(url: string, body?: any, headers?: Headers): Promise<HttpResponse>;

  public abstract httpDelete(url: string): Promise<HttpResponse>;

  private init () {
      const { apiKey, oauthToken } = this.options;
      if (oauthToken) {
          this.header("Authorization", `Bearer ${oauthToken}`);
      } else if (apiKey) {
          this.header("Authorization", apiKey);
      } else {
          throw new Error("You must either set the apiKey or oauthToken options to use the client");
      }

      if (!this.options.errorLogger) {
          this.options.errorLogger = defaultErrorLogger;
      }
  }
}
