import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import MidService from "../../../src/services/order/mid/service";
import { RequestClient, HttpResponse } from "../../../src/http";
import { MidItemPostRequest, MidItemResource } from "../../../src/services/order/mid/types";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBody : MidItemResource = ({
    company_name: "company name",
    company_number: "1471",
    customer_reference: "reference",
    description: "description",
    description_identifier: "desc id",
    description_values: {
        key: "value"
    },
    etag: "etag",
    id: "id",
    item_costs: [{
        calculated_cost: "555",
        discount_applied: "discount",
        item_cost: "item cost",
        product_type: "product type"
    }],
    item_options: {
        filing_history_barcode: "barcode",
        filing_history_category: "category",
        filing_history_cost: "cost",
        filing_history_date: "2010-02-12",
        filing_history_description: "change-person-director-company-with-change-date",
        filing_history_description_values: {
            change_date: "2010-02-12",
            officer_name: "Thomas David Wheare"
        },
        filing_history_id: "MzAwOTM2MDg5OWFkaXF6a2N4",
        filing_history_type: "CH01"
    },
    kind: "kind",
    links: {
        self: "self"
    },
    postage_cost: "postage cost",
    postal_delivery: true,
    quantity: 1,
    total_item_cost: "total cost"
});

describe("create a MID POST", () => {
    const mockRequestBody: MidItemPostRequest = ({
        companyNumber: "1471",
        customerReference: "reference",
        itemOptions: {
            filingHistoryId: "MzAwOTM2MDg5OWFkaXF6a2N4"
        },
        quantity: 1
    });

    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(done => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockPostRequest = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostRequest);
        const mid: MidService = new MidService(requestClient);
        const data = await mid.postMid(mockRequestBody);

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("maps create a mid correctly", async () => {
        const mockPostRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostRequest);
        const mid: MidService = new MidService(requestClient);
        const data = await mid.postMid(mockRequestBody);

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource.companyNumber).toBe(mockResponseBody.company_number);
        expect(data.resource.customerReference).toBe(mockResponseBody.customer_reference);
        expect(data.resource.itemOptions.filingHistoryId).toBe(mockResponseBody.item_options.filing_history_id)
        expect(data.resource.quantity).toBe(mockResponseBody.quantity);
    });
});

describe("GET missing image delivery", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(done => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occured"
        };

        const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
        const missingImageDelivery: MidService = new MidService(requestClient);
        const data = await missingImageDelivery.getMid("MID-ID-NOT-IMPORTANT");

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it(
        "maps the missing image delivery field data items correctly",
        async () => {
            const mockGetResponse = {
                status: 200,
                body: mockResponseBody
            };

            const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const missingImageDelivery: MidService = new MidService(requestClient);
            const data = await missingImageDelivery.getMid("MID-ID-NOT-IMPORTANT");

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.companyNumber).toBe(mockResponseBody.company_number);
            expect(data.resource.companyName).toBe(mockResponseBody.company_name);
            expect(data.resource.totalItemCost).toBe(mockResponseBody.total_item_cost);

            const itemOptions = data.resource.itemOptions;
            const itemOptionsResource = mockResponseBody.item_options;
            expect(itemOptions.filingHistoryDate).toBe(itemOptionsResource.filing_history_date);
            expect(itemOptions.filingHistoryDescription).toBe(itemOptionsResource.filing_history_description);
            expect(itemOptions.filingHistoryId).toBe(itemOptionsResource.filing_history_id);
            expect(itemOptions.filingHistoryType).toBe(itemOptionsResource.filing_history_type);
            expect(itemOptions.filingHistoryDescriptionValues).toEqual(itemOptionsResource.filing_history_description_values);
        }
    );
});
