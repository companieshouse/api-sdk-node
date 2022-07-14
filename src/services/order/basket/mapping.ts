import { BasketPatchRequest, BasketRequestResource } from "./types";

export default class BasketMapping {
    /**
     * Maps a request object to change delivery details to a corresponding resource request.
     * Note: required as Mapping.snakeCaseKeys does not insert underscores between letters and numbers.
     *
     * @param basketRequest A {@link BasketPatchRequest patch basket details} request object
     * @return BasketRequestResource An equivalent request entity with fields converted into snake case.
     */
    public static mapBasketRequestToBasketRequestResource (basketRequest: BasketPatchRequest): BasketRequestResource {
        return {
            delivery_details: {
                address_line_1: basketRequest.deliveryDetails.addressLine1,
                address_line_2: basketRequest.deliveryDetails.addressLine2,
                country: basketRequest.deliveryDetails.country,
                forename: basketRequest.deliveryDetails.forename,
                locality: basketRequest.deliveryDetails.locality,
                po_box: basketRequest.deliveryDetails.poBox,
                postal_code: basketRequest.deliveryDetails.postalCode,
                region: basketRequest.deliveryDetails.region,
                surname: basketRequest.deliveryDetails.surname
            }
        };
    }
}
