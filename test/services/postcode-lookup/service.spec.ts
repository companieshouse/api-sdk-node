import sinon from "sinon";
import { PostcodeLookupService, UKAddress } from "../../../src/services/postcode-lookup";
import { RequestClient } from "../../../src";
import { expect } from "chai";

const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "NOT USED" });
const mockResponseBodyOfUKAddress1: UKAddress = ({
    premise: "123",
    addressLine1: "123 Main St",
    postTown: "London",
    postcode: "SW1A 1AA",
    country: "GB-ENG"
});
const mockResponseBodyOfUKAddress2: UKAddress = ({
    premise: "125",
    addressLine1: "123 Main St",
    postTown: "London",
    postcode: "SW1A 1AA",
    country: "GB-ENG"
});
const mockResponseBody: UKAddress[] = [
    mockResponseBodyOfUKAddress1,
    mockResponseBodyOfUKAddress2
]

describe("test isValidUKPostcode", () => {
    it("should return true for a valid postcode", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        }
        const mockRequest = sinon.stub(requestClient, "httpGet").returns(Promise.resolve(mockGetResponse));
        const postcode = "SW1A1AA";
        const postcodeValidationUrl = "https://example.com/postcode";
        const postcodeLookupService: PostcodeLookupService = new PostcodeLookupService(requestClient);
        const result = await postcodeLookupService.isValidUKPostcode(postcodeValidationUrl, postcode);
        expect(result).to.be.equal(true);
    });

    it("should return false for an invalid postcode", async () => {
        const mockGetResponse = {
            status: 404,
            body: null
        }
        const mockRequest = sinon.stub(requestClient, "httpGet").returns(Promise.resolve(mockGetResponse));
        const postcode = "SW1A1AB";
        const postcodeValidationUrl = "https://example.com/postcode";
        const postcodeLookupService: PostcodeLookupService = new PostcodeLookupService(requestClient);
        const result = await postcodeLookupService.isValidUKPostcode(postcodeValidationUrl, postcode);
        expect(result).to.be.equal(false);
    });
});
describe("test getListOfValidPostcodeAddresses", () => {
    it("should return a list of addresses for a valid postcode", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        }
        const mockRequest = sinon.stub(requestClient, "httpGet").returns(Promise.resolve(mockGetResponse));
        const postcode = "SW1A1AA";
        const postcodeAddressesLookupUrl = "https://example.com/multiple-addresses";
        const postcodeLookupService: PostcodeLookupService = new PostcodeLookupService(requestClient);
        const result = await postcodeLookupService.getListOfValidPostcodeAddresses(postcodeAddressesLookupUrl, postcode);
        expect(mockRequest).to.have.been.calledOnce;
        expect(result.httpStatusCode).to.be.equal(200);
        expect(result.resource).to.not.be.undefined;
        expect(result.resource?.length).to.be.equal(2);
        expect(JSON.stringify(result.resource![0])).to.be.equals(JSON.stringify(mockResponseBodyOfUKAddress1));
        expect(JSON.stringify(result.resource![1])).to.be.equals(JSON.stringify(mockResponseBodyOfUKAddress2));
    });

    it("should return an empty list for an invalid postcode", async () => {
        const mockGetResponse = {
            status: 404,
            body: null
        }
        const mockRequest = sinon.stub(requestClient, "httpGet").returns(Promise.resolve(mockGetResponse));
        const postcode = "SW1A1AB";
        const postcodeAddressesLookupUrl = "https://example.com/multiple-addresses";
        const postcodeLookupService: PostcodeLookupService = new PostcodeLookupService(requestClient);
        const result = await postcodeLookupService.getListOfValidPostcodeAddresses(postcodeAddressesLookupUrl, postcode);
        expect(mockRequest).to.have.been.calledOnce;
        expect(result.httpStatusCode).to.be.equal(404);
        expect(result.resource).to.not.be.undefined;
        expect(result.resource).to.be.empty
    });
});
