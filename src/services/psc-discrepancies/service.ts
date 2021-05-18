import { IHttpClient } from "../../http";
import { ApiErrorResponse, ApiResponse } from "../../services/resource";
import { PSCDiscrepancy } from "./types"
import { Result } from "../result";
import Util from "../psc-discrepancies-report/util"

type PromisedDiscrepancyResult = Promise<Result<ApiResponse<PSCDiscrepancy>, ApiErrorResponse>>;
type PromisedDiscrepanciesResult = Promise<Result<ApiResponse<PSCDiscrepancy[]>, ApiErrorResponse>>;

export default class {
    utility: Util;
    constructor (private readonly client: IHttpClient) { this.utility = new Util() }

    public async getPscDiscrepanciesForReport (reportSelfLink: string): PromisedDiscrepanciesResult {
        const resp = await this.client.httpGet(this.buildBaseURL(reportSelfLink));

        return this.utility.processResponse(resp);
    }

    public async getPscDiscrepancy (selfLink: string): PromisedDiscrepancyResult {
        const resp = await this.client.httpGet(selfLink);
        return this.utility.processResponse(resp);
    }

    public async createPscDiscrepancy (reportSelfLink: string, discrepancy:PSCDiscrepancy): PromisedDiscrepancyResult {
        const resp = await this.client.httpPost(this.buildBaseURL(reportSelfLink), discrepancy);
        return this.utility.processResponse(resp);
    }

    private buildBaseURL (reportSelfLink: string): string {
        return `${reportSelfLink}/discrepancies`;
    }
}
