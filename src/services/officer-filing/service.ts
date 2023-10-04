import {
    Address,
    AddressResource,
    CompanyOfficer,
    CompanyOfficerResource,
    FilingResponse,
    FilingResponseDto,
    OfficerFiling,
    OfficerFilingDto,
    ValidationStatusResponse,
    ValidationStatusResponseResource
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import Mapping from "../../mapping/mapping";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getListActiveDirectorDetails (transactionId: string): Promise<Resource<CompanyOfficer[]> | ApiErrorResponse> {
        const url = `${this.getOfficerFilingUrlIncTransactionId(transactionId)}/active-directors-details`;
        return this.getCompanyOfficerDetails(url);
    }

    public async getValidationStatus (transactionId: string, submissionId: string): Promise<Resource<ValidationStatusResponse> | ApiErrorResponse> {
        const url = `${this.getOfficerFilingUrlIncTransactionIdAndSubmissionId(transactionId, submissionId)}/validation_status`;
        return this.getValidationStatusResponse(url);
    }

    private getOfficerFilingUrlIncTransactionId (transactionId: string) {
        return `/transactions/${transactionId}/officers`;
    }

    private getOfficerFilingUrlIncTransactionIdAndSubmissionId (transactionId: string, submissionId: string) {
        return `/transactions/${transactionId}/officers/${submissionId}/`;
    }

    /**
    * Get the director details including the termination date out of the filing.
    * to be used on the check your answers page for TM01.
    *
    * @params transaction id and submission id to look up the filing
    */
    public async getDirectorAndTerminationDate (transactionId: string, submissionId: string): Promise<Resource<CompanyOfficer> | ApiErrorResponse> {
        const url = `${this.getOfficerFilingUrlIncTransactionIdAndSubmissionId(transactionId, submissionId)}/tm01-check-answers-directors-details`;
        return this.getCompanyOfficerDetails(url);
    }

    public async getCurrentOrFutureDissolved (companyNumber: String): Promise<Resource<Boolean> | ApiErrorResponse> {
        const url = `/officer-filing/company/${companyNumber}/eligibility-check/past-future-dissolved`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        return { httpStatusCode: resp.status, resource: resp.body as Boolean };
    }

    private async getValidationStatusResponse (url: string): Promise<Resource<ValidationStatusResponse> | ApiErrorResponse> {
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<ValidationStatusResponse> = { httpStatusCode: resp.status };

        const body = resp.body as ValidationStatusResponseResource[];

        resource.resource = Mapping.camelCaseKeys<ValidationStatusResponse>(body);

        return resource;
    }

    public async getOfficerFiling (transactionId: string, filingId: string): Promise<Resource<OfficerFiling> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/officers/${filingId}`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<OfficerFiling> = {
            httpStatusCode: resp.status
        };

        const body = resp.body as OfficerFilingDto;

        resource.resource = Mapping.camelCaseKeys<OfficerFiling>(body);

        return resource;
    }

    /**
     * Post an officer filing object to update on the API.
     */
    public async postOfficerFiling (transactionId: string, officerFiling: OfficerFiling): Promise<Resource<FilingResponse> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/officers`;
        const officerFilingResource: OfficerFilingDto = this.mapToDto(officerFiling);

        const resp = await this.client.httpPost(url, officerFilingResource);
        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<FilingResponse> = {
            httpStatusCode: resp.status
        };
        const body = resp.body as FilingResponseDto;
        this.populateResource(resource, body);
        return resource;
    }

    /**
     * Patch an officer filing object to update on the API.
     */
    public async patchOfficerFiling (transactionId: string, filingId: string, officerFiling: OfficerFiling): Promise<Resource<FilingResponse> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/officers/${filingId}`;
        const officerFilingResource: OfficerFilingDto = this.mapToDto(officerFiling);

        const resp = await this.client.httpPatch(url, officerFilingResource);
        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<FilingResponse> = {
            httpStatusCode: resp.status
        };
        const body = resp.body as FilingResponseDto;
        this.populateResource(resource, body);
        return resource;
    }

    /**
     * Map an OfficerFiling object to an OfficerFilingDto which represents the expected json data model
     */
    private mapToDto (officerFiling: OfficerFiling): OfficerFilingDto {
        return {
            reference_appointment_id: officerFiling.referenceAppointmentId,
            reference_etag: officerFiling.referenceEtag,
            resigned_on: officerFiling.resignedOn,
            appointed_on: officerFiling.appointedOn,
            name: officerFiling.name,
            first_name: officerFiling.firstName,
            middle_names: officerFiling.middleNames,
            last_name: officerFiling.lastName,
            title: officerFiling.title,
            former_names: officerFiling.formerNames,
            occupation: officerFiling.occupation,
            date_of_birth: officerFiling.dateOfBirth,
            nationality1: officerFiling.nationality1,
            nationality2: officerFiling.nationality2,
            nationality3: officerFiling.nationality3,
            nationality2_link: officerFiling.nationality2Link,
            nationality3_link: officerFiling.nationality3Link,
            residential_address: this.mapAddressToDto(officerFiling.residentialAddress),
            residentialAddressBackLink: officerFiling.residentialAddressBackLink,
            service_address: this.mapAddressToDto(officerFiling.serviceAddress)
        }
    }

    /**
     * Map an Address to AddressResource which represents the expected json data model
     */
    private mapAddressToDto (address: Address): AddressResource {
        if (address === undefined) {
            return undefined;
        }
        return {
            address_line_1: address.addressLine1,
            address_line_2: address.addressLine2,
            care_of: address.careOf,
            country: address.country,
            locality: address.locality,
            po_box: address.poBox,
            postal_code: address.postalCode,
            premises: address.premises,
            region: address.region
        }
    }

    /**
     * Map an OfficerFilingDto to an OfficerFiling object
     */
    private mapFromDto (officerFilingDto: OfficerFilingDto): OfficerFiling {
        return {
            referenceAppointmentId: officerFilingDto.reference_appointment_id,
            referenceEtag: officerFilingDto.reference_etag,
            resignedOn: officerFilingDto.resigned_on,
            appointedOn: officerFilingDto.appointed_on,
            name: officerFilingDto.name,
            firstName: officerFilingDto.first_name,
            middleNames: officerFilingDto.middle_names,
            lastName: officerFilingDto.last_name,
            title: officerFilingDto.title,
            formerNames: officerFilingDto.former_names,
            occupation: officerFilingDto.occupation,
            dateOfBirth: officerFilingDto.date_of_birth,
            nationality1: officerFilingDto.nationality1,
            nationality2: officerFilingDto.nationality2,
            nationality3: officerFilingDto.nationality3,
            nationality2Link: officerFilingDto.nationality2_link,
            nationality3Link: officerFilingDto.nationality3_link,
            residentialAddress: this.mapAddressFromDto(officerFilingDto.residential_address),
            residentialAddressBackLink: officerFilingDto.residentialAddressBackLink,
            serviceAddress: this.mapAddressFromDto(officerFilingDto.service_address)
        }
    }

    /**
     * Map an AddressResource to an Address object
     */
    private mapAddressFromDto (addressDto: AddressResource): Address {
        if (addressDto === undefined) {
            return undefined;
        }
        return {
            addressLine1: addressDto.address_line_1,
            addressLine2: addressDto.address_line_2,
            careOf: addressDto.care_of,
            country: addressDto.country,
            locality: addressDto.locality,
            poBox: addressDto.po_box,
            postalCode: addressDto.postal_code,
            premises: addressDto.premises,
            region: addressDto.region
        }
    }

    /**
     * Map a FilingResponseDto in its json data model to a regular FilingResponse object
     * @param resource Where the FilingResponse fields will be set
     * @param body The FilingResponseDto json data model that will be mapped
     */
    private populateResource (resource: Resource<FilingResponse>, body: FilingResponseDto) {
        resource.resource = {
            id: body.id,
            data: this.mapFromDto(body.data)
        };
    }

    private async getCompanyOfficerDetails (url: string): Promise<Resource<CompanyOfficer[]> | ApiErrorResponse> {
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<CompanyOfficer[]> = { httpStatusCode: resp.status };

        const body = resp.body as CompanyOfficerResource[];

        resource.resource = Mapping.camelCaseKeys<CompanyOfficer[]>(body);

        return resource;
    }
}
