import {CertificateItemInitialRequest, CertificateItemPatchRequest} from "../../../src/services/order/certificates";
import {expect} from "chai";
import Mapping from "../../../src/mapping/mapping";
import CertificateMapping from "../../../src/services/order/certificates/mapping";

describe("Test mappings from certificate item request to resource object", () => {
    it('should correctly convert initial certificate item request into resource', () => {
        // given
        const patchRequest = {
            companyNumber: "company-number"
        } as CertificateItemInitialRequest;

        // when
        const result = Mapping.snakeCaseKeys(patchRequest);

        // then
        expect(result).to.be.deep.equal({company_number: "company-number"});
    });

    it('should correctly convert patch certificate item request into resource', () => {
        // given
        const patchRequest = {
            customerReference: "123",
            itemOptions: {
                forename: "Will",
                surname: "Robinson",
                principalPlaceOfBusinessDetails: {
                    includeAddressRecordsType: "include address",
                    includeDates: true
                },
                generalPartnerDetails: {
                    includeBasicInformation: true
                },
                limitedPartnerDetails: undefined
            }
        } as CertificateItemPatchRequest;

        // when
        const result = Mapping.snakeCaseKeys(patchRequest);

        // then
        expect(result).to.be.deep.equal({
            customer_reference: "123",
            item_options: {
                forename: "Will",
                surname: "Robinson",
                principal_place_of_business_details: {
                    include_address_records_type: "include address",
                    include_dates: true
                },
                general_partner_details: {
                    include_basic_information: true
                },
                limited_partner_details: undefined
            }
        });
    });

    it('should map member details with undefined properties to undefined', () => {
        // given
        const patchRequest: CertificateItemPatchRequest = {
            itemOptions: {
                memberDetails: {}
            }
        };

        // when
        const result = CertificateMapping.mapCertificateItemRequestToCertificateItemRequestResource(patchRequest);

        // then
        expect(result).to.deep.equal({
            "customer_reference": undefined,
            "item_options": {
                "certificate_type": undefined,
                "collection_location": undefined,
                "company_status": undefined,
                "contact_number": undefined,
                "delivery_method": undefined,
                "delivery_timescale": undefined,
                "designated_member_details": undefined,
                "director_details": undefined,
                "forename": undefined,
                "general_partner_details": undefined,
                "include_company_objects_information": undefined,
                "include_email_copy": undefined,
                "include_general_nature_of_business_information": undefined,
                "include_good_standing_information": undefined,
                "limited_partner_details": undefined,
                "liquidators_details": undefined,
                "member_details": undefined,
                "principal_place_of_business_details": undefined,
                "registered_office_address_details": undefined,
                "secretary_details": undefined,
                "surname": undefined
            },
            "quantity": undefined
        })
    });

    it('snakeCaseKeys should map same as CertificateMapping', () => {
        // given
        const patchRequest: CertificateItemPatchRequest = {
            itemOptions: {
                memberDetails: {}
            }
        };

        // when
        const result = Mapping.snakeCaseKeys(patchRequest);

        // then
        const expected = CertificateMapping.mapCertificateItemRequestToCertificateItemRequestResource(patchRequest);

        expect(result).to.deep.equal(expected);
    });
});
