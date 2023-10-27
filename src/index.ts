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
export const createApiClient = (apiKey?: string, oauthToken?: string, baseUrl: string = API_URL, baseAccountUrl: string = ACCOUNT_URL): ApiClient => {
    if (apiKey && oauthToken) {
        throw new Error("You cannot set both api key and oauth token to create a client. Please use one or the other");
    }

    // the http client adapter for the api domain
    const apiOptions: HttpClientOptions = {
        apiKey,
        baseUrl,
        oauthToken
    };
    const apiHttpClient = new RequestClient(apiOptions);

    // the http client adapter for the account domain
    const accountOptions: HttpClientOptions = {
        apiKey: apiKey,
        baseUrl: baseAccountUrl,
        oauthToken: oauthToken
    };
    const accountHttpClient = new RequestClient(accountOptions);

    // the api client
    return new ApiClient(apiHttpClient, accountHttpClient);
};

// exports used by private sdk to provide private services without the need to duplicate configs or http client logic
export { IHttpClient, HttpClientOptions, RequestClient, API_URL, ACCOUNT_URL, Resource };
