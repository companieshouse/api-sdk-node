import { IHttpClient } from "../../../http";
import { CertifiedCopyItem } from "./types";
import Resource from "../../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getCertifiedCopy(certifiedCopyId: string): Promise<Resource<CertifiedCopyItem>>;
}
