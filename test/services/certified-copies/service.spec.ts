import chai from "chai";
import sinon from "sinon";
import CertifiedCopiesService from "../../../src/services/order/certified-copies/service";
import { RequestClient } from "../../../src/http";
import { CertifiedCopyItemResource } from "../../../src/services/order/certified-copies/types"

const expect = chai.expect;
const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const mockResponseBody : CertifiedCopyItemResource = ({
    company_name: "test company",
    company_number: "00000000",
    total_item_cost: "30",
    item_options: {
        delivery_method: "postal",
        delivery_timescale: "same-day",
        filing_history_documents: [{
            filing_history_date: "2010-02-12",
            filing_history_description: "change-person-director-company-with-change-date",
            filing_history_description_values: {
                change_date: "2010-02-12",
                officer_name: "Thomas David Wheare"
            },
            filing_history_id: "MzAwOTM2MDg5OWFkaXF6a2N4",
            filing_history_type: "CH01",
            filing_history_cost: "30"
        }]
    }
});

describe("order a certified copy GET", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certifiedCopy: CertifiedCopiesService = new CertifiedCopiesService(requestClient);
        const data = await certifiedCopy.getCertifiedCopy("CERT-COPY-ID-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the certified copy field data items correctly", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certifiedCopy: CertifiedCopiesService = new CertifiedCopiesService(requestClient);
        const data = await certifiedCopy.getCertifiedCopy("CERT-COPY-ID-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(data.resource.totalItemCost).to.equal(mockResponseBody.total_item_cost);
        expect(data.resource.itemOptions.deliveryMethod).to.equal(mockResponseBody.item_options.delivery_method);
        expect(data.resource.itemOptions.deliveryTimescale).to.equal(mockResponseBody.item_options.delivery_timescale);

        const filingHistoryDocument = data.resource.itemOptions.filingHistoryDocuments[0];
        const filingHistoryDocumentResource = mockResponseBody.item_options.filing_history_documents[0];
        expect(filingHistoryDocument.filingHistoryDate).to.equal(filingHistoryDocumentResource.filing_history_date);
        expect(filingHistoryDocument.filingHistoryDescription).to.equal(filingHistoryDocumentResource.filing_history_description);
        expect(filingHistoryDocument.filingHistoryId).to.equal(filingHistoryDocumentResource.filing_history_id);
        expect(filingHistoryDocument.filingHistoryType).to.equal(filingHistoryDocumentResource.filing_history_type);
        expect(filingHistoryDocument.filingHistoryDescriptionValues).to.deep.equal(filingHistoryDocumentResource.filing_history_description_values);
        expect(filingHistoryDocument.filingHistoryCost).to.equal(filingHistoryDocumentResource.filing_history_cost);
    });
});
