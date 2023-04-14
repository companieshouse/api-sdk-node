import { CompanyOfficer } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getListActiveDirectorDetails(transactionId: string): Promise<Resource<CompanyOfficer[]> | ApiErrorResponse>;
    private getOfficerFilingUrlIncTransactionId;
}
