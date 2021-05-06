import { IHttpClient } from "../../http";
import Resource from "../../services/resource";
import { PscDiscrepancy } from "./types"

const PSC_DISCREPANCY_API_URL = "";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async createPscDiscrepancy (reportSelfLink: string, discrepancy:PscDiscrepancy) {
        const resp = await this.client.httpPost(`${reportSelfLink}/discrepancies`);

        const resource: Resource<PscDiscrepancy> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = { ...resp.body }

        return resource;
    }
}
