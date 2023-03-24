import {
    Tm01Submission,
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async postTm01 (transactionId: string,
        tm01Submission: Tm01Submission): Promise<Resource<Tm01Submission> | ApiErrorResponse> {
        const baseUrl = this.getOfficerFilingUrlIncTransactionId(transactionId);
        const resp: HttpResponse =
            await this.client.httpPost(`${baseUrl}`,tm01Submission);

        const resource: Resource<String> = {
            httpStatusCode: resp.status,
            resource: resp.body
        };
        return resource;
    }

    private getOfficerFilingUrlIncTransactionId (transactionId: string) {
        return `/transactions/${transactionId}/officers`;
    }
}
