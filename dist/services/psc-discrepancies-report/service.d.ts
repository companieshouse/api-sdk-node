import { IHttpClient } from "../../http";
import { PSCDiscrepancyReport } from "./types";
import Util from "./util";
import { Result } from "../../services/result";
import { ApiResponse, ApiErrorResponse } from "../../services/resource";
declare type PromisedReportResult = Promise<Result<ApiResponse<PSCDiscrepancyReport>, ApiErrorResponse>>;
export default class {
    private readonly client;
    utility: Util;
    constructor(client: IHttpClient);
    getReport(reportId: string): PromisedReportResult;
    getReportBySelfLink(selfLink: string): PromisedReportResult;
    createNewReport(obligedEntityType: String): PromisedReportResult;
    updateReport(reportId: string, report: PSCDiscrepancyReport): PromisedReportResult;
    updateReportBySelfLink(selfLink: string, report: PSCDiscrepancyReport): PromisedReportResult;
    private buildSelfLink;
}
export {};
