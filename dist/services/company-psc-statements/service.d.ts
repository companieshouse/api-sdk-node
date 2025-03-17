import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import { CompanyPersonsWithSignificantControlStatements } from "./types";
/**
 * https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/persons-with-significant-control/list-statements
 */
export default class CompanyPscStatementsService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
     * Get the PSC statements for a company.
     *
     * @param companyNumber the company number to look up
     * @param pageSize the size of the page to return
     * @param pageIndex the index of the page to return
     * @param registerView Display register specific information.
     */
    getCompanyPscStatements(companyNumber: string, pageSize: number, pageIndex: number, registerView?: boolean): Promise<Resource<CompanyPersonsWithSignificantControlStatements> | ApiErrorResponse>;
}
