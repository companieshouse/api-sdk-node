import chai from "chai";
import sinon from "sinon";
import AssociationsService from "../../../src/services/associations/service";
import {
    ApprovalRoute,
    Association,
    AssociationStatus,
    AssociationList,
    Error,
    Errors,
    Invitation,
    InvitationList,
    NewAssociationResponse,
    PreviousStateList,
    PreviousState
} from "../../../src/services/associations/types";
import { RequestClient } from "../../../src/http";
import Resource from "../../../src/services/resource";
import {
    mockAssociationResource,
    mockGetResponse,
    mockPostResponse,
    mockGetInvitationsResponse,
    mockGetPreviousStatesResponse
} from "./service.mock";

const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const companyNumber = "AB123456";

describe("AssociationsService", () => {
    describe("getCompanyAssociations", () => {
        let associationsService: AssociationsService;

        beforeEach(() => {
            sinon.reset();
            sinon.restore();
            associationsService = new AssociationsService(requestClient);
        });

        it("should return 200 response with company associations", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[200]);
            await associationsService.getCompanyAssociations(companyNumber)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<AssociationList> = data as Resource<AssociationList>;
                    expect(castedData).to.exist;

                    const associations: AssociationList = castedData.resource as AssociationList;
                    expect(associations).to.exist;
                    expect(associations.items.length).to.equal(1);
                    expect(associations.links.self).to.equal("http://localhost:8080/associations");
                    expect(associations.links.next).to.equal("http://localhost:8080/associations?page_index=2&itesm_per_page=15");
                    expect(associations.itemsPerPage).to.equal(1);
                    expect(associations.pageNumber).to.equal(2);
                    expect(associations.totalResults).to.equal(3);
                    expect(associations.totalPages).to.equal(4);

                    const association: Association = associations.items[0];
                    expect(association).to.exist;
                    expect(association.etag).to.equal("ABC");
                    expect(association.id).to.equal("0123456789");
                    expect(association.userId).to.equal("9876543210");
                    expect(association.userEmail).to.equal("john.doe@test.com");
                    expect(association.displayName).to.equal("John Doe");
                    expect(association.companyNumber).to.equal("AB123456");
                    expect(association.companyName).to.equal("Company Ltd.");
                    expect(association.status).to.equal(AssociationStatus.AWAITING_APPROVAL);
                    expect(association.createdAt).to.equal("2022-03-05T11:41:09.568+00:00 UTC");
                    expect(association.approvedAt).to.equal("");
                    expect(association.removedAt).to.equal("");
                    expect(association.kind).to.equal("association");
                    expect(association.approvalRoute).to.equal(ApprovalRoute.INVITATION);
                    expect(association.approvalExpiryAt).to.equal("2022-05-05T11:41:09.568+00:00 UTC");
                    expect(association.links.self).to.equal("/12345");
                });
        });

        it("should return 200 response with company associations when query parameters provided", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[200]);
            const includeRemoved = true;
            await associationsService.getCompanyAssociations(companyNumber, includeRemoved)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<AssociationList> = data as Resource<AssociationList>;
                    expect(castedData).to.exist;

                    const associations: AssociationList = castedData.resource as AssociationList;
                    expect(associations).to.exist;
                    expect(associations.items.length).to.equal(1);
                    expect(associations.links.self).to.equal("http://localhost:8080/associations");
                    expect(associations.links.next).to.equal("http://localhost:8080/associations?page_index=2&itesm_per_page=15");
                    expect(associations.itemsPerPage).to.equal(1);
                    expect(associations.pageNumber).to.equal(2);
                    expect(associations.totalResults).to.equal(3);
                    expect(associations.totalPages).to.equal(4);

                    const association: Association = associations.items[0];
                    expect(association).to.exist;
                    expect(association.etag).to.equal("ABC");
                    expect(association.id).to.equal("0123456789");
                    expect(association.userId).to.equal("9876543210");
                    expect(association.userEmail).to.equal("john.doe@test.com");
                    expect(association.displayName).to.equal("John Doe");
                    expect(association.companyNumber).to.equal("AB123456");
                    expect(association.companyName).to.equal("Company Ltd.");
                    expect(association.status).to.equal(AssociationStatus.AWAITING_APPROVAL);
                    expect(association.createdAt).to.equal("2022-03-05T11:41:09.568+00:00 UTC");
                    expect(association.approvedAt).to.equal("");
                    expect(association.removedAt).to.equal("");
                    expect(association.kind).to.equal("association");
                    expect(association.approvalRoute).to.equal(ApprovalRoute.INVITATION);
                    expect(association.approvalExpiryAt).to.equal("2022-05-05T11:41:09.568+00:00 UTC");
                    expect(association.links.self).to.equal("/12345");
                });
        });

        it("should return 200 response with company associations when a header parameter provided", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[200]);
            const userEmail = "john.doe@test.com";
            await associationsService.getCompanyAssociations(companyNumber, undefined, undefined, undefined)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<AssociationList> = data as Resource<AssociationList>;
                    expect(castedData).to.exist;

                    const associations: AssociationList = castedData.resource as AssociationList;
                    expect(associations).to.exist;
                    expect(associations.items.length).to.equal(1);
                    expect(associations.links.self).to.equal("http://localhost:8080/associations");
                    expect(associations.links.next).to.equal("http://localhost:8080/associations?page_index=2&itesm_per_page=15");
                    expect(associations.itemsPerPage).to.equal(1);
                    expect(associations.pageNumber).to.equal(2);
                    expect(associations.totalResults).to.equal(3);
                    expect(associations.totalPages).to.equal(4);

                    const association: Association = associations.items[0];
                    expect(association).to.exist;
                    expect(association.etag).to.equal("ABC");
                    expect(association.id).to.equal("0123456789");
                    expect(association.userId).to.equal("9876543210");
                    expect(association.userEmail).to.equal("john.doe@test.com");
                    expect(association.displayName).to.equal("John Doe");
                    expect(association.companyNumber).to.equal("AB123456");
                    expect(association.companyName).to.equal("Company Ltd.");
                    expect(association.status).to.equal(AssociationStatus.AWAITING_APPROVAL);
                    expect(association.createdAt).to.equal("2022-03-05T11:41:09.568+00:00 UTC");
                    expect(association.approvedAt).to.equal("");
                    expect(association.removedAt).to.equal("");
                    expect(association.kind).to.equal("association");
                    expect(association.approvalRoute).to.equal(ApprovalRoute.INVITATION);
                    expect(association.approvalExpiryAt).to.equal("2022-05-05T11:41:09.568+00:00 UTC");
                    expect(association.links.self).to.equal("/12345");
                });
        });

        it("should return 400 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[400]);
            await associationsService.getCompanyAssociations(companyNumber)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(400);
                });
        });

        it("should return 401 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[401]);
            await associationsService.getCompanyAssociations(companyNumber)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(401);
                });
        });

        it("should return 403 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[403]);
            await associationsService.getCompanyAssociations(companyNumber)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(403);
                });
        });

        it("should return 404 response if company not found", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[404]);
            await associationsService.getCompanyAssociations(companyNumber)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(404);

                    const castedData: Resource<Errors> = data as Resource<Errors>;
                    expect(castedData).to.exist;

                    const errors: Errors = castedData.resource as Errors;
                    expect(errors).to.exist;
                    expect(errors.errors.length).to.equal(1);

                    const error: Error = errors.errors[0];
                    expect(error.error).to.equal("Failed to find company");
                    expect(error.errorValues).to.be.undefined;
                    expect(error.location).to.equal("accounts-association-api");
                    expect(error.locationType).to.equal("request-body");
                    expect(error.type).to.equal("ch:validation");
                });
        });

        it("should return 500 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[500]);
            await associationsService.getCompanyAssociations(companyNumber)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(500);
                });
        });
    });

    describe("searchForCompanyAssociation", () => {
        let associationsService: AssociationsService;

        beforeEach(() => {
            sinon.reset();
            sinon.restore();
            associationsService = new AssociationsService(requestClient);
        });

        it("should return 200 response with the company association if user email provided", async () => {
            sinon.stub(requestClient, "httpPost").resolves({ status: 200, body: mockAssociationResource });
            const companyNumber = mockAssociationResource.company_number;
            const userEmail = mockAssociationResource.user_email;
            await associationsService.searchForCompanyAssociation(companyNumber, userEmail)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<Association> = data as Resource<Association>;
                    expect(castedData).to.exist;
                    const association = castedData.resource as Association;
                    expect(association).to.exist;
                    expect(association.etag).to.equal("ABC");
                    expect(association.id).to.equal("0123456789");
                    expect(association.userId).to.equal("9876543210");
                    expect(association.userEmail).to.equal("john.doe@test.com");
                    expect(association.displayName).to.equal("John Doe");
                    expect(association.companyNumber).to.equal("AB123456");
                    expect(association.companyName).to.equal("Company Ltd.");
                    expect(association.status).to.equal(AssociationStatus.AWAITING_APPROVAL);
                    expect(association.createdAt).to.equal("2022-03-05T11:41:09.568+00:00 UTC");
                    expect(association.approvedAt).to.equal("");
                    expect(association.removedAt).to.equal("");
                    expect(association.kind).to.equal("association");
                    expect(association.approvalRoute).to.equal(ApprovalRoute.INVITATION);
                    expect(association.approvalExpiryAt).to.equal("2022-05-05T11:41:09.568+00:00 UTC");
                    expect(association.links.self).to.equal("/12345");
                });
        });

        it("should return 200 response with the company association if user id provided", async () => {
            sinon.stub(requestClient, "httpPost").resolves({ status: 200, body: mockAssociationResource });
            const companyNumber = mockAssociationResource.company_number;
            const userId = mockAssociationResource.user_id;
            const associationStatus = [AssociationStatus.UNAUTHORISED]
            await associationsService.searchForCompanyAssociation(companyNumber, undefined, userId, associationStatus)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<Association> = data as Resource<Association>;
                    expect(castedData).to.exist;
                    const association = castedData.resource as Association;
                    expect(association).to.exist;
                    expect(association.etag).to.equal("ABC");
                    expect(association.id).to.equal("0123456789");
                    expect(association.userId).to.equal("9876543210");
                    expect(association.userEmail).to.equal("john.doe@test.com");
                    expect(association.displayName).to.equal("John Doe");
                    expect(association.companyNumber).to.equal("AB123456");
                    expect(association.companyName).to.equal("Company Ltd.");
                    expect(association.status).to.equal(AssociationStatus.AWAITING_APPROVAL);
                    expect(association.createdAt).to.equal("2022-03-05T11:41:09.568+00:00 UTC");
                    expect(association.approvedAt).to.equal("");
                    expect(association.removedAt).to.equal("");
                    expect(association.kind).to.equal("association");
                    expect(association.approvalRoute).to.equal(ApprovalRoute.INVITATION);
                    expect(association.approvalExpiryAt).to.equal("2022-05-05T11:41:09.568+00:00 UTC");
                    expect(association.links.self).to.equal("/12345");
                });
        });

        it("should return 400 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockGetResponse[400]);
            const companyNumber = mockAssociationResource.company_number;
            const userEmail = mockAssociationResource.user_email;
            const userId = mockAssociationResource.user_id;
            await associationsService.searchForCompanyAssociation(companyNumber, userEmail, userId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(400);
                });
        });

        it("should return 401 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockGetResponse[401]);
            const companyNumber = mockAssociationResource.company_number;
            const userEmail = mockAssociationResource.user_email;
            await associationsService.searchForCompanyAssociation(companyNumber, userEmail)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(401);
                });
        });

        it("should return 403 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockGetResponse[403]);
            const companyNumber = mockAssociationResource.company_number;
            const userEmail = mockAssociationResource.user_email;
            await associationsService.searchForCompanyAssociation(companyNumber, userEmail)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(403);
                });
        });

        it("should return 404 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockGetResponse[404]);
            const companyNumber = mockAssociationResource.company_number;
            const userEmail = mockAssociationResource.user_email;
            await associationsService.searchForCompanyAssociation(companyNumber, userEmail)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(404);
                });
        });

        it("should return 500 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockGetResponse[500]);
            const companyNumber = mockAssociationResource.company_number;
            const userEmail = mockAssociationResource.user_email;
            await associationsService.searchForCompanyAssociation(companyNumber, userEmail)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(500);
                });
        });
    });

    describe("searchAssociations", () => {
        let associationsService: AssociationsService;

        beforeEach(() => {
            sinon.reset();
            sinon.restore();
            associationsService = new AssociationsService(requestClient);
        });

        it("should return 200 response with company associations", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[200]);
            const status = [AssociationStatus.AWAITING_APPROVAL];
            await associationsService.searchAssociations(status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<AssociationList> = data as Resource<AssociationList>;
                    expect(castedData).to.exist;

                    const associations: AssociationList = castedData.resource as AssociationList;
                    expect(associations).to.exist;
                    expect(associations.items.length).to.equal(1);
                    expect(associations.links.self).to.equal("http://localhost:8080/associations");
                    expect(associations.links.next).to.equal("http://localhost:8080/associations?page_index=2&itesm_per_page=15");
                    expect(associations.itemsPerPage).to.equal(1);
                    expect(associations.pageNumber).to.equal(2);
                    expect(associations.totalResults).to.equal(3);
                    expect(associations.totalPages).to.equal(4);

                    const association: Association = associations.items[0];
                    expect(association).to.exist;
                    expect(association.etag).to.equal("ABC");
                    expect(association.id).to.equal("0123456789");
                    expect(association.userId).to.equal("9876543210");
                    expect(association.userEmail).to.equal("john.doe@test.com");
                    expect(association.displayName).to.equal("John Doe");
                    expect(association.companyNumber).to.equal("AB123456");
                    expect(association.companyName).to.equal("Company Ltd.");
                    expect(association.status).to.equal(AssociationStatus.AWAITING_APPROVAL);
                    expect(association.createdAt).to.equal("2022-03-05T11:41:09.568+00:00 UTC");
                    expect(association.approvedAt).to.equal("");
                    expect(association.removedAt).to.equal("");
                    expect(association.kind).to.equal("association");
                    expect(association.approvalRoute).to.equal(ApprovalRoute.INVITATION);
                    expect(association.approvalExpiryAt).to.equal("2022-05-05T11:41:09.568+00:00 UTC");
                    expect(association.links.self).to.equal("/12345");
                });
        });

        it("should return 204 response if no company associations found with the provided search criteria", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[204]);
            const status = [AssociationStatus.AWAITING_APPROVAL];
            await associationsService.searchAssociations(status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(204);
                });
        });

        it("should return 400 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[400]);
            const status = [AssociationStatus.AWAITING_APPROVAL];
            await associationsService.searchAssociations(status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(400);
                });
        });

        it("should return 401 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[401]);
            const status = [AssociationStatus.AWAITING_APPROVAL];
            await associationsService.searchAssociations(status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(401);
                });
        });

        it("should return 403 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[403]);
            const status = [AssociationStatus.AWAITING_APPROVAL];
            await associationsService.searchAssociations(status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(403);
                });
        });

        it("should return 500 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[500]);
            const status = [AssociationStatus.AWAITING_APPROVAL];
            await associationsService.searchAssociations(status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(500);
                });
        });
    });

    describe("createAssociation", () => {
        let associationsService: AssociationsService;
        const userId = "1234567890";

        beforeEach(() => {
            sinon.reset();
            sinon.restore();
            associationsService = new AssociationsService(requestClient);
        });

        it("should return 201 response if a new association created", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[201]);
            await associationsService.createAssociation(companyNumber, userId).then((data) => {
                expect(data.httpStatusCode).to.equal(201);
                const castedData: Resource<NewAssociationResponse> = data as Resource<NewAssociationResponse>;
                expect(castedData).to.exist;
                expect(castedData.resource?.associationLink).to.equal("/associations/123456");
            });
        });

        it("should return 400 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[400]);
            await associationsService.createAssociation(companyNumber, userId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(400);
                });
        });

        it("should return 401 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[401]);
            await associationsService.createAssociation(companyNumber, userId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(401);
                });
        });

        it("should return 401 response for invited user", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[401]);
            await associationsService.createAssociation(companyNumber, userId).then((data) => {
                expect(data.httpStatusCode).to.equal(401);
            });
        });

        it("should return 403 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[403]);
            await associationsService.createAssociation(companyNumber, userId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(403);
                });
        });

        it("should return 500 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[500]);
            await associationsService.createAssociation(companyNumber, userId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(500);
                });
        });
    });

    describe("inviteUser", () => {
        let associationsService: AssociationsService;
        const inviteeEmailAddress = "adam.smith@test.org";

        beforeEach(() => {
            sinon.reset();
            sinon.restore();
            associationsService = new AssociationsService(requestClient);
        });

        it("should return 201 response if a new association created for invited user", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[201]);
            await associationsService.inviteUser(companyNumber, inviteeEmailAddress).then((data) => {
                expect(data.httpStatusCode).to.equal(201);
                const castedData: Resource<NewAssociationResponse> = data as Resource<NewAssociationResponse>;
                expect(castedData).to.exist;
                expect(castedData.resource?.associationLink).to.equal("/associations/123456");
            });
        });

        it("should return 400 response for invited user", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[400]);
            await associationsService.createAssociation(companyNumber, inviteeEmailAddress)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(400);
                });
        });

        it("should return 401 response for invited user", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[401]);
            await associationsService.inviteUser(companyNumber, inviteeEmailAddress).then((data) => {
                expect(data.httpStatusCode).to.equal(401);
            });
        });

        it("should return 403 response for invited user", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[403]);
            await associationsService.inviteUser(companyNumber, inviteeEmailAddress)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(403);
                });
        });

        it("should return 500 response for invited user", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[500]);
            await associationsService.inviteUser(companyNumber, inviteeEmailAddress)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(500);
                });
        });
    });

    describe("getAssociation", () => {
        let associationsService: AssociationsService;

        beforeEach(() => {
            sinon.reset();
            sinon.restore();
            associationsService = new AssociationsService(requestClient);
        });

        it("should return 200 response with association data", async () => {
            sinon.stub(requestClient, "httpGet").resolves({ status: 200, body: mockAssociationResource });
            const associationId = "1234567890";
            await associationsService.getAssociation(associationId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<Association> = data as Resource<Association>;
                    expect(castedData).to.exist;

                    const association: Association = castedData.resource as Association;
                    expect(association).to.exist;
                    expect(association.etag).to.equal("ABC");
                    expect(association.id).to.equal("0123456789");
                    expect(association.userId).to.equal("9876543210");
                    expect(association.userEmail).to.equal("john.doe@test.com");
                    expect(association.displayName).to.equal("John Doe");
                    expect(association.companyNumber).to.equal("AB123456");
                    expect(association.companyName).to.equal("Company Ltd.");
                    expect(association.status).to.equal(AssociationStatus.AWAITING_APPROVAL);
                    expect(association.createdAt).to.equal("2022-03-05T11:41:09.568+00:00 UTC");
                    expect(association.approvedAt).to.equal("");
                    expect(association.removedAt).to.equal("");
                    expect(association.kind).to.equal("association");
                    expect(association.approvalRoute).to.equal(ApprovalRoute.INVITATION);
                    expect(association.approvalExpiryAt).to.equal("2022-05-05T11:41:09.568+00:00 UTC");
                    expect(association.links.self).to.equal("/12345");
                });
        });

        it("should return 204 response if no company associations found with the provided search criteria", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[204]);
            const associationId = "1234567890";
            await associationsService.getAssociation(associationId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(204);
                });
        });

        it("should return 400 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[400]);
            const associationId = "1234567890";
            await associationsService.getAssociation(associationId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(400);
                });
        });

        it("should return 401 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[401]);
            const associationId = "1234567890";
            await associationsService.getAssociation(associationId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(401);
                });
        });

        it("should return 403 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[403]);
            const associationId = "1234567890";
            await associationsService.getAssociation(associationId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(403);
                });
        });

        it("should return 500 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse[500]);
            const associationId = "1234567890";
            await associationsService.getAssociation(associationId)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(500);
                });
        });
    });

    describe("updateAssociationStatus", () => {
        let associationsService: AssociationsService;

        beforeEach(() => {
            sinon.reset();
            sinon.restore();
            associationsService = new AssociationsService(requestClient);
        });

        it("should return 200 response when status successfully updated", async () => {
            sinon.stub(requestClient, "httpPatch").resolves({ status: 200 });
            const associationId = "1234567890";
            const status = AssociationStatus.REMOVED;
            await associationsService.updateAssociationStatus(associationId, status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);
                })
        });

        it("should return 204 response if no company associations found with the provided search criteria", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockGetResponse[204]);
            const associationId = "1234567890";
            const status = AssociationStatus.REMOVED;
            await associationsService.updateAssociationStatus(associationId, status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(204);
                });
        });

        it("should return 400 response", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockGetResponse[400]);
            const associationId = "1234567890";
            const status = AssociationStatus.REMOVED;
            await associationsService.updateAssociationStatus(associationId, status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(400);
                });
        });

        it("should return 401 response", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockGetResponse[401]);
            const associationId = "1234567890";
            const status = AssociationStatus.REMOVED;
            await associationsService.updateAssociationStatus(associationId, status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(401);
                });
        });

        it("should return 403 response", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockGetResponse[403]);
            const associationId = "1234567890";
            const status = AssociationStatus.REMOVED;
            await associationsService.updateAssociationStatus(associationId, status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(403);
                });
        });

        it("should return 500 response", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockGetResponse[500]);
            const associationId = "1234567890";
            const status = AssociationStatus.REMOVED;
            await associationsService.updateAssociationStatus(associationId, status)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(500);
                });
        });
    });

    describe("getInvitations", () => {
        let associationsService: AssociationsService;

        beforeEach(() => {
            sinon.reset();
            sinon.restore();
            associationsService = new AssociationsService(requestClient);
        });

        it("should return 200 response with inviations ", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetInvitationsResponse[200]);
            await associationsService.getInvitations()
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<InvitationList> = data as Resource<InvitationList>;
                    expect(castedData).to.exist;

                    const invitations: InvitationList = castedData.resource as InvitationList;
                    expect(invitations).to.exist;
                    expect(invitations.items.length).to.equal(1);
                    expect(invitations.links.self).to.equal("http://localhost:8080/associations");
                    expect(invitations.links.next).to.equal("http://localhost:8080/associations?page_index=2&itesm_per_page=15");
                    expect(invitations.itemsPerPage).to.equal(1);
                    expect(invitations.pageNumber).to.equal(2);
                    expect(invitations.totalResults).to.equal(3);
                    expect(invitations.totalPages).to.equal(4);

                    const invite: Invitation = invitations.items[0];
                    expect(invite).to.exist;
                    expect(invite.associationId).to.equal("0123456789");
                    expect(invite.invitedAt).to.equal("2022-03-05T11:41:09.568+00:00 UTC");
                    expect(invite.invitedBy).to.equal("john.doe@test.com");
                    expect(invite.isActive).to.equal(true);
                });
        });

        it("should return 200 response invitations when query parameters provided", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetInvitationsResponse[200]);
            await associationsService.getInvitations(4, 15)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<InvitationList> = data as Resource<InvitationList>;
                    expect(castedData).to.exist;

                    const invitations: InvitationList = castedData.resource as InvitationList;
                    expect(invitations).to.exist;
                    expect(invitations.items.length).to.equal(1);
                    expect(invitations.links.self).to.equal("http://localhost:8080/associations");
                    expect(invitations.links.next).to.equal("http://localhost:8080/associations?page_index=2&itesm_per_page=15");
                    expect(invitations.itemsPerPage).to.equal(1);
                    expect(invitations.pageNumber).to.equal(2);
                    expect(invitations.totalResults).to.equal(3);
                    expect(invitations.totalPages).to.equal(4);

                    const invite: Invitation = invitations.items[0];
                    expect(invite).to.exist;
                    expect(invite.associationId).to.equal("0123456789");
                    expect(invite.invitedAt).to.equal("2022-03-05T11:41:09.568+00:00 UTC");
                    expect(invite.invitedBy).to.equal("john.doe@test.com");
                    expect(invite.isActive).to.equal(true);
                });
        });

        it("should return 400 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetInvitationsResponse[400]);
            await associationsService.getInvitations()
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(400);
                });
        });

        it("should return 401 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetInvitationsResponse[401]);
            await associationsService.getInvitations()
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(401);
                });
        });

        it("should return 403 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetInvitationsResponse[403]);
            await associationsService.getInvitations()
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(403);
                });
        });

        it("should return 500 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetInvitationsResponse[500]);
            await associationsService.getInvitations()
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(500);
                });
        });
    });

    describe("postInvitation", () => {
        let associationsService: AssociationsService;
        const inviteeEmailAddress = "adam.smith@test.org";

        beforeEach(() => {
            sinon.reset();
            sinon.restore();
            associationsService = new AssociationsService(requestClient);
        });

        it("should return 201 response if a new invite (association) is created", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[201]);
            await associationsService.postInvitation(companyNumber, inviteeEmailAddress).then((data) => {
                expect(data.httpStatusCode).to.equal(201);
                const castedData: Resource<NewAssociationResponse> = data as Resource<NewAssociationResponse>;
                expect(castedData).to.exist;
                expect(castedData.resource?.associationLink).to.equal("/associations/123456");
            });
        });

        it("should return 400 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[400]);
            await associationsService.postInvitation(companyNumber, inviteeEmailAddress)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(400);
                });
        });

        it("should return 401 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[401]);
            await associationsService.postInvitation(companyNumber, inviteeEmailAddress).then((data) => {
                expect(data.httpStatusCode).to.equal(401);
            });
        });

        it("should return 403 response", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[403]);
            await associationsService.postInvitation(companyNumber, inviteeEmailAddress)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(403);
                });
        });

        it("should return 500 response for invited user", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostResponse[500]);
            await associationsService.postInvitation(companyNumber, inviteeEmailAddress)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(500);
                });
        });
    });

    describe("getPreviousStates", () => {
        let associationsService: AssociationsService;

        beforeEach(() => {
            sinon.reset();
            sinon.restore();
            associationsService = new AssociationsService(requestClient);
        });

        it("should return 200 response with previous states ", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPreviousStatesResponse[200]);
            await associationsService.getPreviousStates("")
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<PreviousStateList> = data as Resource<PreviousStateList>;
                    expect(castedData).to.exist;

                    const previousStates: PreviousStateList = castedData.resource as PreviousStateList;
                    expect(previousStates).to.exist;
                    expect(previousStates.items.length).to.equal(1);
                    expect(previousStates.links.self).to.equal("http://localhost:8080/associations");
                    expect(previousStates.links.next).to.equal("http://localhost:8080/associations?page_index=2&itesm_per_page=15");
                    expect(previousStates.itemsPerPage).to.equal(1);
                    expect(previousStates.pageNumber).to.equal(2);
                    expect(previousStates.totalResults).to.equal(3);
                    expect(previousStates.totalPages).to.equal(4);

                    const previousState: PreviousState = previousStates.items[0];
                    expect(previousState).to.exist;
                    expect(previousState.status).to.equal("confirmed");
                    expect(previousState.changedBy).to.equal("1234UserId");
                    expect(previousState.changedAt).to.equal("2022-04-05T11:41:09.568+00:00 UTC");
                });
        });

        it("should return 200 response when query parameters provided", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPreviousStatesResponse[200]);
            await associationsService.getPreviousStates("id", 4, 15)
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(200);

                    const castedData: Resource<PreviousStateList> = data as Resource<PreviousStateList>;
                    expect(castedData).to.exist;

                    const previousStates: PreviousStateList = castedData.resource as PreviousStateList;
                    expect(previousStates).to.exist;
                    expect(previousStates.items.length).to.equal(1);
                    expect(previousStates.links.self).to.equal("http://localhost:8080/associations");
                    expect(previousStates.links.next).to.equal("http://localhost:8080/associations?page_index=2&itesm_per_page=15");
                    expect(previousStates.itemsPerPage).to.equal(1);
                    expect(previousStates.pageNumber).to.equal(2);
                    expect(previousStates.totalResults).to.equal(3);
                    expect(previousStates.totalPages).to.equal(4);

                    const previousState: PreviousState = previousStates.items[0];
                    expect(previousState).to.exist;
                    expect(previousState.status).to.equal("confirmed");
                    expect(previousState.changedBy).to.equal("1234UserId");
                    expect(previousState.changedAt).to.equal("2022-04-05T11:41:09.568+00:00 UTC");
                });
        });

        it("should return 400 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPreviousStatesResponse[400]);
            await associationsService.getPreviousStates("")
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(400);
                });
        });

        it("should return 401 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPreviousStatesResponse[401]);
            await associationsService.getPreviousStates("")
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(401);
                });
        });

        it("should return 403 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPreviousStatesResponse[403]);
            await associationsService.getPreviousStates("")
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(403);
                });
        });

        it("should return 500 response", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPreviousStatesResponse[500]);
            await associationsService.getPreviousStates("")
                .then((data) => {
                    expect(data.httpStatusCode).to.equal(500);
                });
        });
    });
});
