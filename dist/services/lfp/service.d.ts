import { PenaltyList } from "./types";
import { IHttpClient } from "../../http";
import Resource from "../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Get a list of penalties for a company.
   *
   * @param companyNumber the company number
   */
    getPenalties(companyNumber: string): Promise<Resource<PenaltyList>>;
}
