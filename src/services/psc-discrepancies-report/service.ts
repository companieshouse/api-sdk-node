import { IHttpClient } from "../../http";
import { PSCDiscrepancyReport } from "./types"
import Util from "./util"
import { Result } from "services/result";
import { ApiResponse, ApiErrorResponse } from "services/resource";

const PSC_DISCREPANCY_API_URL = "/psc-discrepancy-reports";

type PromisedReportResult= Promise<Result<ApiResponse<PSCDiscrepancyReport>, ApiErrorResponse>>;

export default class {
    utility: Util;
    constructor (private readonly client: IHttpClient) { this.utility = new Util() }

    public async getReport (reportId: string): PromisedReportResult {
        return this.getReportBySelfLink(this.buildSelfLink(reportId));
    }

    public async getReportBySelfLink (selfLink: string): PromisedReportResult {
        const resp = await this.client.httpGet(`${selfLink}`);
        return this.utility.processResponse(resp);
    }

    public async createNewReport (obligedEntityType: String): PromisedReportResult {
        const resp = await this.client.httpPost(
            PSC_DISCREPANCY_API_URL,
            {
                obligedEntityType: obligedEntityType,
                status: "INCOMPLETE"
            });
        return this.utility.processResponse(resp);
    }

    public async updateReport (reportId: string, report: PSCDiscrepancyReport): PromisedReportResult {
        return this.updateReportBySelfLink(this.buildSelfLink(reportId), report);
    }

    public async updateReportBySelfLink (selfLink: string, report: PSCDiscrepancyReport): PromisedReportResult {
        const resp = await this.client.httpPut(selfLink, report);
        return this.utility.processResponse(resp);
    }

    private buildSelfLink (reportId: string): string {
        return `${PSC_DISCREPANCY_API_URL}/${reportId}`;
    }
}
