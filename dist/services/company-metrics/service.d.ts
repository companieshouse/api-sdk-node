import { IHttpClient } from "../../http";
import { MetricsApi } from "./types";
import Resource from "../resource";
export default class CompanyMetricsService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
    * Get the metrics for a company.
    *
    * @param number the company number to look up
    */
    getCompanyMetrics(number: string): Promise<Resource<MetricsApi>>;
}
