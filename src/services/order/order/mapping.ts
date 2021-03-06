import {
    Order, OrderResource, Item, ItemResource, ItemOptions, ItemOptionsResource,
    CertificateItemOptionsResource, CertifiedCopyItemOptionsResource,
    MissingImageDeliveryItemOptionsResource
} from "./types";

export default class OrderMapping {
    public static mapOrderResourceToOrder (orderResource: OrderResource): Order {
        const order: Order = {
            deliveryDetails: {
                addressLine1: orderResource?.delivery_details?.address_line_1,
                addressLine2: orderResource?.delivery_details?.address_line_2,
                country: orderResource?.delivery_details?.country,
                forename: orderResource?.delivery_details?.forename,
                locality: orderResource?.delivery_details?.locality,
                poBox: orderResource?.delivery_details?.po_box,
                postalCode: orderResource?.delivery_details?.postal_code,
                region: orderResource?.delivery_details?.region,
                surname: orderResource?.delivery_details?.surname
            },
            items: orderResource.items.map((item) => {
                return this.mapItemResourceToItem(item)
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
        }
        return order;
    }

    private static mapItemResourceToItem (itemResource: ItemResource): Item {
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
                calculatedCost: i?.calculated_cost,
                discountApplied: i?.discount_applied,
                itemCost: i?.item_cost,
                productType: i?.product_type
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
        }
    }

    private static removeEmptyObjects<T> (input: T): T {
        return Object.values(input).some((value) => value !== undefined) ? input : undefined;
    }

    private static mapItemOptionsResourceToItemOptions (itemResource: ItemOptionsResource, kind: string): ItemOptions {
        if (kind === "item#certificate") {
            itemResource = itemResource as CertificateItemOptionsResource;
            const directorDetails = this.removeEmptyObjects({
                includeBasicInformation: itemResource?.director_details?.include_basic_information,
                includeAddress: itemResource?.director_details?.include_address,
                includeAppointmentDate: itemResource?.director_details?.include_appointment_date,
                includeCountryOfResidence: itemResource?.director_details?.include_country_of_residence,
                includeNationality: itemResource?.director_details?.include_nationality,
                includeOccupation: itemResource?.director_details?.include_occupation,
                includeDobType: itemResource?.director_details?.include_dob_type
            });

            const secretaryDetails = this.removeEmptyObjects({
                includeBasicInformation: itemResource?.secretary_details?.include_basic_information,
                includeAddress: itemResource?.secretary_details?.include_address,
                includeAppointmentDate: itemResource?.secretary_details?.include_appointment_date,
                includeCountryOfResidence: itemResource?.secretary_details?.include_country_of_residence,
                includeNationality: itemResource?.secretary_details?.include_nationality,
                includeOccupation: itemResource?.secretary_details?.include_occupation,
                includeDobType: itemResource?.secretary_details?.include_dob_type
            });

            const registeredOfficeAddressDetails = this.removeEmptyObjects({
                includeAddressRecordsType: itemResource?.registered_office_address_details?.include_address_records_type
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
            }
        } else if (kind === "item#certified-copy") {
            itemResource = itemResource as CertifiedCopyItemOptionsResource;
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
            }
        } else {
            itemResource = itemResource as MissingImageDeliveryItemOptionsResource;
            return {
                filingHistoryDate: itemResource.filing_history_date,
                filingHistoryDescription: itemResource.filing_history_description,
                filingHistoryId: itemResource.filing_history_id,
                filingHistoryType: itemResource.filing_history_type,
                filingHistoryDescriptionValues: itemResource.filing_history_description_values
            }
        }
    }
}
