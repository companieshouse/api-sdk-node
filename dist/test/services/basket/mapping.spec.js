"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapping_1 = __importDefault(require("../../../src/services/order/basket/mapping"));
const chai_1 = require("chai");
describe("BasketMapping", () => {
    describe("mapBasketRequestToBasketRequestResource", () => {
        it("Maps a patch basket delivery details request", () => {
            // given
            const request = {
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
            };
            // when
            const actual = mapping_1.default.mapBasketRequestToBasketRequestResource(request);
            // then
            chai_1.expect(actual).to.deep.equal({
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
    });
});
//# sourceMappingURL=mapping.spec.js.map