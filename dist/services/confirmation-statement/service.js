"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(client) {
        this.client = client;
    }
    getEligibility(companyNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `confirmation-statement/company/${companyNumber}/eligibility`;
            const resp = yield this.client.httpGet(url);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error && resp.status !== 400) {
                return resource;
            }
            const apiResource = resp.body ? resp.body : resp.error;
            if (!apiResource) {
                throw new Error(`No body or error body returned from ${url} API call - http status from API = ${resp.status}`);
            }
            resource.resource = this.mapToCompanyValidationResponse(apiResource);
            return resource;
        });
    }
    postNewConfirmationStatement(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpPost(this.getConfirmationStatementUrlIncTransactionId(transactionId) + "/");
            if (resp.error && resp.status !== 400) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.status === 400) {
                // According to api spec resp.body can only be a CompanyValidationResource
                resource.resource = this.mapToCompanyValidationResponse(resp.body);
            }
            if (resp.status === 201) {
                // According to api spec resp.body can only be a ConfirmationStatementCreatedResource
                resource.resource = this.mapToConfirmationStatementCreated(resp.body);
            }
            return resource;
        });
    }
    postUpdateConfirmationStatement(transactionId, confirmationStatementId, csSubmission) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.getConfirmationStatementUrlIncTransactionId(transactionId);
            const resp = yield this.client.httpPost(`${baseUrl}/${confirmationStatementId}`, this.mapToConfirmationStatementSubmissionResource(csSubmission));
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.status === 404) {
                return resource;
            }
            if (resp.status === 200) {
                resource.resource = this.mapToConfirmationStatementSubmission(resp.body);
            }
            return resource;
        });
    }
    postConfirmationStatementSubmission(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.getConfirmationStatementUrlIncTransactionId(transactionId);
            const resp = yield this.client.httpPost(`${baseUrl}/submit`);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            resource.resource = this.mapToConfirmationStatementSubmission(resp.body);
            return resource;
        });
    }
    getStatementOfCapital(transactionId, confirmationStatementId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/statement-of-capital`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            resource.resource = this.mapToStatementOfCapital(resp.body);
            return resource;
        });
    }
    getActiveOfficerDetails(transactionId, confirmationStatementId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/active-director-details`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = { httpStatusCode: resp.status };
            resource.resource = this.mapToActiveOfficerDetails(resp.body);
            return resource;
        });
    }
    getListActiveOfficerDetails(transactionId, confirmationStatementId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/active-officers-details`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = { httpStatusCode: resp.status };
            resource.resource = this.mapToListActiveOfficerDetails(resp.body);
            return resource;
        });
    }
    getRegisterLocations(transactionId, confirmationStatementId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/register-locations`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = { httpStatusCode: resp.status };
            resource.resource = this.mapToRegisterLocation(resp.body);
            return resource;
        });
    }
    getPersonsOfSignificantControl(transactionId, confirmationStatementId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/persons-of-significant-control`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = { httpStatusCode: resp.status };
            resource.resource = this.mapToPersonsOfSignificantControl(resp.body);
            return resource;
        });
    }
    getShareholders(transactionId, confirmationStatementId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getConfirmationStatementUrlIncTransactionId(transactionId)}/${confirmationStatementId}/shareholders`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = { httpStatusCode: resp.status };
            resource.resource = this.mapToShareholder(resp.body);
            return resource;
        });
    }
    getConfirmationStatementSubmission(transactionId, confirmationStatementId) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.getConfirmationStatementUrlIncTransactionId(transactionId);
            const resp = yield this.client.httpGet(`${baseUrl}/${confirmationStatementId}`);
            if (resp.status >= 400) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            resource.resource = this.mapToConfirmationStatementSubmission(resp.body);
            return resource;
        });
    }
    getNextMadeUpToDate(companyNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getConfirmationStatementUrl(companyNumber)}/next-made-up-to-date`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            resource.resource = this.mapToNextMadeUpToDate(resp.body);
            return resource;
        });
    }
    mapToConfirmationStatementSubmission(apiResource) {
        return {
            id: apiResource.id,
            data: this.mapToConfirmationStatementSubmissionData(apiResource.data),
            links: apiResource.links
        };
    }
    mapToConfirmationStatementSubmissionResource(submission) {
        return {
            id: submission.id,
            data: this.mapToConfirmationStatementSubmissionDataResource(submission.data),
            links: submission.links
        };
    }
    mapToCompanyValidationResponse(apiResource) {
        return {
            eligibilityStatusCode: apiResource.eligibility_status_code
        };
    }
    mapToConfirmationStatementSubmissionData(dataResource) {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ confirmationStatementMadeUpToDate: dataResource.confirmation_statement_made_up_to_date }, (dataResource.persons_significant_control_data && { personsSignificantControlData: this.mapToPersonsOfSignificantControlData(dataResource.persons_significant_control_data) })), (dataResource.statement_of_capital_data && { statementOfCapitalData: this.mapToStatementOfCapitalData(dataResource.statement_of_capital_data) })), (dataResource.sic_code_data && { sicCodeData: this.mapToSicCodeData(dataResource.sic_code_data) })), (dataResource.registered_office_address_data && { registeredOfficeAddressData: this.mapToRegisteredOfficeAddressData(dataResource.registered_office_address_data) })), (dataResource.active_officer_details_data && { activeOfficerDetailsData: this.mapToActiveOfficerDetailsData(dataResource.active_officer_details_data) })), (dataResource.shareholder_data && { shareholderData: this.mapToShareholderData(dataResource.shareholder_data) })), (dataResource.register_locations_data && { registerLocationsData: this.mapToRegisterLocationsData(dataResource.register_locations_data) })), (dataResource.trading_status_data && { tradingStatusData: this.mapToTradingStatusData(dataResource.trading_status_data) }));
    }
    mapToConfirmationStatementSubmissionDataResource(data) {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ confirmation_statement_made_up_to_date: data.confirmationStatementMadeUpToDate }, (data.personsSignificantControlData && { persons_significant_control_data: this.mapToPersonsOfSignificantControlDataResource(data.personsSignificantControlData) })), (data.statementOfCapitalData && { statement_of_capital_data: this.mapToStatementOfCapitalDataResource(data.statementOfCapitalData) })), (data.sicCodeData && { sic_code_data: this.mapToSicCodeDataResource(data.sicCodeData) })), (data.registeredOfficeAddressData && { registered_office_address_data: this.mapToRegisteredOfficeAddressDataResource(data.registeredOfficeAddressData) })), (data.activeOfficerDetailsData && { active_officer_details_data: this.mapToActiveOfficerDetailsDataResource(data.activeOfficerDetailsData) })), (data.shareholderData && { shareholder_data: this.mapToShareholderDataResource(data.shareholderData) })), (data.registerLocationsData && { register_locations_data: this.mapToRegisterLocationsDataResource(data.registerLocationsData) })), (data.tradingStatusData && { trading_status_data: this.mapToTradingStatusDataResource(data.tradingStatusData) }));
    }
    mapToPersonsOfSignificantControlData(personsOfSignificantControlDataResource) {
        return Object.assign({ sectionStatus: personsOfSignificantControlDataResource.section_status }, (personsOfSignificantControlDataResource.persons_of_significant_control &&
            { personOfSignificantControl: this.mapToPersonsOfSignificantControl(personsOfSignificantControlDataResource.persons_of_significant_control) }));
    }
    mapToPersonsOfSignificantControlDataResource(personOfSignificantControlData) {
        return Object.assign({ section_status: personOfSignificantControlData.sectionStatus }, (personOfSignificantControlData.personsOfSignificantControl &&
            { person_of_significant_control: this.mapToPersonsOfSignificantControlResource(personOfSignificantControlData.personsOfSignificantControl) }));
    }
    mapToPersonsOfSignificantControl(pscResourceList) {
        const pscList = [];
        for (let index = 0; index < pscResourceList.length; index++) {
            const pscResource = pscResourceList[index];
            pscList[index] = Object.assign(Object.assign(Object.assign(Object.assign({}, (pscResource.name_elements && { nameElements: this.mapToNameElements(pscResource.name_elements) })), (pscResource.address && { address: this.mapToAddress(pscResource.address) })), (pscResource.service_address && { serviceAddress: this.mapToAddress(pscResource.service_address) })), { appointmentType: pscResource.appointment_type, appointmentDate: pscResource.appointment_date, naturesOfControl: pscResource.natures_of_control, dateOfBirth: pscResource.date_of_birth, dateOfBirthIso: pscResource.date_of_birth_iso, nationality: pscResource.nationality, companyName: pscResource.company_name, registerLocation: pscResource.register_location, registrationNumber: pscResource.registration_number, lawGoverned: pscResource.law_governed, legalForm: pscResource.legal_form, countryOfResidence: pscResource.country_of_residence });
        }
        return pscList;
    }
    mapToRegisterLocation(regLocResourceList) {
        const regLocList = [];
        for (let index = 0; index < regLocResourceList.length; index++) {
            const regLocResource = regLocResourceList[index];
            regLocList[index] = Object.assign({ registerTypeDesc: regLocResource.register_type_desc }, (regLocResource.sail_address && { sailAddress: this.mapToAddress(regLocResource.sail_address) }));
        }
        return regLocList;
    }
    mapToPersonsOfSignificantControlResource(pscList) {
        const pscResourceList = [];
        for (let index = 0; index < pscList.length; index++) {
            const psc = pscList[index];
            pscResourceList[index] = Object.assign(Object.assign(Object.assign(Object.assign({}, (psc.nameElements && { name_elements: this.mapToNameElementsResource(psc.nameElements) })), (psc.address && { address: this.mapToAddressResource(psc.address) })), (psc.serviceAddress && { service_address: this.mapToAddressResource(psc.serviceAddress) })), { appointment_type: psc.appointmentType, appointment_date: psc.appointmentDate, natures_of_control: psc.naturesOfControl, date_of_birth: psc.dateOfBirth, date_of_birth_iso: psc.dateOfBirthIso, nationality: psc.nationality, company_name: psc.companyName, register_location: psc.registerLocation, registration_number: psc.registrationNumber, law_governed: psc.lawGoverned, legal_form: psc.legalForm, country_of_residence: psc.countryOfResidence });
        }
        return pscResourceList;
    }
    mapToNameElements(nameElementsResource) {
        return {
            forename: nameElementsResource.forename,
            otherForenames: nameElementsResource.other_forenames,
            middleName: nameElementsResource.middle_name,
            surname: nameElementsResource.surname,
            title: nameElementsResource.title
        };
    }
    mapToNameElementsResource(nameElements) {
        return {
            forename: nameElements.forename,
            other_forenames: nameElements.otherForenames,
            middle_name: nameElements.middleName,
            surname: nameElements.surname,
            title: nameElements.title
        };
    }
    mapToAddress(addressResource) {
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
        };
    }
    mapToAddressResource(address) {
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
        };
    }
    mapToStatementOfCapitalData(socResource) {
        return Object.assign({ sectionStatus: socResource.section_status }, (socResource.statement_of_capital && { statementOfCapital: this.mapToStatementOfCapital(socResource.statement_of_capital) }));
    }
    mapToStatementOfCapitalDataResource(soc) {
        return Object.assign({ section_status: soc.sectionStatus }, (soc.statementOfCapital && { statement_of_capital: this.mapToStatementOfCapitalResource(soc.statementOfCapital) }));
    }
    mapToStatementOfCapital(apiResource) {
        return {
            classOfShares: apiResource.class_of_shares,
            currency: apiResource.currency,
            numberAllotted: apiResource.number_allotted,
            aggregateNominalValue: apiResource.aggregate_nominal_value,
            prescribedParticulars: apiResource.prescribed_particulars,
            totalNumberOfShares: apiResource.total_number_of_shares,
            totalAggregateNominalValue: apiResource.total_aggregate_nominal_value,
            totalAmountUnpaidForCurrency: apiResource.total_amount_unpaid_for_currency
        };
    }
    mapToStatementOfCapitalResource(submission) {
        return {
            class_of_shares: submission.classOfShares,
            currency: submission.currency,
            number_allotted: submission.numberAllotted,
            aggregate_nominal_value: submission.aggregateNominalValue,
            prescribed_particulars: submission.prescribedParticulars,
            total_number_of_shares: submission.totalNumberOfShares,
            total_aggregate_nominal_value: submission.totalAggregateNominalValue,
            total_amount_unpaid_for_currency: submission.totalAmountUnpaidForCurrency
        };
    }
    mapToConfirmationStatementCreated(apiResource) {
        return {
            id: apiResource.id
        };
    }
    mapToListActiveOfficerDetails(officerResourceList) {
        const officerList = [];
        for (let index = 0; index < officerResourceList.length; index++) {
            const officerResource = officerResourceList[index];
            officerList[index] = Object.assign(Object.assign(Object.assign({ foreName1: officerResource.fore_name_1, foreName2: officerResource.fore_name_2, surname: officerResource.surname, occupation: officerResource.occupation, nationality: officerResource.nationality, dateOfBirth: officerResource.date_of_birth, dateOfAppointment: officerResource.date_of_appointment, countryOfResidence: officerResource.country_of_residence }, (officerResource.service_address && { serviceAddress: this.mapToAddress(officerResource.service_address) })), (officerResource.residential_address && { residentialAddress: this.mapToAddress(officerResource.residential_address) })), { isCorporate: officerResource.is_corporate, role: officerResource.role, placeRegistered: officerResource.place_registered, registrationNumber: officerResource.registration_number, lawGoverned: officerResource.law_governed, legalForm: officerResource.legal_form, identificationType: officerResource.identification_type });
        }
        return officerList;
    }
    mapToActiveOfficerDetails(apiResource) {
        return Object.assign(Object.assign(Object.assign({ foreName1: apiResource.fore_name_1, foreName2: apiResource.fore_name_2, surname: apiResource.surname, occupation: apiResource.occupation, nationality: apiResource.nationality, dateOfBirth: apiResource.date_of_birth, dateOfAppointment: apiResource.date_of_appointment, countryOfResidence: apiResource.country_of_residence }, (apiResource.service_address && { serviceAddress: this.mapToAddress(apiResource.service_address) })), (apiResource.residential_address && { residentialAddress: this.mapToAddress(apiResource.residential_address) })), { isCorporate: apiResource.is_corporate, role: apiResource.role, placeRegistered: apiResource.place_registered, registrationNumber: apiResource.registration_number, lawGoverned: apiResource.law_governed, legalForm: apiResource.legal_form, identificationType: apiResource.identification_type });
    }
    mapToSicCodeDataResource(sicCode) {
        return Object.assign({ section_status: sicCode.sectionStatus }, (sicCode.sicCode && { sic_code: this.mapToSicCodeResource(sicCode.sicCode) }));
    }
    mapToSicCodeData(sicCodeResource) {
        return Object.assign({ sectionStatus: sicCodeResource.section_status }, (sicCodeResource.sic_code && { sicCode: this.mapToSicCode(sicCodeResource.sic_code) }));
    }
    mapToRegisteredOfficeAddressDataResource(registeredOfficeAddress) {
        return {
            section_status: registeredOfficeAddress.sectionStatus
        };
    }
    mapToRegisteredOfficeAddressData(registeredOfficeAddressResource) {
        return {
            sectionStatus: registeredOfficeAddressResource.section_status
        };
    }
    mapToActiveOfficerDetailsDataResource(activeOfficerDetailsData) {
        return {
            section_status: activeOfficerDetailsData.sectionStatus
        };
    }
    mapToActiveOfficerDetailsData(activeOfficerDetailsDataResource) {
        return {
            sectionStatus: activeOfficerDetailsDataResource.section_status
        };
    }
    mapToSicCode(apiResource) {
        return {
            code: apiResource.code,
            description: apiResource.description
        };
    }
    mapToSicCodeResource(submission) {
        return {
            code: submission.code,
            description: submission.description
        };
    }
    mapToShareholder(shareholderResourceList) {
        const shareholderList = [];
        for (let index = 0; index < shareholderResourceList.length; index++) {
            const shareholderResource = shareholderResourceList[index];
            shareholderList[index] = {
                foreName1: shareholderResource.fore_name_1,
                foreName2: shareholderResource.fore_name_2,
                surname: shareholderResource.surname,
                shares: shareholderResource.shares,
                classOfShares: shareholderResource.class_of_shares,
                currency: shareholderResource.currency
            };
        }
        return shareholderList;
    }
    mapToShareholderResource(shareholderList) {
        const shareholderResourceList = [];
        for (let index = 0; index < shareholderList.length; index++) {
            const shareholder = shareholderList[index];
            shareholderResourceList[index] = {
                fore_name_1: shareholder.foreName1,
                fore_name_2: shareholder.foreName2,
                surname: shareholder.surname,
                shares: shareholder.shares,
                class_of_shares: shareholder.classOfShares,
                currency: shareholder.currency
            };
        }
        return shareholderResourceList;
    }
    mapToShareholderDataResource(shareholder) {
        return {
            section_status: shareholder.sectionStatus
        };
    }
    mapToShareholderData(shareholderResource) {
        return {
            sectionStatus: shareholderResource.section_status
        };
    }
    mapToRegisterLocationsDataResource(registerLocations) {
        return {
            section_status: registerLocations.sectionStatus
        };
    }
    mapToRegisterLocationsData(registerLocations) {
        return {
            sectionStatus: registerLocations.section_status
        };
    }
    mapToNextMadeUpToDate(nextMadeUpToDateResource) {
        return Object.assign(Object.assign({ currentNextMadeUpToDate: nextMadeUpToDateResource.current_next_made_up_to_date }, (typeof nextMadeUpToDateResource.is_due !== "undefined" && { isDue: nextMadeUpToDateResource.is_due })), (nextMadeUpToDateResource.new_next_made_up_to_date && { newNextMadeUpToDate: nextMadeUpToDateResource.new_next_made_up_to_date }));
    }
    mapToTradingStatusDataResource(tradingStatusData) {
        return {
            trading_status_answer: tradingStatusData.tradingStatusAnswer
        };
    }
    mapToTradingStatusData(tradingStatusDataResource) {
        return {
            tradingStatusAnswer: tradingStatusDataResource.trading_status_answer
        };
    }
    getConfirmationStatementUrlIncTransactionId(transactionId) {
        return `/transactions/${transactionId}/confirmation-statement`;
    }
    getConfirmationStatementUrl(companyNumber) {
        return `/confirmation-statement/company/${companyNumber}`;
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map