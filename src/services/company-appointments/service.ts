import { IHttpClient } from "../../http";
import { CompanyAppointmentResource, CompanyAppointment } from "./types";
import Resource from "../resource";
import Mapping from "../../mapping/mapping";

/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/officers/officers.html
 */
export default class CompanyOfficersService {
    constructor (private readonly client: IHttpClient) { }

    /**
   * Get an appointment for a company.
   */
    public async getCompanyAppointment (companyNumber: string, appointmentId: string): Promise<Resource<CompanyAppointment>> {
        let url = `/company/${companyNumber}/appointments/${appointmentId}/full_record`;

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
