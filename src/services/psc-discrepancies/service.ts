import { IHttpClient, HttpResponse } from "../../http";
import Resource, { ApiErrorResponse, ApiError, ApiResponse } from "../../services/resource";
import { PscDiscrepancy } from "./types"
import { failure, success, Result } from "../result";
import Mapping from "../../mapping/mapping";
import Util from "../psc-discrepancies-report/util"

export default class {
    utility: Util;
    constructor (private readonly client: IHttpClient) { this.utility = new Util() }

    public async getPscDiscrepanciesForReport (reportSelfLink: string): Promise<Result<ApiResponse<PscDiscrepancy[]>, ApiErrorResponse>> {
        const resp = await this.client.httpGet(this.buildBaseURL(reportSelfLink));

        return this.utility.processResponse(resp);
    }

    public async getPscDiscrepancy (selfLink: string): Promise<Result<ApiResponse<PscDiscrepancy>, ApiErrorResponse>> {
        const resp = await this.client.httpGet(selfLink);
        return this.utility.processResponse(resp);
    }

    public async createPscDiscrepancy (reportSelfLink: string, discrepancy:PscDiscrepancy): Promise<Result<ApiResponse<PscDiscrepancy>, ApiErrorResponse>> {
        const resp = await this.client.httpPost(this.buildBaseURL(reportSelfLink), discrepancy);
        return this.utility.processResponse(resp);
    }

    private buildBaseURL (reportSelfLink: string): string {
        return `${reportSelfLink}/discrepancies`;
    }
}
