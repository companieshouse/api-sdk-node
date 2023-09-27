
import { UKAddresses } from "../../../src/services/postcode-lookup/types";

import sinon from "sinon";
import service from "../../../src/services/postcode-lookup/service";
import { HttpResponse } from "../../../src/http";
import { PostcodeLookupService } from "../../../src/services/postcode-lookup";
import { RequestClient, Resource } from "../../../src";
import { requestClient } from "./postcode.lookup.mock";

describe("PostcodeLookupService", () => {
    //   beforeEach(() => {
    //     httpClient = {
    //       async httpGet(url: string): Promise<HttpResponse> {
    //         return {
    //           status: 200,
    //           body: [],
    //         };
    //       },
    //     };
    //     service = new PostcodeLookupService(httpClient);
    //   });

    // describe("isValidUKPostcode", () => {
    //     it("should return true if the postcode is valid", async () => {
    //         const postcode = "CF30AD";
    //         const httpClientSpy = sinon.spy("HttpClient", ["get"]);
    //         const url = `http://postcode.cidev.aws.chdev.org/postcode/CF30AD`;
    //
    //         const [result] = await Promise.all([service.getValidatePostcodeLookupResponse(url)]);
    //
    //         console.log(`result is ${result}`);
    //     });
    // });

    describe("custom code to GET call", () => {
        it("should return true if the postcode is valid 2", async () => {
            const url = `http://10.75.117.189/postcode/CF30AD`;
            const postcodeLookupService: PostcodeLookupService = new PostcodeLookupService(requestClient);
            const data: boolean = await postcodeLookupService.getValidatePostcodeLookupResponse(url);

            console.log(`resp1 is ${data}`);
        });

        it("should return true if the postcode is valid 2", async () => {
            const url = `http://postcode.cidev.aws.chdev.org/postcode/CF30AD`;
            const postcodeLookupService: PostcodeLookupService = new PostcodeLookupService(requestClient);
            const data: boolean = await postcodeLookupService.getValidatePostcodeLookupResponse(url);

            console.log(`resp2 is ${data}`);
        });
    });
});
