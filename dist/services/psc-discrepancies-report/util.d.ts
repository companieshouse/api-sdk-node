import { HttpResponse } from "../../http";
import { ApiErrorResponse, ApiResponse } from "../../services/resource";
import { Result } from "../result";
export default class {
    constructor();
    processResponse(resp: HttpResponse): Result<ApiResponse<any>, ApiErrorResponse>;
    private buildErrors;
}
