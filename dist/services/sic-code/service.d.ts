import { CondensedSicCodeData } from "./types";
import { IHttpClient } from "../../http";
import Resource from "../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getCondensedSicCodes(): Promise<Resource<CondensedSicCodeData[]>>;
}
