import { HealthCheck } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiResult } from "../resource";
import { failure, success } from "../result";
import { Directorship, Personal } from ".";

export default class {
    private directorsApiEndpoint = "/directors-poc";
    private healthCheckEndpoint = "/healthCheck";
    private directorsTransactionEndpoint =
        "/transactions/:transactionId/directors-poc/directors";

    constructor(private readonly client: IHttpClient) {}

    private getUpdateTransactionEndpoint(transactionId: string): string {
        return this.directorsTransactionEndpoint.replace(
            ":transactionId",
            transactionId
        );
    }

    public async updateDirectorTransaction(
        transactionId: string,
        person: Personal
    ): Promise<ApiResult<Resource<Directorship>>> {
        const client = this.client;
        const updateTransactionEndpoint =
            this.getUpdateTransactionEndpoint(transactionId);

        console.log(
            `Update transaction endpoint: ${updateTransactionEndpoint}`
        );

        const resp = await client.httpPost(updateTransactionEndpoint, person, {
            "Content-Type": "application/json",
        });

        if (resp.error || resp.status >= 400) {
            return failure({
                httpStatusCode: resp.status,
                errors: [
                    {
                        error: resp.error,
                        location: updateTransactionEndpoint,
                    },
                ],
            });
        }

        return success({
            httpStatusCode: resp.status,
            resource: resp.body as Directorship,
        });
    }

    public async getHealthCheck(): Promise<ApiResult<Resource<HealthCheck>>> {
        const { client, directorsApiEndpoint, healthCheckEndpoint } = this;
        const healthCheckUrl = directorsApiEndpoint + healthCheckEndpoint;

        const resp = await client.httpGet(healthCheckUrl);

        if (resp.error || resp.status >= 400) {
            return failure({
                httpStatusCode: resp.status,
                errors: [
                    {
                        error: resp.error,
                        location: healthCheckUrl,
                    },
                ],
            });
        }

        return success({
            httpStatusCode: resp.status,
            resource: resp.body as HealthCheck,
        });
    }
}
