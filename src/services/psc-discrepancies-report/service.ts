import { IHttpClient } from "../../http";
import Resource from "../../services/resource";
import { PSCDiscrepancyReport } from "./types"

const PSC_DISCREPANCY_API_URL = "/psc-discrepancy-reports";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getReport (reportId: string): Promise<Resource<PSCDiscrepancyReport>> {
        return this.getReportBySelfLink(this.buildSelfLink(reportId));
    }

    public async getReportBySelfLink (selfLink: string): Promise<Resource<PSCDiscrepancyReport>> {
        const resp = await this.client.httpGet(`${selfLink}`);

        const resource: Resource<PSCDiscrepancyReport> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = { ...resp.body }

        return resource;
    }

    public async createNewReport (obligedEntityType: String): Promise<Resource<PSCDiscrepancyReport>> {
        const resp = await this.client.httpPost(
            PSC_DISCREPANCY_API_URL,
            {
                obligedEntityType: obligedEntityType,
                status: "INCOMPLETE"
            });

        const resource: Resource<PSCDiscrepancyReport> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = { ...resp.body }

        return resource;
    }

    public async updateReport (reportId: string, report: PSCDiscrepancyReport) {
        return this.updateReportBySelfLink(this.buildSelfLink(reportId), report);
    }

    public async updateReportBySelfLink (selfLink: string, report: PSCDiscrepancyReport) {
        const resp = await this.client.httpPut(selfLink, report);

        const resource: Resource<PSCDiscrepancyReport> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = { ...resp.body }

        return resource;
    }

    private buildSelfLink (reportId: string): string {
        return `${PSC_DISCREPANCY_API_URL}/${reportId}`;
    }
}
