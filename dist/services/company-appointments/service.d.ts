import { IHttpClient } from "../../http";
import { CompanyAppointment } from "./types";
import Resource from "../resource";
/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/officers/officers.html
 */
export default class CompanyOfficersService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Get an appointment for a company.
   */
    getCompanyAppointment(companyNumber: string, appointmentId: string): Promise<Resource<CompanyAppointment>>;
}
