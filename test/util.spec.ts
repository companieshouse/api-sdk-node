import { expect } from "chai";
import { addRequestIdHeader } from "../src/util";
import { REQUEST_ID_HEADER } from "../src/config";

describe("addRequestIdHeader", () => {

    it("should return undefined when called with no arguments", () => {
        expect(addRequestIdHeader()).to.be.undefined;
    });

    it("should return undefined when requestId is explicitly undefined", () => {
        expect(addRequestIdHeader(undefined)).to.be.undefined;
    });

    it("should return headers containing the request ID when no otherHeaders are supplied", () => {
        const result = addRequestIdHeader("abc-123");
        expect(result).to.deep.equal({ [REQUEST_ID_HEADER]: "abc-123" });
    });

    it("should merge otherHeaders with the request ID header", () => {
        const result = addRequestIdHeader("abc-123", { "Content-Type": "application/json" });
        expect(result).to.deep.equal({
            "Content-Type": "application/json",
            [REQUEST_ID_HEADER]: "abc-123"
        });
    });

    it("should not throw and should return the request ID header when otherHeaders is explicitly passed as undefined", () => {
        expect(() => addRequestIdHeader("abc-123", undefined)).to.not.throw();
        const result = addRequestIdHeader("abc-123", undefined);
        expect(result).to.deep.equal({ [REQUEST_ID_HEADER]: "abc-123" });
    });

    it("should not throw and should return the request ID header when otherHeaders is passed an undefined term", () => {
        const undefinedHeader = undefined;
        expect(() => addRequestIdHeader("abc-123", undefinedHeader)).to.not.throw();
        const result = addRequestIdHeader("abc-123", undefinedHeader);
        expect(result).to.deep.equal({ [REQUEST_ID_HEADER]: "abc-123" });
    });

    it("should not mutate the original otherHeaders object", () => {
        const original = { "Content-Type": "application/json" };
        addRequestIdHeader("abc-123", original);
        expect(original).to.deep.equal({ "Content-Type": "application/json" });
    });

});
