import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import Mapping from "../../mapping/mapping";
import {
    CompanyPersonsWithSignificantControlStatements,
    CompanyPersonsWithSignificantControlStatementsResource
} from "./types";

/**
 * https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/persons-with-significant-control/list-statements
 */
export default class CompanyPscStatementsService {
    constructor (private readonly client: IHttpClient) { }

    /**
     * Get the PSC statements for a company.
     *
     * @param companyNumber the company number to look up
     * @param pageSize the size of the page to return
     * @param pageIndex the index of the page to return
     * @param registerView Display register specific information.
     */
    public async getCompanyPscStatements (companyNumber: string, pageSize: number, pageIndex: number, registerView: boolean = false): Promise<Resource<CompanyPersonsWithSignificantControlStatements> | ApiErrorResponse> {
        let url = `/company/${companyNumber}/persons-with-significant-control-statements`;
        url = url.concat("?",
            `page_size=${pageSize}`,
            "&",
            `page_index=${pageIndex}`,
            "&",
            `register_view=${registerView}`);

        const resp = await this.client.httpGet(url);

        if (resp.status !== 200) {
            return {
                httpStatusCode: resp.status,
                errors: resp.error
            }
        }

        const sdkResponse: Resource<CompanyPersonsWithSignificantControlStatements> = {
            httpStatusCode: resp.status
        };

        const body = resp.body as CompanyPersonsWithSignificantControlStatementsResource;

        sdkResponse.resource = Mapping.camelCaseKeys<CompanyPersonsWithSignificantControlStatements>(body);

        return sdkResponse;
    }
}
