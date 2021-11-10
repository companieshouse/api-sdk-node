import {
    ActiveOfficerDetails,
    ActiveOfficerDetailsResource,
    ActiveOfficerDetailsData,
    ActiveOfficerDetailsDataResource,
    Address,
    AddressResource,
    CompanyValidationResponse,
    CompanyValidationResponseResource,
    ConfirmationStatementCreated,
    ConfirmationStatementCreatedResource,
    ConfirmationStatementSubmission,
    ConfirmationStatementSubmissionData,
    ConfirmationStatementSubmissionDataResource,
    ConfirmationStatementSubmissionResource,
    PersonOfSignificantControl,
    PersonsOfSignificantControlData,
    PersonsOfSignificantControlDataResource,
    PersonOfSignificantControlResource,
    RegisteredOfficeAddressData,
    RegisteredOfficeAddressDataResource,
    SicCode,
    SicCodeData,
    SicCodeDataResource,
    SicCodeResource,
    StatementOfCapital,
    StatementOfCapitalData,
    StatementOfCapitalDataResource,
    StatementOfCapitalResource,
    NameElementsResource,
    NameElements,
    Shareholder,
    ShareholderResource,
    ShareholderData,
    ShareholderDataResource,
    RegisterLocation,
    RegisterLocationResource,
    RegisterLocationsData,
    RegisterLocationsDataResource,
    NextMadeUpToDate,
    NextMadeUpToDateResource,
    TradingStatusData,
    TradingStatusDataResource
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getEligibility (companyNumber: string): Promise<Resource<CompanyValidationResponse>> {
        const url = `confirmation-statement/company/${companyNumber}/eligibility`;
        const resp: HttpResponse = await this.client.httpGet(url);

        const resource: Resource<CompanyValidationResponse> = {
            httpStatusCode: resp.status
        };

        if (resp.error && resp.status !== 400) {
            return resource;
        }

        const apiResource: CompanyValidationResponseResource = resp.body ? resp.body : resp.error;

        if (!apiResource) {
            throw new Error(`No body or error body returned from ${url} API call - http status from API = ${resp.status}`);
        }

        resource.resource = this.mapToCompanyValidationResponse(apiResource);

        return resource;
    }

    public async postNewConfirmationStatement (transactionId: string): Promise<Resource<ConfirmationStatementCreated | CompanyValidationResponse> | ApiErrorResponse> {
        const resp: HttpResponse =
            await this.client.httpPost(this.getConfirmationStatementUrlIncTransactionId(transactionId) + "/");

        if (resp.error && resp.status !== 400) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<ConfirmationStatementCreated | CompanyValidationResponse> = {
            httpStatusCode: resp.status
        };

        if (resp.status === 400) {
            // According to api spec resp.body can only be a CompanyValidationResource
            resource.resource = this.mapToCompanyValidationResponse(resp.body);
        }

        if (resp.status === 201) {
            // According to api spec resp.body can only be a ConfirmationStatementCreatedResource
            resource.resource = this.mapToConfirmationStatementCreated(resp.body)
        }
        return resource;
    }

    public async postUpdateConfirmationStatement (transactionId: string, confirmationStatementId: string,
        csSubmission: ConfirmationStatementSubmission): Promise<Resource<ConfirmationStatementSubmission> | ApiErrorResponse> {
        const baseUrl = this.getConfirmationStatementUrlIncTransactionId(transactionId)
        const resp: HttpResponse =
            await this.client.httpPost(`${baseUrl}/${confirmationStatementId}`,
                this.mapToConfirmationStatementSubmissionResource(csSubmission));

        const resource: Resource<ConfirmationStatementSubmission> = {
            httpStatusCode: resp.status
        };

        if (resp.status === 404) {
            return resource;
        }

        if (resp.status === 200) {
            resource.resource = this.mapToConfirmationStatementSubmission(resp.body)
        }
        return resource;
    }

    public async postConfirmationStatementSubmission (transactionId: string): Promise<Resource<ConfirmationStatementSubmission>> {
        const baseUrl = this.getConfirmationStatementUrlIncTransactionId(transactionId);
        const resp = await this.client.httpPost(`${baseUrl}/submit`);

        const resource: Resource<ConfirmationStatementSubmission> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = this.mapToConfirmationStatementSubmission(resp.body);

        return resource;
    }

    public async getStatementOfCapital (transactionId: string, confirmationStatementId: string): Promise<Resource<StatementOfCapital> | ApiErrorResponse> {
        const url: string = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/statement-of-capital`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<StatementOfCapital> = {
            httpStatusCode: resp.status
        };

        resource.resource = this.mapToStatementOfCapital(resp.body);

        return resource;
    }

    public async getActiveOfficerDetails (transactionId: string, confirmationStatementId: string): Promise<Resource<ActiveOfficerDetails> | ApiErrorResponse> {
        const url = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/active-director-details`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<ActiveOfficerDetails> = { httpStatusCode: resp.status };

        resource.resource = this.mapToActiveOfficerDetails(resp.body);

        return resource;
    }

    public async getRegisterLocations (transactionId: string, confirmationStatementId: string): Promise<Resource<RegisterLocation[]> | ApiErrorResponse> {
        const url = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/register-locations`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<RegisterLocation[]> = { httpStatusCode: resp.status };

        resource.resource = this.mapToRegisterLocation(resp.body);

        return resource;
    }

    public async getPersonsOfSignificantControl (transactionId: string, confirmationStatementId: string): Promise<Resource<PersonOfSignificantControl[]> | ApiErrorResponse> {
        const url = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/persons-of-significant-control`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<PersonOfSignificantControl[]> = { httpStatusCode: resp.status };

        resource.resource = this.mapToPersonsOfSignificantControl(resp.body);

        return resource;
    }

    public async getShareholders (transactionId: string, confirmationStatementId: string): Promise<Resource<Shareholder[]> | ApiErrorResponse> {
        const url = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/shareholders`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<Shareholder[]> = { httpStatusCode: resp.status };

        resource.resource = this.mapToShareholder(resp.body);

        return resource;
    }

    public async getConfirmationStatementSubmission (transactionId: string, confirmationStatementId: string): Promise<Resource<ConfirmationStatementSubmission> | ApiErrorResponse> {
        const baseUrl = this.getConfirmationStatementUrlIncTransactionId(transactionId);
        const resp: HttpResponse = await this.client.httpGet(`${baseUrl}/${confirmationStatementId}`);

        if (resp.status >= 400) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<ConfirmationStatementSubmission> = {
            httpStatusCode: resp.status
        };

        resource.resource = this.mapToConfirmationStatementSubmission(resp.body);

        return resource;
    }

    public async getNextMadeUpToDate (companyNumber: string): Promise<Resource<NextMadeUpToDate> | ApiErrorResponse> {
        const url: string = `${this.getConfirmationStatementUrl(companyNumber)}/next-made-up-to-date`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<NextMadeUpToDate> = {
            httpStatusCode: resp.status
        };

        resource.resource = this.mapToNextMadeUpToDate(resp.body);

        return resource;
    }

    private mapToConfirmationStatementSubmission (apiResource: ConfirmationStatementSubmissionResource): ConfirmationStatementSubmission {
        return {
            id: apiResource.id,
            data: this.mapToConfirmationStatementSubmissionData(apiResource.data),
            links: apiResource.links
        }
    }

    private mapToConfirmationStatementSubmissionResource (submission: ConfirmationStatementSubmission): ConfirmationStatementSubmissionResource {
        return {
            id: submission.id,
            data: this.mapToConfirmationStatementSubmissionDataResource(submission.data),
            links: submission.links
        }
    }

    private mapToCompanyValidationResponse (apiResource: CompanyValidationResponseResource): CompanyValidationResponse {
        return {
            eligibilityStatusCode: apiResource.eligibility_status_code
        }
    }

    private mapToConfirmationStatementSubmissionData (dataResource: ConfirmationStatementSubmissionDataResource): ConfirmationStatementSubmissionData {
        return {
            confirmationStatementMadeUpToDate: dataResource.confirmation_statement_made_up_to_date,
            ...(dataResource.persons_significant_control_data && { personsSignificantControlData: this.mapToPersonsOfSignificantControlData(dataResource.persons_significant_control_data) }),
            ...(dataResource.statement_of_capital_data && { statementOfCapitalData: this.mapToStatementOfCapitalData(dataResource.statement_of_capital_data) }),
            ...(dataResource.sic_code_data && { sicCodeData: this.mapToSicCodeData(dataResource.sic_code_data) }),
            ...(dataResource.registered_office_address_data && { registeredOfficeAddressData: this.mapToRegisteredOfficeAddressData(dataResource.registered_office_address_data) }),
            ...(dataResource.active_officer_details_data && { activeOfficerDetailsData: this.mapToActiveOfficerDetailsData(dataResource.active_officer_details_data) }),
            ...(dataResource.shareholder_data && { shareholderData: this.mapToShareholderData(dataResource.shareholder_data) }),
            ...(dataResource.register_locations_data && { registerLocationsData: this.mapToRegisterLocationsData(dataResource.register_locations_data) }),
            ...(dataResource.trading_status_data && { tradingStatusData: this.mapToTradingStatusData(dataResource.trading_status_data) })
        }
    }

    private mapToConfirmationStatementSubmissionDataResource (data: ConfirmationStatementSubmissionData): ConfirmationStatementSubmissionDataResource {
        return {
            confirmation_statement_made_up_to_date: data.confirmationStatementMadeUpToDate,
            ...(data.personsSignificantControlData && { persons_significant_control_data: this.mapToPersonsOfSignificantControlDataResource(data.personsSignificantControlData) }),
            ...(data.statementOfCapitalData && { statement_of_capital_data: this.mapToStatementOfCapitalDataResource(data.statementOfCapitalData) }),
            ...(data.sicCodeData && { sic_code_data: this.mapToSicCodeDataResource(data.sicCodeData) }),
            ...(data.registeredOfficeAddressData && { registered_office_address_data: this.mapToRegisteredOfficeAddressDataResource(data.registeredOfficeAddressData) }),
            ...(data.activeOfficerDetailsData && { active_officer_details_data: this.mapToActiveOfficerDetailsDataResource(data.activeOfficerDetailsData) }),
            ...(data.shareholderData && { shareholder_data: this.mapToShareholderDataResource(data.shareholderData) }),
            ...(data.registerLocationsData && { register_locations_data: this.mapToRegisterLocationsDataResource(data.registerLocationsData) }),
            ...(data.tradingStatusData && { trading_status_data: this.mapToTradingStatusDataResource(data.tradingStatusData) })
        }
    }

    private mapToPersonsOfSignificantControlData (personsOfSignificantControlDataResource: PersonsOfSignificantControlDataResource): PersonsOfSignificantControlData {
        return {
            sectionStatus: personsOfSignificantControlDataResource.section_status,
            ...(personsOfSignificantControlDataResource.persons_of_significant_control &&
                { personOfSignificantControl: this.mapToPersonsOfSignificantControl(personsOfSignificantControlDataResource.persons_of_significant_control) })
        }
    }

    private mapToPersonsOfSignificantControlDataResource (personOfSignificantControlData: PersonsOfSignificantControlData): PersonsOfSignificantControlDataResource {
        return {
            section_status: personOfSignificantControlData.sectionStatus,
            ...(personOfSignificantControlData.personsOfSignificantControl &&
                { person_of_significant_control: this.mapToPersonsOfSignificantControlResource(personOfSignificantControlData.personsOfSignificantControl) })
        }
    }

    private mapToPersonsOfSignificantControl (pscResourceList: PersonOfSignificantControlResource[]): PersonOfSignificantControl[] {
        const pscList: PersonOfSignificantControl[] = [];
        for (let index = 0; index < pscResourceList.length; index++) {
            const pscResource: PersonOfSignificantControlResource = pscResourceList[index];
            pscList[index] = {
                ...(pscResource.name_elements && { nameElements: this.mapToNameElements(pscResource.name_elements) }),
                ...(pscResource.address && { address: this.mapToAddress(pscResource.address) }),
                ...(pscResource.service_address && { serviceAddress: this.mapToAddress(pscResource.service_address) }),
                appointmentType: pscResource.appointment_type,
                appointmentDate: pscResource.appointment_date,
                naturesOfControl: pscResource.natures_of_control,
                dateOfBirth: pscResource.date_of_birth,
                dateOfBirthIso: pscResource.date_of_birth_iso,
                nationality: pscResource.nationality,
                companyName: pscResource.company_name,
                registerLocation: pscResource.register_location,
                registrationNumber: pscResource.registration_number,
                lawGoverned: pscResource.law_governed,
                legalForm: pscResource.legal_form,
                countryOfResidence: pscResource.country_of_residence
            }
        }
        return pscList;
    }

    private mapToRegisterLocation (regLocResourceList: RegisterLocationResource[]): RegisterLocation[] {
        const regLocList: RegisterLocation[] = [];
        for (let index = 0; index < regLocResourceList.length; index++) {
            const regLocResource: RegisterLocationResource = regLocResourceList[index];
            regLocList[index] = {
                registerTypeDesc: regLocResource.register_type_desc,
                ...(regLocResource.sail_address && { sailAddress: this.mapToAddress(regLocResource.sail_address) })
            }
        }
        return regLocList;
    }

    private mapToPersonsOfSignificantControlResource (pscList: PersonOfSignificantControl[]): PersonOfSignificantControlResource[] {
        const pscResourceList: PersonOfSignificantControlResource[] = [];
        for (let index = 0; index < pscList.length; index++) {
            const psc: PersonOfSignificantControl = pscList[index];
            pscResourceList[index] = {
                ...(psc.nameElements && { name_elements: this.mapToNameElementsResource(psc.nameElements) }),
                ...(psc.address && { address: this.mapToAddressResource(psc.address) }),
                ...(psc.serviceAddress && { service_address: this.mapToAddressResource(psc.serviceAddress) }),
                appointment_type: psc.appointmentType,
                appointment_date: psc.appointmentDate,
                natures_of_control: psc.naturesOfControl,
                date_of_birth: psc.dateOfBirth,
                date_of_birth_iso: psc.dateOfBirthIso,
                nationality: psc.nationality,
                company_name: psc.companyName,
                register_location: psc.registerLocation,
                registration_number: psc.registrationNumber,
                law_governed: psc.lawGoverned,
                legal_form: psc.legalForm,
                country_of_residence: psc.countryOfResidence
            }
        }
        return pscResourceList;
    }

    private mapToNameElements (nameElementsResource: NameElementsResource): NameElements {
        return {
            forename: nameElementsResource.forename,
            otherForenames: nameElementsResource.other_forenames,
            middleName: nameElementsResource.middle_name,
            surname: nameElementsResource.surname,
            title: nameElementsResource.title
        };
    }

    private mapToNameElementsResource (nameElements: NameElements): NameElementsResource {
        return {
            forename: nameElements.forename,
            other_forenames: nameElements.otherForenames,
            middle_name: nameElements.middleName,
            surname: nameElements.surname,
            title: nameElements.title
        };
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

    private mapToAddressResource (address: Address): AddressResource {
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

    private mapToStatementOfCapitalData (socResource: StatementOfCapitalDataResource): StatementOfCapitalData {
        return {
            sectionStatus: socResource.section_status,
            ...(socResource.statement_of_capital && { statementOfCapital: this.mapToStatementOfCapital(socResource.statement_of_capital) })
        }
    }

    private mapToStatementOfCapitalDataResource (soc: StatementOfCapitalData): StatementOfCapitalDataResource {
        return {
            section_status: soc.sectionStatus,
            ...(soc.statementOfCapital && { statement_of_capital: this.mapToStatementOfCapitalResource(soc.statementOfCapital) })
        }
    }

    private mapToStatementOfCapital (apiResource: StatementOfCapitalResource) {
        return {
            classOfShares: apiResource.class_of_shares,
            currency: apiResource.currency,
            numberAllotted: apiResource.number_allotted,
            aggregateNominalValue: apiResource.aggregate_nominal_value,
            prescribedParticulars: apiResource.prescribed_particulars,
            totalNumberOfShares: apiResource.total_number_of_shares,
            totalAggregateNominalValue: apiResource.total_aggregate_nominal_value,
            totalAmountUnpaidForCurrency: apiResource.total_amount_unpaid_for_currency
        }
    }

    private mapToStatementOfCapitalResource (submission: StatementOfCapital): StatementOfCapitalResource {
        return {
            class_of_shares: submission.classOfShares,
            currency: submission.currency,
            number_allotted: submission.numberAllotted,
            aggregate_nominal_value: submission.aggregateNominalValue,
            prescribed_particulars: submission.prescribedParticulars,
            total_number_of_shares: submission.totalNumberOfShares,
            total_aggregate_nominal_value: submission.totalAggregateNominalValue,
            total_amount_unpaid_for_currency: submission.totalAmountUnpaidForCurrency
        }
    }

    private mapToConfirmationStatementCreated (apiResource: ConfirmationStatementCreatedResource): ConfirmationStatementCreated {
        return {
            id: apiResource.id
        }
    }

    private mapToActiveOfficerDetails (apiResource: ActiveOfficerDetailsResource): ActiveOfficerDetails {
        return {
            foreName1: apiResource.fore_name_1,
            foreName2: apiResource.fore_name_2,
            surname: apiResource.surname,
            occupation: apiResource.occupation,
            nationality: apiResource.nationality,
            dateOfBirth: apiResource.date_of_birth,
            dateOfAppointment: apiResource.date_of_appointment,
            countryOfResidence: apiResource.country_of_residence,
            ...(apiResource.service_address && { serviceAddress: this.mapToAddress(apiResource.service_address) }),
            ...(apiResource.residential_address && { residentialAddress: this.mapToAddress(apiResource.residential_address) }),
            isCorporate: apiResource.is_corporate,
            role: apiResource.role,
            placeRegistered: apiResource.place_registered,
            registrationNumber: apiResource.registration_number,
            lawGoverned: apiResource.law_governed,
            legalForm: apiResource.legal_form,
            identificationType: apiResource.identification_type
        }
    }

    private mapToSicCodeDataResource (sicCode: SicCodeData): SicCodeDataResource {
        return {
            section_status: sicCode.sectionStatus,
            ...(sicCode.sicCode && { sic_code: this.mapToSicCodeResource(sicCode.sicCode) })
        }
    }

    private mapToSicCodeData (sicCodeResource: SicCodeDataResource): SicCodeData {
        return {
            sectionStatus: sicCodeResource.section_status,
            ...(sicCodeResource.sic_code && { sicCode: this.mapToSicCode(sicCodeResource.sic_code) })
        }
    }

    private mapToRegisteredOfficeAddressDataResource (registeredOfficeAddress: RegisteredOfficeAddressData): RegisteredOfficeAddressDataResource {
        return {
            section_status: registeredOfficeAddress.sectionStatus
        }
    }

    private mapToRegisteredOfficeAddressData (registeredOfficeAddressResource: RegisteredOfficeAddressDataResource): RegisteredOfficeAddressData {
        return {
            sectionStatus: registeredOfficeAddressResource.section_status
        }
    }

    private mapToActiveOfficerDetailsDataResource (activeOfficerDetailsData: ActiveOfficerDetailsData): ActiveOfficerDetailsDataResource {
        return {
            section_status: activeOfficerDetailsData.sectionStatus
        }
    }

    private mapToActiveOfficerDetailsData (activeOfficerDetailsDataResource: ActiveOfficerDetailsDataResource): ActiveOfficerDetailsData {
        return {
            sectionStatus: activeOfficerDetailsDataResource.section_status
        }
    }

    private mapToSicCode (apiResource: SicCodeResource): SicCode {
        return {
            code: apiResource.code,
            description: apiResource.description
        }
    }

    private mapToSicCodeResource (submission: SicCode): SicCodeResource {
        return {
            code: submission.code,
            description: submission.description
        }
    }

    private mapToShareholder (shareholderResourceList: ShareholderResource[]): Shareholder[] {
        const shareholderList: Shareholder[] = [];
        for (let index = 0; index < shareholderResourceList.length; index++) {
            const shareholderResource: ShareholderResource = shareholderResourceList[index];
            shareholderList[index] = {
                foreName1: shareholderResource.fore_name_1,
                foreName2: shareholderResource.fore_name_2,
                surname: shareholderResource.surname,
                shares: shareholderResource.shares,
                classOfShares: shareholderResource.class_of_shares,
                currency: shareholderResource.currency
            }
        }
        return shareholderList;
    }

    private mapToShareholderResource (shareholderList: Shareholder[]): ShareholderResource[] {
        const shareholderResourceList: ShareholderResource[] = [];
        for (let index = 0; index < shareholderList.length; index++) {
            const shareholder: Shareholder = shareholderList[index];
            shareholderResourceList[index] = {
                fore_name_1: shareholder.foreName1,
                fore_name_2: shareholder.foreName2,
                surname: shareholder.surname,
                shares: shareholder.shares,
                class_of_shares: shareholder.classOfShares,
                currency: shareholder.currency
            }
        }
        return shareholderResourceList;
    }

    private mapToShareholderDataResource (shareholder: ShareholderData): ShareholderDataResource {
        return {
            section_status: shareholder.sectionStatus
        }
    }

    private mapToShareholderData (shareholderResource: ShareholderDataResource): ShareholderData {
        return {
            sectionStatus: shareholderResource.section_status
        }
    }

    private mapToRegisterLocationsDataResource (registerLocations: RegisterLocationsData): RegisterLocationsDataResource {
        return {
            section_status: registerLocations.sectionStatus
        }
    }

    private mapToRegisterLocationsData (registerLocations: RegisterLocationsDataResource): RegisterLocationsData {
        return {
            sectionStatus: registerLocations.section_status
        }
    }

    private mapToNextMadeUpToDate (nextMadeUpToDateResource: NextMadeUpToDateResource): NextMadeUpToDate {
        return {
            currentNextMadeUpToDate: nextMadeUpToDateResource.current_next_made_up_to_date,
            ...(typeof nextMadeUpToDateResource.is_due !== "undefined" && { isDue: nextMadeUpToDateResource.is_due }),
            ...(nextMadeUpToDateResource.new_next_made_up_to_date && { newNextMadeUpToDate: nextMadeUpToDateResource.new_next_made_up_to_date })
        } as NextMadeUpToDate;
    }

    private mapToTradingStatusDataResource (tradingStatusData: TradingStatusData): TradingStatusDataResource {
        return {
            trading_status_answer: tradingStatusData.tradingStatusAnswer
        }
    }

    private mapToTradingStatusData (tradingStatusDataResource: TradingStatusDataResource): TradingStatusData {
        return {
            tradingStatusAnswer: tradingStatusDataResource.trading_status_answer
        }
    }

    private getConfirmationStatementUrlIncTransactionId (transactionId: string) {
        return `/transactions/${transactionId}/confirmation-statement`;
    }

    private getConfirmationStatementUrl (companyNumber: string) {
        return `/confirmation-statement/company/${companyNumber}`;
    }
}
