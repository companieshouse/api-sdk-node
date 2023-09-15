import { IHttpClient } from "../../../http";
import Resource from "../../resource";
import { FullBankruptOfficer, BankruptOfficerSearchResults, BankruptOfficerSearchQuery } from "./types";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getBankruptOfficer(ephemeralKey: string): Promise<Resource<FullBankruptOfficer>>;
    getBankruptOfficers(bankruptOfficerSearchQuery: BankruptOfficerSearchQuery): Promise<Resource<BankruptOfficerSearchResults>>;
}
