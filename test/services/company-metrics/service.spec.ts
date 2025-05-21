import chai from "chai";
import { RequestClient } from "../../../src/http";
import sinon from "sinon";
import CompanyMetricsService from "../../../src/services/company-metrics/service";
import { MetricsApiResource } from "../../../src/services/company-metrics/types";

const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("company-metrics", () => {
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
        const companyMetricsService : CompanyMetricsService = new CompanyMetricsService(requestClient);
        const data = await companyMetricsService.getCompanyMetrics("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("maps the company metrics data items correctly", async () => {
        const mockResponseBody : MetricsApiResource = ({
            etag: "etag",
            counts: {
                appointments: {
                    activeDirectorsCount: 12,
                    activeSecretariesCount: 1,
                    activeCount: 13,
                    resignedCount: 49,
                    totalCount: 62,
                    activeLlpMembersCount: 0
                }
            },
            mortgage: {
                satisfiedCount: 13,
                partSatisfiedCount: 0,
                totalCount: 14
            }
        });

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyMetricsService : CompanyMetricsService = new CompanyMetricsService(requestClient);
        const data = await companyMetricsService.getCompanyMetrics("123");

        expect(data.httpStatusCode).toBe(200);

        expect(data.resource?.etag).toBe(mockResponseBody.etag)

        expect(data.resource?.counts.appointments.activeCount).toBe(mockResponseBody.counts.appointments.activeCount)
        expect(data.resource?.counts.appointments.activeDirectorsCount).toBe(mockResponseBody.counts.appointments.activeDirectorsCount)
        expect(data.resource?.counts.appointments.activeLlpMembersCount).toBe(mockResponseBody.counts.appointments.activeLlpMembersCount)
        expect(data.resource?.counts.appointments.activeSecretariesCount).toBe(mockResponseBody.counts.appointments.activeSecretariesCount)
        expect(data.resource?.counts.appointments.resignedCount).toBe(mockResponseBody.counts.appointments.resignedCount)
        expect(data.resource?.counts.appointments.totalCount).toBe(mockResponseBody.counts.appointments.totalCount)

        expect(data.resource?.mortgage.partSatisfiedCount).toBe(mockResponseBody.mortgage.partSatisfiedCount)
        expect(data.resource?.mortgage.satisfiedCount).toBe(mockResponseBody.mortgage.satisfiedCount)
        expect(data.resource?.mortgage.totalCount).toBe(mockResponseBody.mortgage.totalCount)
    });
});
