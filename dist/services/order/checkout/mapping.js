"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckoutMapping {
    static mapCheckoutResourceToCheckout(checkoutResource) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const checkout = {
            deliveryDetails: {
                addressLine1: (_a = checkoutResource === null || checkoutResource === void 0 ? void 0 : checkoutResource.delivery_details) === null || _a === void 0 ? void 0 : _a.address_line_1,
                addressLine2: (_b = checkoutResource === null || checkoutResource === void 0 ? void 0 : checkoutResource.delivery_details) === null || _b === void 0 ? void 0 : _b.address_line_2,
                country: (_c = checkoutResource === null || checkoutResource === void 0 ? void 0 : checkoutResource.delivery_details) === null || _c === void 0 ? void 0 : _c.country,
                forename: (_d = checkoutResource === null || checkoutResource === void 0 ? void 0 : checkoutResource.delivery_details) === null || _d === void 0 ? void 0 : _d.forename,
                locality: (_e = checkoutResource === null || checkoutResource === void 0 ? void 0 : checkoutResource.delivery_details) === null || _e === void 0 ? void 0 : _e.locality,
                poBox: (_f = checkoutResource === null || checkoutResource === void 0 ? void 0 : checkoutResource.delivery_details) === null || _f === void 0 ? void 0 : _f.po_box,
                postalCode: (_g = checkoutResource === null || checkoutResource === void 0 ? void 0 : checkoutResource.delivery_details) === null || _g === void 0 ? void 0 : _g.postal_code,
                region: (_h = checkoutResource === null || checkoutResource === void 0 ? void 0 : checkoutResource.delivery_details) === null || _h === void 0 ? void 0 : _h.region,
                surname: (_j = checkoutResource === null || checkoutResource === void 0 ? void 0 : checkoutResource.delivery_details) === null || _j === void 0 ? void 0 : _j.surname
            },
            items: checkoutResource.items.map((item) => {
                return this.mapItemResourceToItem(item);
            }),
            etag: checkoutResource.etag,
            kind: checkoutResource.kind,
            links: {
                self: checkoutResource.links.self,
                payment: checkoutResource.links.payment
            },
            paidAt: checkoutResource.paid_at,
            checkedOutBy: {
                email: checkoutResource.checked_out_by.email,
                id: checkoutResource.checked_out_by.id
            },
            status: checkoutResource.status,
            paymentReference: checkoutResource.payment_reference,
            reference: checkoutResource.reference,
            totalOrderCost: checkoutResource.total_order_cost
        };
        return checkout;
    }
    static mapItemResourceToItem(itemResource) {
        return {
            companyName: itemResource.company_name,
            companyNumber: itemResource.company_number,
            customerReference: itemResource.customer_reference,
            description: itemResource.description,
            descriptionIdentifier: itemResource.description_identifier,
            descriptionValues: itemResource.description_values,
            etag: itemResource.etag,
            id: itemResource.id,
            itemCosts: itemResource.item_costs.map((i) => ({
                calculatedCost: i === null || i === void 0 ? void 0 : i.calculated_cost,
                discountApplied: i === null || i === void 0 ? void 0 : i.discount_applied,
                itemCost: i === null || i === void 0 ? void 0 : i.item_cost,
                productType: i === null || i === void 0 ? void 0 : i.product_type
            })),
            itemOptions: this.mapItemOptionsResourceToItemOptions(itemResource.item_options, itemResource.kind),
            itemUri: itemResource.item_uri,
            kind: itemResource.kind,
            links: {
                self: itemResource.links.self
            },
            postageCost: itemResource.postage_cost,
            postalDelivery: itemResource.postal_delivery,
            quantity: itemResource.quantity,
            satisfiedAt: itemResource.satisfied_at,
            status: itemResource.status,
            totalItemCost: itemResource.total_item_cost
        };
    }
    static removeEmptyObjects(input) {
        return Object.values(input).some((value) => value !== undefined) ? input : undefined;
    }
    static mapItemOptionsResourceToItemOptions(itemResource, kind) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        if (kind === "item#certificate") {
            itemResource = itemResource;
            const directorDetails = this.removeEmptyObjects({
                includeBasicInformation: (_a = itemResource === null || itemResource === void 0 ? void 0 : itemResource.director_details) === null || _a === void 0 ? void 0 : _a.include_basic_information,
                includeAddress: (_b = itemResource === null || itemResource === void 0 ? void 0 : itemResource.director_details) === null || _b === void 0 ? void 0 : _b.include_address,
                includeAppointmentDate: (_c = itemResource === null || itemResource === void 0 ? void 0 : itemResource.director_details) === null || _c === void 0 ? void 0 : _c.include_appointment_date,
                includeCountryOfResidence: (_d = itemResource === null || itemResource === void 0 ? void 0 : itemResource.director_details) === null || _d === void 0 ? void 0 : _d.include_country_of_residence,
                includeNationality: (_e = itemResource === null || itemResource === void 0 ? void 0 : itemResource.director_details) === null || _e === void 0 ? void 0 : _e.include_nationality,
                includeOccupation: (_f = itemResource === null || itemResource === void 0 ? void 0 : itemResource.director_details) === null || _f === void 0 ? void 0 : _f.include_occupation,
                includeDobType: (_g = itemResource === null || itemResource === void 0 ? void 0 : itemResource.director_details) === null || _g === void 0 ? void 0 : _g.include_dob_type
            });
            const secretaryDetails = this.removeEmptyObjects({
                includeBasicInformation: (_h = itemResource === null || itemResource === void 0 ? void 0 : itemResource.secretary_details) === null || _h === void 0 ? void 0 : _h.include_basic_information,
                includeAddress: (_j = itemResource === null || itemResource === void 0 ? void 0 : itemResource.secretary_details) === null || _j === void 0 ? void 0 : _j.include_address,
                includeAppointmentDate: (_k = itemResource === null || itemResource === void 0 ? void 0 : itemResource.secretary_details) === null || _k === void 0 ? void 0 : _k.include_appointment_date,
                includeCountryOfResidence: (_l = itemResource === null || itemResource === void 0 ? void 0 : itemResource.secretary_details) === null || _l === void 0 ? void 0 : _l.include_country_of_residence,
                includeNationality: (_m = itemResource === null || itemResource === void 0 ? void 0 : itemResource.secretary_details) === null || _m === void 0 ? void 0 : _m.include_nationality,
                includeOccupation: (_o = itemResource === null || itemResource === void 0 ? void 0 : itemResource.secretary_details) === null || _o === void 0 ? void 0 : _o.include_occupation,
                includeDobType: (_p = itemResource === null || itemResource === void 0 ? void 0 : itemResource.secretary_details) === null || _p === void 0 ? void 0 : _p.include_dob_type
            });
            const memberDetails = CheckoutMapping.mapMemberDetails(itemResource === null || itemResource === void 0 ? void 0 : itemResource.member_details);
            const designatedMemberDetails = CheckoutMapping.mapMemberDetails(itemResource === null || itemResource === void 0 ? void 0 : itemResource.designated_member_details);
            const registeredOfficeAddressDetails = this.removeEmptyObjects({
                includeAddressRecordsType: (_q = itemResource === null || itemResource === void 0 ? void 0 : itemResource.registered_office_address_details) === null || _q === void 0 ? void 0 : _q.include_address_records_type
            });
            const principalPlaceOfBusinessDetails = this.removeEmptyObjects({
                includeAddressRecordsType: (_r = itemResource === null || itemResource === void 0 ? void 0 : itemResource.principal_place_of_business_details) === null || _r === void 0 ? void 0 : _r.include_address_records_type
            });
            const generalPartnerDetails = this.removeEmptyObjects({
                includeBasicInformation: (_s = itemResource === null || itemResource === void 0 ? void 0 : itemResource.general_partner_details) === null || _s === void 0 ? void 0 : _s.include_basic_information
            });
            const limitedPartnerDetails = this.removeEmptyObjects({
                includeBasicInformation: (_t = itemResource === null || itemResource === void 0 ? void 0 : itemResource.limited_partner_details) === null || _t === void 0 ? void 0 : _t.include_basic_information
            });
            const liquidatorsDetails = this.removeEmptyObjects({
                includeBasicInformation: (_u = itemResource === null || itemResource === void 0 ? void 0 : itemResource.liquidators_details) === null || _u === void 0 ? void 0 : _u.include_basic_information
            });
            const administratorsDetails = this.removeEmptyObjects({
                includeBasicInformation: (_v = itemResource === null || itemResource === void 0 ? void 0 : itemResource.administrators_details) === null || _v === void 0 ? void 0 : _v.include_basic_information
            });
            return {
                certificateType: itemResource.certificate_type,
                companyType: itemResource.company_type,
                deliveryTimescale: itemResource.delivery_timescale,
                deliveryMethod: itemResource.delivery_method,
                designatedMemberDetails: designatedMemberDetails,
                includeGeneralNatureOfBusinessInformation: itemResource.include_general_nature_of_business_information,
                includeGoodStandingInformation: itemResource.include_good_standing_information,
                includeCompanyObjectsInformation: itemResource.include_company_objects_information,
                generalPartnerDetails: generalPartnerDetails,
                limitedPartnerDetails: limitedPartnerDetails,
                memberDetails: memberDetails,
                registeredOfficeAddressDetails: registeredOfficeAddressDetails,
                principalPlaceOfBusinessDetails: principalPlaceOfBusinessDetails,
                secretaryDetails: secretaryDetails,
                directorDetails: directorDetails,
                forename: itemResource.forename,
                surname: itemResource.surname,
                liquidatorsDetails: liquidatorsDetails,
                companyStatus: itemResource.company_status,
                administratorsDetails: administratorsDetails
            };
        }
        else if (kind === "item#certified-copy") {
            itemResource = itemResource;
            return {
                deliveryTimescale: itemResource.delivery_timescale,
                deliveryMethod: itemResource.delivery_method,
                filingHistoryDocuments: itemResource.filing_history_documents.map(f => ({
                    filingHistoryDate: f.filing_history_date,
                    filingHistoryDescription: f.filing_history_description,
                    filingHistoryId: f.filing_history_id,
                    filingHistoryType: f.filing_history_type,
                    filingHistoryDescriptionValues: f.filing_history_description_values,
                    filingHistoryCost: f.filing_history_cost
                }))
            };
        }
        else {
            itemResource = itemResource;
            return {
                filingHistoryDate: itemResource.filing_history_date,
                filingHistoryDescription: itemResource.filing_history_description,
                filingHistoryId: itemResource.filing_history_id,
                filingHistoryType: itemResource.filing_history_type,
                filingHistoryDescriptionValues: itemResource.filing_history_description_values
            };
        }
    }
}
exports.default = CheckoutMapping;
CheckoutMapping.mapMemberDetails = (member_details) => {
    return CheckoutMapping.removeEmptyObjects({
        includeAddress: member_details === null || member_details === void 0 ? void 0 : member_details.include_address,
        includeAppointmentDate: member_details === null || member_details === void 0 ? void 0 : member_details.include_appointment_date,
        includeBasicInformation: member_details === null || member_details === void 0 ? void 0 : member_details.include_basic_information,
        includeCountryOfResidence: member_details === null || member_details === void 0 ? void 0 : member_details.include_country_of_residence,
        includeDobType: member_details === null || member_details === void 0 ? void 0 : member_details.include_dob_type
    });
};
//# sourceMappingURL=mapping.js.map