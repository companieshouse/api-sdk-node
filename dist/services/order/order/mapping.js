"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderMapping {
    static mapOrderResourceToOrder(orderResource) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const order = {
            deliveryDetails: {
                addressLine1: (_a = orderResource === null || orderResource === void 0 ? void 0 : orderResource.delivery_details) === null || _a === void 0 ? void 0 : _a.address_line_1,
                addressLine2: (_b = orderResource === null || orderResource === void 0 ? void 0 : orderResource.delivery_details) === null || _b === void 0 ? void 0 : _b.address_line_2,
                country: (_c = orderResource === null || orderResource === void 0 ? void 0 : orderResource.delivery_details) === null || _c === void 0 ? void 0 : _c.country,
                forename: (_d = orderResource === null || orderResource === void 0 ? void 0 : orderResource.delivery_details) === null || _d === void 0 ? void 0 : _d.forename,
                locality: (_e = orderResource === null || orderResource === void 0 ? void 0 : orderResource.delivery_details) === null || _e === void 0 ? void 0 : _e.locality,
                poBox: (_f = orderResource === null || orderResource === void 0 ? void 0 : orderResource.delivery_details) === null || _f === void 0 ? void 0 : _f.po_box,
                postalCode: (_g = orderResource === null || orderResource === void 0 ? void 0 : orderResource.delivery_details) === null || _g === void 0 ? void 0 : _g.postal_code,
                region: (_h = orderResource === null || orderResource === void 0 ? void 0 : orderResource.delivery_details) === null || _h === void 0 ? void 0 : _h.region,
                surname: (_j = orderResource === null || orderResource === void 0 ? void 0 : orderResource.delivery_details) === null || _j === void 0 ? void 0 : _j.surname
            },
            items: orderResource.items.map((item) => {
                return this.mapItemResourceToItem(item);
            }),
            etag: orderResource.etag,
            kind: orderResource.kind,
            links: {
                self: orderResource.links.self
            },
            orderedAt: orderResource.ordered_at,
            orderedBy: {
                email: orderResource.ordered_by.email,
                id: orderResource.ordered_by.id
            },
            paymentReference: orderResource.payment_reference,
            reference: orderResource.reference,
            totalOrderCost: orderResource.total_order_cost
        };
        return order;
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
        var _a, _b, _c;
        if (kind === "item#certificate") {
            itemResource = itemResource;
            const directorDetails = this.removeEmptyObjects({
                includeBasicInformation: (_a = itemResource === null || itemResource === void 0 ? void 0 : itemResource.director_details) === null || _a === void 0 ? void 0 : _a.include_basic_information
            });
            const secretaryDetails = this.removeEmptyObjects({
                includeBasicInformation: (_b = itemResource === null || itemResource === void 0 ? void 0 : itemResource.secretary_details) === null || _b === void 0 ? void 0 : _b.include_basic_information
            });
            const registeredOfficeAddressDetails = this.removeEmptyObjects({
                includeAddressRecordsType: (_c = itemResource === null || itemResource === void 0 ? void 0 : itemResource.registered_office_address_details) === null || _c === void 0 ? void 0 : _c.include_address_records_type
            });
            return {
                certificateType: itemResource.certificate_type,
                deliveryTimescale: itemResource.delivery_timescale,
                deliveryMethod: itemResource.delivery_method,
                includeGoodStandingInformation: itemResource.include_good_standing_information,
                includeCompanyObjectsInformation: itemResource.include_company_objects_information,
                registeredOfficeAddressDetails: registeredOfficeAddressDetails,
                secretaryDetails: secretaryDetails,
                directorDetails: directorDetails,
                forename: itemResource.forename,
                surname: itemResource.surname
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
exports.default = OrderMapping;
//# sourceMappingURL=mapping.js.map