import ApiClient from "./client";
import { API_URL, ACCOUNT_URL } from "./config";
import { RequestClient, HttpClientOptions, IHttpClient } from "./http";
import Resource from "./services/resource";
/**
 *
 * @warning - Please do not use this method to create API clients directly. Use the sdk-manager-node instead (which in turn calls this method)
 *
 * Creates a new API Client.
 *
 * @param apiKey the api key to use for authentication
 * @param oauthToken a user's oauth token that can be used for authentication
 * @param baseUrl the api base url
 */
export declare const createApiClient: (apiKey?: string, oauthToken?: string, baseUrl?: string, baseAccountUrl?: string) => ApiClient;
export { IHttpClient, HttpClientOptions, RequestClient, API_URL, ACCOUNT_URL, Resource };
