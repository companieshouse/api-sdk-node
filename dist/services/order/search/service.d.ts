import { ApiResponse, ApiResult } from "../../resource";
import { SearchRequest, SearchResponse } from "./types";
import { IHttpClient } from "../../../http";
export declare class CheckoutSearchService {
    private readonly client;
    constructor(client: IHttpClient);
    search(request: SearchRequest): Promise<ApiResult<ApiResponse<SearchResponse>>>;
}
