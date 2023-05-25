import { IHttpClient } from "../../http";
import { CompanyAppointment } from "./types";
import Resource from "../resource";
/**
 * TODO: javadoc
 */
export default class CompanyAppointmentsService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
     * TODO: Javadoc
     * @param companyNumber
     * @param appointmentId
     * @returns
     */
    getCompanyAppointmentFullRecord(companyNumber: string, appointmentId: string): Promise<Resource<CompanyAppointment>>;
}
