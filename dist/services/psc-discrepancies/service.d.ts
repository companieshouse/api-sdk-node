import { IHttpClient } from "../../http";
import { ApiErrorResponse, ApiResponse } from "../../services/resource";
import { PSCDiscrepancy } from "./types";
import { Result } from "../result";
import Util from "../psc-discrepancies-report/util";
declare type PromisedDiscrepancyResult = Promise<Result<ApiResponse<PSCDiscrepancy>, ApiErrorResponse>>;
declare type PromisedDiscrepanciesResult = Promise<Result<ApiResponse<PSCDiscrepancy[]>, ApiErrorResponse>>;
export default class {
    private readonly client;
    utility: Util;
    constructor(client: IHttpClient);
    getPscDiscrepanciesForReport(reportSelfLink: string): PromisedDiscrepanciesResult;
    getPscDiscrepancy(selfLink: string): PromisedDiscrepancyResult;
    createPscDiscrepancy(reportSelfLink: string, discrepancy: PSCDiscrepancy): PromisedDiscrepancyResult;
    private buildBaseURL;
}
export {};
