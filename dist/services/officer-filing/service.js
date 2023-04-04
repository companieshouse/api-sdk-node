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
    getListActiveDirectorDetails(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getOfficerFilingUrlIncTransactionId(transactionId)}/active-directors-details`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = { httpStatusCode: resp.status };
            resource.resource = this.mapToListActiveOfficerDetails(resp.body);
            return resource;
        });
    }
    mapToListActiveOfficerDetails(officerResourceList) {
        const officerList = [];
        for (let index = 0; index < officerResourceList.length; index++) {
            const officerResource = officerResourceList[index];
            officerList[index] = Object.assign(Object.assign(Object.assign({ foreName1: officerResource.fore_name_1, foreName2: officerResource.fore_name_2, surname: officerResource.surname, occupation: officerResource.occupation, nationality: officerResource.nationality, dateOfBirth: officerResource.date_of_birth, dateOfAppointment: officerResource.date_of_appointment, countryOfResidence: officerResource.country_of_residence }, (officerResource.service_address && { serviceAddress: this.mapToAddress(officerResource.service_address) })), (officerResource.residential_address && { residentialAddress: this.mapToAddress(officerResource.residential_address) })), { isCorporate: officerResource.is_corporate, role: officerResource.role, placeRegistered: officerResource.place_registered, registrationNumber: officerResource.registration_number, lawGoverned: officerResource.law_governed, legalForm: officerResource.legal_form, identificationType: officerResource.identification_type });
        }
        return officerList;
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
    getOfficerFilingUrlIncTransactionId(transactionId) {
        return `/transactions/${transactionId}/officers`;
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map