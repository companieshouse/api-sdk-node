import { IHttpClient } from "../../http";
import Mapping from "../../mapping/mapping";
import { MetricsApi, MetricsApiResource } from "./types";
import Resource from "../resource";

export default class CompanyMetricsService {
    constructor (private readonly client: IHttpClient) { }

    /**
    * Get the metrics for a company.
    *
    * @param number the company number to look up
    */
    public async getCompanyMetrics (number: string): Promise<Resource<MetricsApi>> {
        const resp = await this.client.httpGet(`/company/${number}/metrics`);

        const resource: Resource<MetricsApi> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        // cast the response body to the expected type
        const body = resp.body as MetricsApiResource;

        resource.resource = Mapping.camelCaseKeys<MetricsApi>(body);

        return resource;
    }
}
