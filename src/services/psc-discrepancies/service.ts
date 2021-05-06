import { IHttpClient } from "../../http";
import Resource from "../../services/resource";
import { PscDiscrepancy } from "./types"

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getPscDiscrepanciesForReport (reportSelfLink: string) {
        const resp = await this.client.httpGet(this.buildBaseURL(reportSelfLink));

        const resource: Resource<PscDiscrepancy[]> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = [...resp.body]

        return resource;
    }

    public async getPscDiscrepancy (selfLink: string) {
        const resp = await this.client.httpGet(this.buildBaseURL(selfLink));

        const resource: Resource<PscDiscrepancy> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = { ...resp.body }

        return resource;
    }

    public async createPscDiscrepancy (reportSelfLink: string, discrepancy:PscDiscrepancy) {
        const resp = await this.client.httpPost(this.buildBaseURL(reportSelfLink));

        const resource: Resource<PscDiscrepancy> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = { ...resp.body }

        return resource;
    }

    private buildBaseURL (reportSelfLink: string): string {
        return `${reportSelfLink}/discrepancies`;
    }
}
