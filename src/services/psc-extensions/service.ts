import { IHttpClient, HttpResponse } from "../../http";
import Mapping from "../../mapping/mapping";
import Resource, { ApiErrorResponse } from "../resource";
import {
    PscExtensionsData,
    PscExtensionResponse,
    PscExtensionResponseResource
} from "./types";

export default class PscExtensionsService {
    constructor (private readonly client: IHttpClient) {}

    /**
     * Creates a new PSC Extension filing
     *
     * @param transactionId transaction id associated with PSC Extension
     * @param pscExtensionsData An object containing the info needed for creating the extension.
     *        This includes the company number, pscNotificationId and extension details.
     */
    public async postPscExtension (
        transactionId: string,
        pscExtensionsData: PscExtensionsData
    ): Promise<Resource<PscExtensionResponse> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/persons-with-significant-control-extensions`;
        const requestBody = Mapping.snakeCaseKeys(pscExtensionsData);

        const resp: HttpResponse = await this.client.httpPost(URL, requestBody);

        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: resp.error?.errors ?? [resp.error]
            };
        }

        const body = resp.body as PscExtensionResponseResource;

        const resource: Resource<PscExtensionResponse> = {
            httpStatusCode: resp.status,
            resource: Mapping.camelCaseKeys<PscExtensionResponse>(body)
        };

        return resource;
    }
}
