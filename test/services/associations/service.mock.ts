import {
    AssociationResource,
    AssociationListResource,
    InvitationListResource,
    InvitationResource,
    PreviousStateResource,
    PreviousStateListResource
} from "../../../src/services/associations/types";

export const mockAssociationResource: AssociationResource = {
    etag: "ABC",
    id: "0123456789",
    user_id: "9876543210",
    user_email: "john.doe@test.com",
    display_name: "John Doe",
    company_number: "AB123456",
    company_name: "Company Ltd.",
    status: "awaiting-approval",
    created_at: "2022-03-05T11:41:09.568+00:00 UTC",
    approved_at: "",
    removed_at: "",
    kind: "association",
    approval_route: "invitation",
    approval_expiry_at: "2022-05-05T11:41:09.568+00:00 UTC",
    links: {
        self: "/12345"
    }
} as AssociationResource;

export const mockInvitationResource: InvitationResource = {
    association_id: "0123456789",
    isActive: true,
    invited_by: "john.doe@test.com",
    invited_at: "2022-03-05T11:41:09.568+00:00 UTC"
} as InvitationResource;

export const mockPreviousStateResource: PreviousStateResource = {
    status: "confirmed",
    changed_at: "2022-04-05T11:41:09.568+00:00 UTC",
    changed_by: "1234UserId"
} as PreviousStateResource;

export const mockAssociationListResource: AssociationListResource = {
    items: [
        mockAssociationResource
    ],
    links: {
        self: "http://localhost:8080/associations",
        next: "http://localhost:8080/associations?page_index=2&itesm_per_page=15"
    },
    items_per_page: 1,
    page_number: 2,
    total_results: 3,
    total_pages: 4
} as AssociationListResource;

export const mockInvitationListResource: InvitationListResource = {
    items: [
        mockInvitationResource
    ],
    links: {
        self: "http://localhost:8080/associations",
        next: "http://localhost:8080/associations?page_index=2&itesm_per_page=15"
    },
    items_per_page: 1,
    page_number: 2,
    total_results: 3,
    total_pages: 4
} as InvitationListResource;

export const mockPreviousStateListResource: PreviousStateListResource = {
    items: [
        mockPreviousStateResource
    ],
    links: {
        self: "http://localhost:8080/associations",
        next: "http://localhost:8080/associations?page_index=2&itesm_per_page=15"
    },
    items_per_page: 1,
    page_number: 2,
    total_results: 3,
    total_pages: 4
} as PreviousStateListResource;

export const mockErrorCompanyNotFound = {
    errors: [
        {
            error: "Failed to find company",
            location: "accounts-association-api",
            location_type: "request-body",
            type: "ch:validation"
        }
    ]
}

export const mockNewAssociationResponse = {
    association_link: "/associations/123456"
}

export const mockGetResponse = {
    200: { status: 200, body: mockAssociationListResource },
    204: { status: 204, body: "Not found" },
    400: { status: 400, error: "Bad Request" },
    401: { status: 401, error: "Unauthorised" },
    403: { status: 403, error: "Forbidden" },
    404: { status: 404, error: "Company not found", body: mockErrorCompanyNotFound },
    500: { status: 500, error: "Internal server error" }
};

export const mockPostResponse = {
    200: { status: 200, body: {} },
    201: { status: 201, body: mockNewAssociationResponse },
    204: { status: 204, body: "Not found" },
    400: { status: 400, error: "Bad Request" },
    401: { status: 401, error: "Unauthorised" },
    403: { status: 403, error: "Forbidden" },
    500: { status: 500, error: "Internal server error" }
};

export const mockGetInvitationsResponse = {
    200: { status: 200, body: mockInvitationListResource },
    204: { status: 204, body: "Not found" },
    400: { status: 400, error: "Bad Request" },
    401: { status: 401, error: "Unauthorised" },
    403: { status: 403, error: "Forbidden" },
    404: { status: 404, error: "Company not found", body: mockErrorCompanyNotFound },
    500: { status: 500, error: "Internal server error" }
};

export const mockGetPreviousStatesResponse = {
    200: { status: 200, body: mockPreviousStateListResource },
    204: { status: 204, body: "Not found" },
    400: { status: 400, error: "Bad Request" },
    401: { status: 401, error: "Unauthorised" },
    403: { status: 403, error: "Forbidden" },
    500: { status: 500, error: "Internal server error" }
};
