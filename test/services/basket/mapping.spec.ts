import BasketMapping from "../../../src/services/order/basket/mapping";
import { BasketPatchRequest } from "../../../src/services/order/basket";

describe("BasketMapping", () => {
    describe("mapBasketRequestToBasketRequestResource", () => {
        it("Maps a patch basket delivery details request", () => {
            // given
            const request: BasketPatchRequest = {
                deliveryDetails: {
                    addressLine1: "address line 1",
                    addressLine2: "address line 2",
                    companyName: "Company Name",
                    country: "country",
                    forename: "forename",
                    locality: "locality",
                    poBox: "po box",
                    postalCode: "postcode",
                    region: "region",
                    surname: "surname"
                }
            }

            // when
            const actual = BasketMapping.mapBasketRequestToBasketRequestResource(request);

            // then
            expect(actual).toEqual({
                delivery_details: {
                    address_line_1: "address line 1",
                    address_line_2: "address line 2",
                    company_name: "Company Name",
                    country: "country",
                    forename: "forename",
                    locality: "locality",
                    po_box: "po box",
                    postal_code: "postcode",
                    region: "region",
                    surname: "surname"
                }
            });
        });
    })
})
