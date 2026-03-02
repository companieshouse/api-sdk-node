/**
 * CompanyPersonsWithSignificantControlStatementsResource is what is returned from the api.
 */
export interface CompanyPersonsWithSignificantControlStatementsResource {
    active_count: string;
    ceased_count: string;
    items: CompanyPersonWithSignificantControlStatementResource[];
    items_per_page?: string;
    links: {
        self: string;
    };
    start_index?: string;
    total_results: string;
}
export interface CompanyPersonWithSignificantControlStatementResource {
    ceased_on?: string;
    etag: string;
    kind: string;
    linked_psc_name?: string;
    links: {
        person_with_significant_control?: string;
        self: string;
    };
    notified_on: string;
    restrictions_notice_withdrawal_reason?: string;
    statement: string;
}
/**
 * CompanyPersonsWithSignificantControlStatements is what is returned from the sdk.
 */
export interface CompanyPersonsWithSignificantControlStatements {
    activeCount: string;
    ceasedCount: string;
    items: CompanyPersonWithSignificantControlStatement[];
    itemsPerPage?: string;
    links: {
        self: string;
    };
    startIndex?: string;
    totalResults: string;
}
export interface CompanyPersonWithSignificantControlStatement {
    ceasedOn?: string;
    etag: string;
    kind: string;
    linkedPscName?: string;
    links: {
        personWithSignificantControl?: string;
        self: string;
    };
    notifiedOn: string;
    restrictionsNoticeWithdrawalReason?: string;
    statement: string;
}
