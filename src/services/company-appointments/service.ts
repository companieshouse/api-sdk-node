import { IHttpClient } from "../../http";
import { CompanyAppointment, CompanyAppointmentResource } from "./types";
import Resource from "../resource";
import Mapping from "../../mapping/mapping";

/**
 * TODO: javadoc
 */
export default class CompanyAppointmentsService {
    constructor (private readonly client: IHttpClient) { }

    /**
     * TODO: Javadoc
     * @param companyNumber 
     * @param appointmentId 
     * @returns 
     */
    public async getCompanyAppointmentFullRecord (companyNumber: string, appointmentId: string): Promise<Resource<CompanyAppointment>> {
        let url = `/company/${companyNumber}/appointments/${appointmentId}/full_record`;
        console.log("url = " + url);
        const resp = await this.client.httpGet(url);

        const resource: Resource<CompanyAppointment> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as CompanyAppointmentResource;

        resource.resource = Mapping.camelCaseKeys<CompanyAppointment>(body);

        return resource;
    }
}
