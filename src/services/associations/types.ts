export interface InvitationResource {
    invited_by: string;
    invited_at: string;
    association_id: string;
    isActive: boolean;
}

export interface PreviousStateResource {
    status: PreviousStateStatus;
    changed_at: string;
    changed_by: string;
}

export interface AssociationResource {
    etag: string;
    id: string;
    user_id: string;
    user_email: string;
    display_name: string;
    company_number: string;
    company_name: string;
    company_status: string;
    status: AssociationStatus;
    created_at: string;
    approved_at: string;
    removed_at: string;
    unauthorised_at: string;
    kind: string;
    approval_route: ApprovalRoute;
    approval_expiry_at: string;
    links: {
        self: string;
    };
}

/**
 * AssociationsResource is what is returned from the API with snake_case API fields
 */
export interface AssociationListResource {
    items: AssociationResource[];
    links: {
        self: string;
        next: string;
    };
    items_per_page: number;
    page_number: number;
    total_results: number;
    total_pages: number;
}

export interface InvitationListResource {
    items: InvitationResource[];
    links: {
        self: string;
        next: string;
    };
    items_per_page: number;
    page_number: number;
    total_results: number;
    total_pages: number;
}

export interface PreviousStateListResource {
    items: PreviousStateResource[];
    links: {
        self: string;
        next: string;
    };
    items_per_page: number;
    page_number: number;
    total_results: number;
    total_pages: number;
}

export interface ErrorResource {
    error: string;
    error_values: {
        [key: string]: string;
    };
    location: string;
    location_type: string;
    type: string;
}

/**
 * ErrorsResource is what is returned from the API with snake_case API fields
 */
export interface ErrorsResource {
    errors: ErrorResource[];
}

export enum AssociationStatus {
    CONFIRMED = "confirmed",
    REMOVED = "removed",
    AWAITING_APPROVAL = "awaiting-approval",
    MIGRATED = "migrated",
    UNAUTHORISED = "unauthorised"
}

export enum ApprovalRoute {
    AUTH_CODE = "auth_code",
    INVITATION = "invitation"
}

export interface Invitation {
    invitedBy: string;
    invitedAt: string;
    associationId: string;
    isActive: boolean;
}

export interface Association {
    etag: string;
    id: string;
    userId: string;
    userEmail: string;
    displayName: string;
    companyNumber: string;
    companyName: string;
    companyStatus: string;
    status: AssociationStatus;
    createdAt: string;
    approvedAt: string;
    removedAt: string;
    unauthorisedAt: string;
    kind: string;
    approvalRoute: ApprovalRoute;
    approvalExpiryAt: string;
    links: {
        self: string;
    };
}

export interface AssociationList {
    items: Association[];
    itemsPerPage: number;
    pageNumber: number;
    totalResults: number;
    totalPages: number;
    links: {
        self: string;
        next: string;
    };
}

export interface InvitationList {
    items: Invitation[];
    itemsPerPage: number;
    pageNumber: number;
    totalResults: number;
    totalPages: number;
    links: {
        self: string;
        next: string;
    };
}

export type PreviousStateStatus = "confirmed" | "awaiting-approval" | "removed" | "migrated";

export interface PreviousState {
    status: PreviousStateStatus;
    changedAt: string;
    changedBy: string;
}

export interface PreviousStateList {
    items: PreviousState[];
    itemsPerPage: number;
    pageNumber: number;
    totalResults: number;
    totalPages: number;
    links: {
        self: string;
        next: string;
    };
}

export interface Error {
    error: string;
    errorValues: {
        [key: string]: string;
    };
    location: string;
    locationType: string;
    type: string;
}

export interface Errors {
    errors: Error[];
}

export interface QueryParameters {
    include_removed?: boolean;
    page_index?: number;
    items_per_page?: number;
    status?: AssociationStatus[];
    company_number?: string;
    user_email?: string;
    user_id?: string;
}

export interface NewAssociationResponseResource {
    association_link: string
}

export interface NewAssociationResponse {
    associationLink: string
}

export type AssociationsResponse = AssociationList | Association | NewAssociationResponse | Errors;

export interface SearchForCompanyAssociationPostBody {
    user_email?: string;
    user_id?: string;
}
