import {
    ActiveOfficerDetails,
    ActiveOfficerDetailsResource,
    Address,
    AddressResource,
    Tm01Submission,
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async postTm01 (transactionId: string,
        tm01Submission: Tm01Submission): Promise<Resource<Tm01Submission> | ApiErrorResponse> {
        const baseUrl = this.getOfficerFilingUrlIncTransactionId(transactionId);
        const resp: HttpResponse =
            await this.client.httpPost(`${baseUrl}`,tm01Submission);

        const resource: Resource<String> = {
            httpStatusCode: resp.status,
            resource: resp.body
        };
        return resource;
    }

    public async getListActiveDirectorDetails (transactionId: string): Promise<Resource<ActiveOfficerDetails[]> | ApiErrorResponse> {
        const url = `${this.getPrivateOfficerFilingUrlIncTransactionId(transactionId)}/active-directors-details`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<ActiveOfficerDetails[]> = { httpStatusCode: resp.status };

        resource.resource = this.mapToListActiveOfficerDetails(resp.body);

        return resource;
    }



    private mapToListActiveOfficerDetails (officerResourceList: ActiveOfficerDetailsResource[]): ActiveOfficerDetails[] {
        const officerList: ActiveOfficerDetails[] = [];
        for (let index = 0; index < officerResourceList.length; index++) {
            const officerResource: ActiveOfficerDetailsResource = officerResourceList[index];
            officerList[index] = {
                foreName1: officerResource.fore_name_1,
                foreName2: officerResource.fore_name_2,
                surname: officerResource.surname,
                occupation: officerResource.occupation,
                nationality: officerResource.nationality,
                dateOfBirth: officerResource.date_of_birth,
                dateOfAppointment: officerResource.date_of_appointment,
                countryOfResidence: officerResource.country_of_residence,
                ...(officerResource.service_address && { serviceAddress: this.mapToAddress(officerResource.service_address) }),
                ...(officerResource.residential_address && { residentialAddress: this.mapToAddress(officerResource.residential_address) }),
                isCorporate: officerResource.is_corporate,
                role: officerResource.role,
                placeRegistered: officerResource.place_registered,
                registrationNumber: officerResource.registration_number,
                lawGoverned: officerResource.law_governed,
                legalForm: officerResource.legal_form,
                identificationType: officerResource.identification_type
            }
        }
        return officerList;
    }

    private mapToAddress (addressResource: AddressResource): Address {
        return {
            addressLine1: addressResource.address_line_1,
            addressLine2: addressResource.address_line_2,
            careOf: addressResource.care_of,
            country: addressResource.country,
            locality: addressResource.locality,
            poBox: addressResource.po_box,
            postalCode: addressResource.postal_code,
            premises: addressResource.premises,
            region: addressResource.region
        }
    }


    private getOfficerFilingUrlIncTransactionId (transactionId: string) {
        return `/transactions/${transactionId}/officers`;
    }

    private getPrivateOfficerFilingUrlIncTransactionId (transactionId: string) {
        return `private/transactions/${transactionId}/officers`;
    }
}
