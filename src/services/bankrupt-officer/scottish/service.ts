import { IHttpClient } from "../../../http";
import Resource from "../../resource";
import {
    FullBankruptOfficer,
    BankruptOfficerSearchResults,
    BankruptOfficerSearchQuery
} from "./types";

const BANKRUPT_OFFICER_SEARCH_API_URL = "/internal/officer-search/scottish-bankrupt-officers";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getBankruptOfficer (ephemeralKey: string): Promise<Resource<FullBankruptOfficer>> {
        const resp = await this.client.httpGet(`${BANKRUPT_OFFICER_SEARCH_API_URL}/${ephemeralKey}`);

        const resource: Resource<FullBankruptOfficer> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = { ...resp.body }

        return resource;
    }

    public async getBankruptOfficers (bankruptOfficerSearchQuery: BankruptOfficerSearchQuery): Promise<Resource<BankruptOfficerSearchResults>> {
        const resp = await this.client.httpPost(BANKRUPT_OFFICER_SEARCH_API_URL, bankruptOfficerSearchQuery);

        const resource: Resource<BankruptOfficerSearchResults> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = {
            itemsPerPage: resp.body.itemsPerPage,
            startIndex: resp.body.startIndex,
            totalResults: resp.body.totalResults,
            items: [...resp.body.items]
        }

        return resource;
    }
}