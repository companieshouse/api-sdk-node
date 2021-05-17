import { IHttpClient } from "../../http";
import { PSCDiscrepancyReport } from "./types"
import Util from "./util"
import { Result } from "services/result";
import { ApiResponse, ApiErrorResponse } from "services/resource";

const PSC_DISCREPANCY_API_URL = "/psc-discrepancy-reports";

export default class {
    utility: Util;
    constructor (private readonly client: IHttpClient) { this.utility = new Util() }

    public async getReport (reportId: string): Promise<Result<ApiResponse<PSCDiscrepancyReport>, ApiErrorResponse>> {
        return this.getReportBySelfLink(this.buildSelfLink(reportId));
    }

    public async getReportBySelfLink (selfLink: string): Promise<Result<ApiResponse<PSCDiscrepancyReport>, ApiErrorResponse>> {
        const resp = await this.client.httpGet(`${selfLink}`);
        return this.utility.processResponse(resp);
    }

    public async createNewReport (obligedEntityType: String): Promise<Result<ApiResponse<PSCDiscrepancyReport>, ApiErrorResponse>> {
        const resp = await this.client.httpPost(
            PSC_DISCREPANCY_API_URL,
            {
                obligedEntityType: obligedEntityType,
                status: "INCOMPLETE"
            });
        return this.utility.processResponse(resp);
    }

    public async updateReport (reportId: string, report: PSCDiscrepancyReport): Promise<Result<ApiResponse<PSCDiscrepancyReport>, ApiErrorResponse>> {
        return this.updateReportBySelfLink(this.buildSelfLink(reportId), report);
    }

    public async updateReportBySelfLink (selfLink: string, report: PSCDiscrepancyReport): Promise<Result<ApiResponse<PSCDiscrepancyReport>, ApiErrorResponse>> {
        const resp = await this.client.httpPut(selfLink, report);
        return this.utility.processResponse(resp);
    }

    private buildSelfLink (reportId: string): string {
        return `${PSC_DISCREPANCY_API_URL}/${reportId}`;
    }
}
