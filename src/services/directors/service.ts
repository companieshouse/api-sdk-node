import { HealthCheck } from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse, ApiResult } from "../resource";
import { failure, success } from "services/result";

export default class {
    private directorsApiEndpoint = "/directors-poc";
    private healthCheckEndpoint = "/healthCheck";

    constructor (private readonly client: IHttpClient) {}

    public async getHealthCheck (): Promise<ApiResult<Resource<HealthCheck>>> {
        const { client, directorsApiEndpoint, healthCheckEndpoint } = this;
        const healthCheckUrl = directorsApiEndpoint + healthCheckEndpoint;

        const resp = await client.httpGet(healthCheckUrl);

        if (resp.error || resp.status >= 400) {
            return failure({
                httpStatusCode: resp.status,
                errors: [
                    {
                        error: resp.error,
                        location: healthCheckUrl
                    }
                ]
            });
        }

        return success({
            httpStatusCode: 200,
            resource: resp.body as HealthCheck
        });
    }
}
