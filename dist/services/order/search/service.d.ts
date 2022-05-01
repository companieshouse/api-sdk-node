import { ApiResponse, ApiResult } from "../../resource";
import { SearchRequest, SearchResponse } from "./types";
import { IHttpClient } from "../../../http";
export declare class OrderSearchService {
    private readonly client;
    constructor(client: IHttpClient);
    search(request: SearchRequest): Promise<ApiResult<ApiResponse<SearchResponse>>>;
}
