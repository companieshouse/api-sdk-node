import { ApiResponse, ApiResult } from "../../resource";
import { SearchRequest, SearchResponse } from "./types";
import { IHttpClient } from "../../../http";
import { failure, success } from "../../result";
import Mapping from "../../../mapping/mapping";

export class CheckoutSearchService {
    constructor (private readonly client: IHttpClient) {
    }

    public async search (request: SearchRequest): Promise<ApiResult<ApiResponse<SearchResponse>>> {
        const serverRequest = Mapping.snakeCaseKeys(request);
        const queryParams = Object.keys(serverRequest).map(key => key + "=" + serverRequest[key]).join("&");
        const serverResponse = await this.client.httpGet("/checkouts/search" + (queryParams ? ("?" + queryParams) : ""));
        const response: ApiResponse<SearchResponse> = {
            httpStatusCode: serverResponse.status
        };

        if (serverResponse.error) {
            return failure({
                httpStatusCode: serverResponse.status,
                errors: serverResponse.error.errors
            });
        } else {
            response.resource = Mapping.camelCaseKeys<SearchResponse>(serverResponse.body);
            return success(response);
        }
    }
}
